import { create, deriveHmacKeySecret, randomInt, CappedMap } from 'altcha-lib/frameworks/nextjs';
import { deriveKey } from 'altcha-lib/algorithms/pbkdf2';

/**
 * Self-hosted ALTCHA bot check (proof-of-work, no third party, no cookies).
 *
 * - GET /api/altcha issues an HMAC-signed challenge (see src/app/api/altcha/route.ts).
 * - The form routes call checkAltcha() on the `altcha` field of the form data they already parsed.
 *   (The adapter's own middleware would call req.formData() a second time, which fails.)
 * - The challenge carries a signed issue time (`data.iat`), used for the minimum fill time.
 */

/** Submissions faster than this after the challenge was issued are rejected. */
const MIN_FILL_SECONDS = 3;
/** How long a challenge stays valid (a slow typist must still be able to submit). */
const EXPIRES_SECONDS = 2 * 60 * 60;

/** Per function instance replay guard. Not shared across instances; the expiry limits the rest. */
const usedChallenges = new CappedMap<string, boolean>({ maxSize: 5000 });

type AltchaInstance = ReturnType<typeof create>;
let instancePromise: Promise<{ altcha: AltchaInstance; secret: string; keySecret: string }> | null =
  null;

function getAltcha() {
  if (!instancePromise) {
    instancePromise = (async () => {
      const secret = process.env.ALTCHA_HMAC_SECRET;
      if (!secret) {
        throw new Error('ALTCHA_HMAC_SECRET ist nicht konfiguriert.');
      }
      const keySecret = await deriveHmacKeySecret(secret);
      const altcha = create({
        deriveKey,
        hmacSignatureSecret: secret,
        hmacKeySignatureSecret: keySecret,
        store: usedChallenges,
        createChallengeParameters: () => {
          const now = Math.floor(Date.now() / 1000);
          // Tuned so a normal browser solves in about a second (the README example values,
          // cost 5000 / counter 5000-10000, took 10-15 s in Chrome). The 3 s minimum fill
          // time and the signed expiry do the rest.
          return {
            algorithm: 'PBKDF2/SHA-256',
            cost: 2_000,
            counter: randomInt(3_000, 1_000),
            expiresAt: now + EXPIRES_SECONDS,
            data: { iat: now },
          };
        },
      });
      return { altcha, secret, keySecret };
    })().catch((err) => {
      // Do not cache a failed init (e.g. env var added later in dev).
      instancePromise = null;
      throw err;
    });
  }
  return instancePromise;
}

/** Route handler for GET /api/altcha. Throws if the secret is missing. */
export async function altchaChallenge(req: Request): Promise<Response> {
  const { altcha } = await getAltcha();
  return altcha.challengeHandler(req);
}

/**
 * Verifies the ALTCHA payload from the submitted form.
 * Returns null when it is valid, otherwise a short reason meant only for the server log.
 * Throws only on configuration errors (missing secret).
 */
export async function checkAltcha(payload: FormDataEntryValue | null): Promise<string | null> {
  if (typeof payload !== 'string' || payload === '') {
    return 'missing';
  }
  const { altcha, secret, keySecret } = await getAltcha();
  const result = await altcha.verify(payload, deriveKey, secret, keySecret, usedChallenges);
  if (result.error) {
    return result.error;
  }
  // Only reached after the signature check, so `data.iat` is trustworthy.
  const challenge =
    result.payload && 'challenge' in result.payload ? result.payload.challenge : undefined;
  const iat = Number(challenge?.parameters?.data?.iat);
  if (!Number.isFinite(iat) || iat <= 0) {
    return 'missing-iat';
  }
  if (Date.now() / 1000 - iat < MIN_FILL_SECONDS) {
    return 'too-fast';
  }
  return null;
}
