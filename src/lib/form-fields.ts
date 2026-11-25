/**
 * Field rules shared by the form components (maxLength, options) and the API routes (validation).
 * Must stay free of server-only imports: it is also bundled into the client.
 */

export const HONEYPOT_FIELD = 'website';

export const KONTAKT_BETREFF = [
  'Allgemeine Anfrage',
  'Mitgliedschaft',
  'Sponsoring',
  'Social Media',
  'Spielbetrieb',
  'Sonstiges',
] as const;

export const MAX_LENGTH = {
  personName: 50,
  email: 254,
  message: 5000,
  nachricht: 2000,
  telefon: 30,
  vereinName: 100,
} as const;
