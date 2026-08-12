const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const LOGO_URL = 'https://intermainz.de/fotos/logo.png';

function confirmationEmailHtml(vorname, mensaje) {
  return `<!DOCTYPE html>
<html lang="de">
<body style="margin:0;padding:0;background-color:#faf8f5;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#faf8f5;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:440px;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
        <tr>
          <td style="background-color:#0a1f44;padding:26px 24px;text-align:center;border-bottom:4px solid #cc0000;">
            <img src="${LOGO_URL}" alt="FC Inter Mainz" width="52" height="52" style="display:block;margin:0 auto 8px;">
            <span style="color:#ffffff;font-size:16px;font-weight:900;letter-spacing:2px;text-transform:uppercase;font-family:Arial,sans-serif;">FC Inter Mainz</span>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 26px;text-align:center;">
            <h1 style="margin:0 0 10px;font-size:19px;color:#0a1f44;">Danke, ${vorname}! ⚽</h1>
            <p style="margin:0 0 18px;font-size:14px;line-height:1.6;color:#334155;">${mensaje}</p>
            <div style="height:3px;width:44px;background-color:#cc0000;border-radius:2px;margin:0 auto 18px;"></div>
            <p style="margin:0;font-size:12.5px;line-height:1.6;color:#64748b;">Wir melden uns so schnell wie möglich bei dir.</p>
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

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const formName = body.payload.form_name;
    const data = body.payload.data;

    let subject = '';
    let html = '';
    let submitterEmail = '';
    let submitterName = '';
    let confirmationMsg = '';
    let attachments = [];

    if (formName === 'kontakt') {
      const vorname = data.vorname || '';
      const nachname = data.name || '';
      const email = data.email || '';
      const betreff = data.betreff || 'Allgemeine Anfrage';
      const nachricht = data.message || '';

      if (data.anhang && data.anhang.url) {
        attachments.push({
          filename: data.anhang.filename || 'Anhang-Kontakt',
          path: data.anhang.url
        });
      }

      subject = `Kontaktformular: ${betreff}`;
      html = `
        <h2>Neue Nachricht über das Kontaktformular</h2>
        <p><strong>Name:</strong> ${vorname} ${nachname}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Anliegen:</strong> ${betreff}</p>
        <p><strong>Nachricht:</strong></p>
        <blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">${nachricht}</blockquote>
        ${data.anhang ? `<p><strong>Anhang:</strong> Die hochgeladene Datei befindet sich im Anhang dieser E-Mail.</p>` : ''}
      `;
      submitterEmail = email;
      submitterName = vorname;
      confirmationMsg = `wir haben deine Nachricht erhalten und melden uns so bald wie möglich bei dir.`;
    } else if (formName === 'probetraining') {
      const vorname = data.vorname || '';
      const nachname = data.name || '';
      const geburtsdatum = data.geburtsdatum || '';
      const email = data.email || '';
      const telefon = data.telefon || '';
      const andererVerein = data.anderer_verein || '';
      const vereinName = data.verein_name || '';
      const nachricht = data.nachricht || '';

      subject = `Neue Anmeldung Probetraining: ${vorname} ${nachname}`;
      html = `
        <h2>Neue Anmeldung zum Probetraining</h2>
        <p><strong>Name:</strong> ${vorname} ${nachname}</p>
        <p><strong>Geburtsdatum:</strong> ${geburtsdatum}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Aktuell bei anderem Verein spielberechtigt:</strong> ${andererVerein}${vereinName ? ` (${vereinName})` : ''}</p>
        ${nachricht ? `<p><strong>Anmerkungen:</strong></p><blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">${nachricht}</blockquote>` : ''}
      `;
      submitterEmail = email;
      submitterName = vorname;
      confirmationMsg = `deine Anmeldung zum Probetraining ist bei uns eingegangen. Wir melden uns bald mit den nächsten Schritten.`;
    } else {
      return { statusCode: 200, body: JSON.stringify({ message: 'Formular ignoriert' }) };
    }

    const emailsToSend = [
      resend.emails.send({
        from: 'FC Inter Mainz Website <no-reply@intermainz.de>',
        to: process.env.RECIPIENT_EMAIL,
        reply_to: submitterEmail || undefined,
        subject,
        html,
        attachments
      })
    ];

    if (submitterEmail) {
      emailsToSend.push(
        resend.emails.send({
          from: 'FC Inter Mainz <no-reply@intermainz.de>',
          to: submitterEmail,
          reply_to: process.env.RECIPIENT_EMAIL,
          subject: 'Wir haben deine Nachricht erhalten – FC Inter Mainz',
          html: confirmationEmailHtml(submitterName, confirmationMsg)
        })
      );
    }

    const results = await Promise.allSettled(emailsToSend);
    results.forEach((r, i) => {
      if (r.status === 'rejected') {
        console.error(`Resend Fehler (Mail ${i}):`, r.reason);
      }
    });

    return { statusCode: 200, body: JSON.stringify({ message: 'Correo(s) enviado(s)' }) };
  } catch (error) {
    console.error('Error al enviar con Resend:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};