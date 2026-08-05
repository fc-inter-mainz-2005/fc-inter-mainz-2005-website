const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const formName = body.payload.form_name;
    const data = body.payload.data;

    let subject = '';
    let html = '';

    if (formName === 'kontakt') {
      const vorname = data.vorname || '';
      const nachname = data.name || '';
      const email = data.email || '';
      const betreff = data.betreff || 'Allgemeine Anfrage';
      const nachricht = data.message || '';

      subject = `[Web] Kontaktformular: ${betreff}`;
      html = `
        <h2>Neue Nachricht über das Kontaktformular</h2>
        <p><strong>Name:</strong> ${vorname} ${nachname}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Anliegen:</strong> ${betreff}</p>
        <p><strong>Nachricht:</strong></p>
        <blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">${nachricht}</blockquote>
        ${data.anhang ? `<p><strong>Anhang:</strong> Im Netlify-Dashboard unter Forms &rarr; kontakt einsehbar.</p>` : ''}
      `;
    } else if (formName === 'probetraining') {
      const vorname = data.vorname || '';
      const nachname = data.name || '';
      const geburtsdatum = data.geburtsdatum || '';
      const email = data.email || '';
      const telefon = data.telefon || '';
      const andererVerein = data.anderer_verein || '';
      const vereinName = data.verein_name || '';
      const nachricht = data.nachricht || '';

      subject = `[Web] Neue Anmeldung Probetraining: ${vorname} ${nachname}`;
      html = `
        <h2>Neue Anmeldung zum Probetraining</h2>
        <p><strong>Name:</strong> ${vorname} ${nachname}</p>
        <p><strong>Geburtsdatum:</strong> ${geburtsdatum}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${telefon}</p>
        <p><strong>Aktuell bei anderem Verein spielberechtigt:</strong> ${andererVerein}${vereinName ? ` (${vereinName})` : ''}</p>
        ${nachricht ? `<p><strong>Anmerkungen:</strong></p><blockquote style="background:#f4f4f4;padding:10px;border-left:4px solid #ccc;">${nachricht}</blockquote>` : ''}
      `;
    } else {
      // otro formulario no contemplado: no enviamos nada
      return { statusCode: 200, body: JSON.stringify({ message: 'Formular ignoriert' }) };
    }

    await resend.emails.send({
      from: 'FC Inter Mainz Website <onboarding@resend.dev>',
      to: process.env.RECIPIENT_EMAIL,
      subject,
      html
    });

    return { statusCode: 200, body: JSON.stringify({ message: 'Correo enviado con éxito' }) };
  } catch (error) {
    console.error('Error al enviar con Resend:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};