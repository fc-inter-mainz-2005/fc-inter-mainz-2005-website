import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { serverError } from '@/lib/api-error';
import { checkAltcha } from '@/lib/altcha';
import { MAX_LENGTH } from '@/lib/form-fields';
import {
  BOT_CHECK_FAILED,
  badRequest,
  checkEmail,
  checkPersonName,
  cleanName,
  fakeSuccess,
  field,
  forbiddenOrigin,
  honeypotFilled,
  isAllowedOrigin,
} from '@/lib/form-guard';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getSenderEmail(): string {
  const fromEnv = process.env.RESEND_FROM_EMAIL;
  if (!fromEnv) {
    return 'FC Inter Mainz 2005 <onboarding@resend.dev>';
  }
  if (fromEnv.includes('<') && fromEnv.includes('>')) {
    return fromEnv;
  }
  return `FC Inter Mainz 2005 <${fromEnv}>`;
}

function renderClubEmailHtml({
  vorname,
  name,
  geburtsdatum,
  email,
  telefon,
  andererVerein,
  vereinName,
  nachricht,
}: {
  vorname: string;
  name: string;
  geburtsdatum: string;
  email: string;
  telefon: string;
  andererVerein: string;
  vereinName?: string;
  nachricht?: string;
}): string {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <tr>
          <td style="background-color:#0a1f44;padding:24px;text-align:center;border-bottom:4px solid #cc0000;">
            <img src="https://intermainz.de/fotos/logo.png" alt="FC Inter Mainz 2005" width="48" height="48" style="display:block;margin:0 auto 8px;border:0;">
            <span style="color:#ffffff;font-size:16px;font-weight:900;letter-spacing:2px;text-transform:uppercase;">FC Inter Mainz 2005</span>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 24px;">
            <h2 style="margin:0 0 20px;font-size:18px;color:#0a1f44;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
              Neue Anmeldung zum Probetraining
            </h2>
            <table role="presentation" width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#1e293b;margin-bottom:20px;">
              <tr>
                <td style="width:140px;font-weight:bold;color:#475569;">Name:</td>
                <td>${escapeHtml(vorname)} ${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">Geburtsdatum:</td>
                <td>${escapeHtml(geburtsdatum)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">E-Mail:</td>
                <td><a href="mailto:${escapeHtml(email)}" style="color:#cc0000;text-decoration:none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">Telefon:</td>
                <td><a href="tel:${escapeHtml(telefon)}" style="color:#1e293b;text-decoration:none;">${escapeHtml(telefon)}</a></td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">Anderer Verein:</td>
                <td>${escapeHtml(andererVerein)}${vereinName ? ` (${escapeHtml(vereinName)})` : ''}</td>
              </tr>
            </table>
            ${
              nachricht
                ? `<div style="background-color:#f8fafc;border-left:4px solid #0a1f44;padding:16px;border-radius:4px;">
              <p style="margin:0 0 6px;font-weight:bold;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Anmerkungen / Fragen:</p>
              <p style="margin:0;font-size:14px;color:#334155;white-space:pre-wrap;line-height:1.6;">${escapeHtml(nachricht)}</p>
            </div>`
                : ''
            }
          </td>
        </tr>
        <tr>
          <td style="background-color:#f0f4f8;padding:14px 24px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#64748b;line-height:1.5;">
              Eingegangen über das Probetraining-Formular auf <a href="https://intermainz.de" style="color:#cc0000;text-decoration:none;">intermainz.de</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function renderConfirmationHtml(vorname: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 2px 4px rgba(0,0,0,0.05);">
        <tr>
          <td style="background-color:#0a1f44;padding:26px 24px;text-align:center;border-bottom:4px solid #cc0000;">
            <img src="https://intermainz.de/fotos/logo.png" alt="FC Inter Mainz 2005" width="52" height="52" style="display:block;margin:0 auto 8px;border:0;">
            <span style="color:#ffffff;font-size:16px;font-weight:900;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">FC Inter Mainz 2005</span>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 26px;text-align:center;">
            <h1 style="margin:0 0 12px;font-size:20px;color:#0a1f44;">Danke, ${escapeHtml(vorname)}! ⚽</h1>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#334155;">
              deine Anmeldung zum Probetraining ist bei uns eingegangen. Wir melden uns bald mit den nächsten Schritten und Terminen bei dir.
            </p>
            <div style="height:3px;width:44px;background-color:#cc0000;border-radius:2px;margin:0 auto 18px;"></div>
            <p style="margin:0;font-size:12.5px;line-height:1.6;color:#64748b;">
              Sportliche Grüße,<br><strong>Dein FC Inter Mainz 2005 Team</strong>
            </p>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f0f4f8;padding:16px 24px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#64748b;line-height:1.5;">
              F.C. Inter Mainz 2005 e.V. · Albert-Stohr-Straße 50, 55128 Mainz<br>
              <a href="https://intermainz.de" style="color:#cc0000;text-decoration:none;">intermainz.de</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    if (!isAllowedOrigin(req)) {
      return forbiddenOrigin();
    }

    const formData = await req.formData();

    // Honeypot: pretend success so the bot learns nothing
    if (honeypotFilled(formData)) {
      return fakeSuccess();
    }

    // Required fields validation
    const vorname = field(formData, 'vorname');
    const name = field(formData, 'name');
    const geburtsdatum = field(formData, 'geburtsdatum');
    const email = field(formData, 'email');
    const telefon = field(formData, 'telefon');
    const andererVerein = field(formData, 'anderer_verein');
    const vereinName = field(formData, 'verein_name');
    const nachricht = field(formData, 'nachricht');

    if (!vorname || !name || !geburtsdatum || !email || !telefon || !andererVerein) {
      return badRequest(
        'Bitte fülle alle Pflichtfelder aus (Vorname, Nachname, Geburtsdatum, E-Mail, Telefon, Aktueller Verein).'
      );
    }

    if (andererVerein !== 'Ja' && andererVerein !== 'Nein') {
      return badRequest('Bitte gib an, ob du aktuell in einem anderen Verein spielst.');
    }

    if (andererVerein === 'Ja' && !vereinName) {
      return badRequest('Bitte gib den Namen deines aktuellen Vereins an.');
    }

    const fieldError =
      checkPersonName(vorname, 'Vorname') ??
      checkPersonName(name, 'Nachname') ??
      checkEmail(email) ??
      (!/^\d{4}-\d{2}-\d{2}$/.test(geburtsdatum)
        ? 'Bitte gib ein gültiges Geburtsdatum ein.'
        : null) ??
      (telefon.length > MAX_LENGTH.telefon || !/^[0-9 +()/.-]+$/.test(telefon)
        ? 'Bitte gib eine gültige Telefonnummer ein (nur Ziffern, Leerzeichen und + ( ) / - .).'
        : null) ??
      (vereinName.length > MAX_LENGTH.vereinName
        ? `Der Vereinsname darf höchstens ${MAX_LENGTH.vereinName} Zeichen lang sein.`
        : null) ??
      (nachricht.length > MAX_LENGTH.nachricht
        ? `Deine Anmerkung darf höchstens ${MAX_LENGTH.nachricht} Zeichen lang sein.`
        : null);
    if (fieldError) {
      return badRequest(fieldError);
    }

    // Bot check last, so a valid challenge is not used up by a simple input error
    const altchaFailure = await checkAltcha(formData.get('altcha'));
    if (altchaFailure) {
      console.warn('[api:probetraining:altcha]', altchaFailure);
      return badRequest(BOT_CHECK_FAILED);
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return serverError('probetraining:config', 'RESEND_API_KEY ist nicht konfiguriert.');
    }

    const resend = new Resend(apiKey);
    const recipient = process.env.RECIPIENT_EMAIL || 'intermainz@gmail.com';
    const sender = getSenderEmail();

    // 1. Send notification email to Club
    const clubResult = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Neue Anmeldung Probetraining: ${vorname} ${name}`,
      html: renderClubEmailHtml({
        vorname,
        name,
        geburtsdatum,
        email,
        telefon,
        andererVerein,
        vereinName,
        nachricht,
      }),
    });

    if (clubResult.error) {
      return serverError('probetraining:resend-club', clubResult.error);
    }

    // 2. Send auto-responder to Submitter
    try {
      const autoResult = await resend.emails.send({
        from: sender,
        to: email,
        replyTo: recipient,
        subject: 'Wir haben deine Nachricht erhalten – FC Inter Mainz 2005',
        html: renderConfirmationHtml(cleanName(vorname)),
      });

      if (autoResult.error) {
        console.warn('Resend Auto-Responder Warnung:', autoResult.error);
      }
    } catch (autoErr) {
      console.warn('Auto-Responder konnte nicht gesendet werden:', autoErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Anmeldung erfolgreich gesendet.',
    });
  } catch (error) {
    return serverError('probetraining:unhandled', error);
  }
}
