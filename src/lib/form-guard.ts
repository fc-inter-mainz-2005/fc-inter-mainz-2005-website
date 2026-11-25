import { NextResponse } from 'next/server';
import { HONEYPOT_FIELD, MAX_LENGTH } from '@/lib/form-fields';

/** Error shown when the ALTCHA check fails (missing, invalid, expired, reused or too fast). */
export const BOT_CHECK_FAILED =
  'Die Sicherheitsprüfung ist fehlgeschlagen. Bitte bestätige „Ich bin kein Roboter“ und sende das Formular erneut.';

export function badRequest(error: string) {
  return NextResponse.json({ error }, { status: 400 });
}

/** Trimmed string value of a form field, '' if missing or not a string. */
export function field(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

function hostOf(value: string | undefined | null): string | null {
  if (!value) return null;
  try {
    return new URL(value.includes('://') ? value : `https://${value}`).host.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Rejects cross-site browser posts. A request without an Origin header (curl, very old
 * browsers) is allowed here; the ALTCHA check still applies to it.
 * Allowed: the host the request was sent to, plus the Netlify site/deploy URLs.
 */
export function isAllowedOrigin(req: Request): boolean {
  const origin = req.headers.get('origin');
  if (!origin) return true;
  const originHost = hostOf(origin);
  if (!originHost) return false;

  const allowed = new Set(
    [
      req.headers.get('x-forwarded-host'),
      req.headers.get('host'),
      process.env.URL,
      process.env.DEPLOY_PRIME_URL,
      process.env.DEPLOY_URL,
      'intermainz.de',
      'www.intermainz.de',
    ]
      .map(hostOf)
      .filter((h): h is string => Boolean(h))
  );
  return allowed.has(originHost);
}

export function forbiddenOrigin() {
  return NextResponse.json(
    { error: 'Die Anfrage konnte nicht zugeordnet werden. Bitte sende das Formular direkt über intermainz.de.' },
    { status: 403 }
  );
}

/** True if the hidden honeypot field was filled in (only bots do that). */
export function honeypotFilled(formData: FormData): boolean {
  return field(formData, HONEYPOT_FIELD) !== '';
}

/** Pretends success, so a bot learns nothing. No email is sent. */
export function fakeSuccess() {
  return NextResponse.json({ success: true, message: 'Nachricht erfolgreich gesendet.' });
}

// Links, email addresses, markup and line breaks have no place in a name.
const LINK_LIKE =
  /https?:|www\.|:\/\/|@|[\r\n<>]|\b[a-z0-9-]+\.(?:de|com|net|org|info|biz|ru|io|xyz|top|eu|me|co|app|site|online|link|click)\b/i;

/** Returns a German error message, or null if the name is acceptable. */
export function checkPersonName(value: string, label: 'Vorname' | 'Nachname'): string | null {
  if (value.length > MAX_LENGTH.personName) {
    return `Der ${label} darf höchstens ${MAX_LENGTH.personName} Zeichen lang sein.`;
  }
  if (LINK_LIKE.test(value)) {
    return `Der ${label} darf keine Links oder E-Mail-Adressen enthalten.`;
  }
  return null;
}

export function checkEmail(value: string): string | null {
  if (value.length > MAX_LENGTH.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Bitte gib eine gültige E-Mail-Adresse ein.';
  }
  return null;
}

/** Collapses whitespace and caps the length; used for the name in the auto-reply. */
export function cleanName(value: string): string {
  return value.replace(/\s+/g, ' ').trim().slice(0, MAX_LENGTH.personName);
}
