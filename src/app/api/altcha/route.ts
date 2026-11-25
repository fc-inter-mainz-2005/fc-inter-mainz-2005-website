import { altchaChallenge } from '@/lib/altcha';
import { serverError } from '@/lib/api-error';

export const dynamic = 'force-dynamic';

/** Issues a signed ALTCHA proof-of-work challenge for the contact and Probetraining forms. */
export async function GET(req: Request) {
  try {
    return await altchaChallenge(req);
  } catch (error) {
    return serverError('altcha:challenge', error);
  }
}
