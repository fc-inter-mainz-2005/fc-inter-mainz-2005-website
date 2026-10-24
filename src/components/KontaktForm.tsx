'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function KontaktForm() {
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacyAgreed) return;

    const form = e.currentTarget;
    const fileInput = form.querySelector<HTMLInputElement>('#anhang');

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const allowedExt = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];
      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSize = 3 * 1024 * 1024;
      const ext = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!allowedExt.includes(ext) || (file.type && !allowedTypes.includes(file.type))) {
        alert('Dateityp nicht erlaubt. Bitte nur PDF, JPG, PNG oder DOCX hochladen.');
        return;
      }
      if (file.size > maxSize) {
        alert('Die Datei ist zu groß (max. 3 MB).');
        return;
      }
    }

    setStatus('loading');
    const formData = new FormData(form);

    try {
      const res = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Rejected');

      setStatus('success');
      form.reset();
      setPrivacyAgreed(false);

      setTimeout(() => {
        setStatus('idle');
      }, 4000);
    } catch (err) {
      console.error(err);
      alert('Es gab ein Problem beim Senden der Anfrage. Bitte versuche es erneut.');
      setStatus('error');
    }
  };

  return (
    <div className="form-card">
      <form
        id="contact-form"
        name="kontakt"
        method="POST"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <input type="hidden" name="form-name" value="kontakt" />
        <p style={{ display: 'none' }}>
          <label>
            Nicht ausfüllen: <input name="bot-field" />
          </label>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
          <div>
            <label className="form-label" htmlFor="vorname">
              Vorname *
            </label>
            <input
              id="vorname"
              type="text"
              name="vorname"
              required
              className="form-input"
              placeholder="Max"
            />
          </div>
          <div>
            <label className="form-label" htmlFor="name">
              Nachname *
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="form-input"
              placeholder="Mustermann"
            />
          </div>
        </div>

        <div className="mb-5">
          <label className="form-label" htmlFor="email">
            E-Mail *
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="form-input"
            placeholder="ihre@mail.de"
          />
        </div>

        <div className="mb-5">
          <label className="form-label" htmlFor="betreff">
            Anliegen / Betreff
          </label>
          <select id="betreff" name="betreff" className="form-select">
            <option value="Allgemeine Anfrage">Allgemeine Anfrage</option>
            <option value="Mitgliedschaft">Mitgliedschaft</option>
            <option value="Sponsoring">Sponsoring</option>
            <option value="Social Media">Social Media</option>
            <option value="Spielbetrieb">Spielbetrieb</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="form-label" htmlFor="message">
            Nachricht *
          </label>
          <textarea
            id="message"
            name="message"
            required
            className="form-textarea"
            placeholder="Wie können wir Ihnen helfen?"
          />
        </div>

        <div className="mb-5">
          <label className="form-label" htmlFor="anhang">
            Anhang (optional, max. 3 MB — PDF, JPG, PNG oder DOCX)
          </label>
          <input
            id="anhang"
            type="file"
            name="anhang"
            accept=".pdf,.jpg,.jpeg,.png,.docx"
            className="form-input"
          />
        </div>

        <div className="privacy-box mb-6">
          <input
            id="privacy-check"
            type="checkbox"
            required
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
          />
          <label htmlFor="privacy-check">
            Ich habe die{' '}
            <Link
              href="/datenschutzbestimmung"
              style={{ color: 'var(--blue)' }}
            >
              <strong>Datenschutzbestimmungen</strong>
            </Link>{' '}
            gelesen und erkläre mich damit einverstanden, dass meine Daten zur
            Bearbeitung meines Anliegens gespeichert werden.
          </label>
        </div>

        <button
          type="submit"
          id="submit-btn"
          className="btn-submit"
          disabled={!privacyAgreed || status === 'loading'}
          style={status === 'success' ? { background: '#166534' } : undefined}
        >
          {status === 'loading'
            ? 'Wird gesendet…'
            : status === 'success'
            ? '✓ Erfolgreich gesendet'
            : 'Nachricht absenden'}
        </button>
      </form>
    </div>
  );
}
