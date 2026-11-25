import { NextResponse } from 'next/server';

/** The only text a client ever sees for a server-side failure. */
export const GENERIC_SERVER_ERROR =
  'Beim Senden ist leider ein Fehler aufgetreten. Bitte versuche es später erneut oder schreib uns direkt an intermainz@gmail.com.';

/**
 * Logs the full error server-side (Netlify function log) and returns a generic German message.
 * `context` identifies the route and step in the log, e.g. 'contact:resend-club'.
 */
export function serverError(context: string, error?: unknown, status = 500) {
  console.error(`[api:${context}]`, error ?? '(no error object)');
  return NextResponse.json({ error: GENERIC_SERVER_ERROR }, { status });
}
