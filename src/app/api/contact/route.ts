import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

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
  email,
  betreff,
  message,
  hasAttachment,
}: {
  vorname: string;
  name: string;
  email: string;
  betreff: string;
  message: string;
  hasAttachment: boolean;
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
              Neue Nachricht über das Kontaktformular
            </h2>
            <table role="presentation" width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#1e293b;margin-bottom:20px;">
              <tr>
                <td style="width:120px;font-weight:bold;color:#475569;">Name:</td>
                <td>${escapeHtml(vorname)} ${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">E-Mail:</td>
                <td><a href="mailto:${escapeHtml(email)}" style="color:#cc0000;text-decoration:none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="font-weight:bold;color:#475569;">Anliegen:</td>
                <td>${escapeHtml(betreff)}</td>
              </tr>
              ${
                hasAttachment
                  ? `<tr>
                <td style="font-weight:bold;color:#475569;">Anhang:</td>
                <td>📎 Datei im Anhang dieser E-Mail</td>
              </tr>`
                  : ''
              }
            </table>
            <div style="background-color:#f8fafc;border-left:4px solid #0a1f44;padding:16px;border-radius:4px;">
              <p style="margin:0 0 6px;font-weight:bold;font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:1px;">Nachricht:</p>
              <p style="margin:0;font-size:14px;color:#334155;white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#f0f4f8;padding:14px 24px;text-align:center;">
            <p style="margin:0;font-size:11px;color:#64748b;line-height:1.5;">
              Eingegangen über das Kontaktformular auf <a href="https://intermainz.de" style="color:#cc0000;text-decoration:none;">intermainz.de</a>
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
              wir haben deine Nachricht erhalten und melden uns so bald wie möglich bei dir.
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
    const formData = await req.formData();

    // Anti-spam (Honeypot) check
    const botField = formData.get('bot-field');
    if (botField && typeof botField === 'string' && botField.trim() !== '') {
      return NextResponse.json({ message: 'Spam detected' }, { status: 400 });
    }

    // Required fields validation
    const vorname = formData.get('vorname')?.toString().trim();
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const betreff = formData.get('betreff')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    if (!vorname || !name || !email || !betreff || !message) {
      return NextResponse.json(
        { error: 'Bitte fülle alle Pflichtfelder aus (Vorname, Nachname, E-Mail, Betreff, Nachricht).' },
        { status: 400 }
      );
    }

    // Basic email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Bitte gib eine gültige E-Mail-Adresse ein.' },
        { status: 400 }
      );
    }

    // Attachment handling (anhang)
    const anhang = formData.get('anhang');
    const attachments: { filename: string; content: Buffer }[] = [];

    if (anhang && typeof anhang === 'object' && 'name' in anhang && 'size' in anhang) {
      const file = anhang as File;
      if (file.name && file.size > 0) {
        const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();
        const maxSize = 3 * 1024 * 1024; // 3 MB

        if (!allowedExtensions.includes(ext)) {
          return NextResponse.json(
            { error: 'Dateiformat nicht erlaubt. Erlaubt sind nur PDF, JPG, PNG und DOCX.' },
            { status: 400 }
          );
        }

        if (file.size > maxSize) {
          return NextResponse.json(
            { error: 'Die Datei ist zu groß (maximal 3 MB erlaubt).' },
            { status: 400 }
          );
        }

        const arrayBuffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
        });
      }
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY ist nicht konfiguriert.');
      return NextResponse.json(
        { error: 'E-Mail-Dienst ist derzeit nicht konfiguriert.' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    const recipient = process.env.RECIPIENT_EMAIL || 'intermainz@gmail.com';
    const sender = getSenderEmail();

    // 1. Send notification email to Club
    const clubResult = await resend.emails.send({
      from: sender,
      to: recipient,
      replyTo: email,
      subject: `Kontaktformular: ${betreff}`,
      html: renderClubEmailHtml({
        vorname,
        name,
        email,
        betreff,
        message,
        hasAttachment: attachments.length > 0,
      }),
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (clubResult.error) {
      console.error('Resend Fehler beim Senden an Verein:', clubResult.error);
      return NextResponse.json(
        { error: clubResult.error.message || 'Fehler beim Senden der E-Mail.' },
        { status: 500 }
      );
    }

    // 2. Send auto-responder to Submitter
    try {
      const autoResult = await resend.emails.send({
        from: sender,
        to: email,
        replyTo: recipient,
        subject: 'Wir haben deine Nachricht erhalten – FC Inter Mainz 2005',
        html: renderConfirmationHtml(vorname),
      });

      if (autoResult.error) {
        console.warn('Resend Auto-Responder Warnung:', autoResult.error);
      }
    } catch (autoErr) {
      console.warn('Auto-Responder konnte nicht gesendet werden:', autoErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Nachricht erfolgreich gesendet.',
    });
  } catch (error: any) {
    console.error('Fehler in /api/contact:', error);
    return NextResponse.json(
      {
        error: error?.message || 'Interner Serverfehler beim Verarbeiten der Anfrage.',
      },
      { status: 500 }
    );
  }
}
