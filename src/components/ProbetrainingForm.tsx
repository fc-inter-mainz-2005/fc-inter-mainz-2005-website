'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ProbetrainingForm() {
  const [hasOtherClub, setHasOtherClub] = useState(false);
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!privacyAgreed) return;

    setStatus('loading');
    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, value.toString());
    });

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!res.ok) throw new Error('Network error');

      setStatus('success');
      form.reset();
      setPrivacyAgreed(false);
      setHasOtherClub(false);

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
    <form
      id="contact-form"
      name="probetraining"
      method="POST"
      onSubmit={handleSubmit}
      className="p-8 space-y-6"
    >
      <input type="hidden" name="form-name" value="probetraining" />
      <p style={{ display: 'none' }}>
        <label>
          Nicht ausfüllen: <input name="bot-field" />
        </label>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="vorname"
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
          >
            Vorname *
          </label>
          <input
            type="text"
            name="vorname"
            id="vorname"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
            placeholder="Dein Vorname"
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
          >
            Nachname *
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
            placeholder="Dein Nachname"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="geburtsdatum"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
        >
          Geburtsdatum *
        </label>
        <input
          type="date"
          name="geburtsdatum"
          id="geburtsdatum"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
        >
          E-Mail Adresse *
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
          placeholder="beispiel@mail.de"
        />
      </div>

      <div>
        <label
          htmlFor="telefon"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
        >
          Handynummer *
        </label>
        <input
          type="tel"
          name="telefon"
          id="telefon"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
          placeholder="+49 123 4567890"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
          Bist du aktuell bei einem anderen Verein spielberechtigt? *
        </label>
        <div className="flex gap-6">
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="anderer_verein"
              id="anderer_verein_ja"
              value="Ja"
              required
              onChange={() => setHasOtherClub(true)}
              className="accent-[#cc0000]"
            />
            Ja
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
            <input
              type="radio"
              name="anderer_verein"
              id="anderer_verein_nein"
              value="Nein"
              required
              onChange={() => setHasOtherClub(false)}
              className="accent-[#cc0000]"
            />
            Nein
          </label>
        </div>
      </div>

      {hasOtherClub && (
        <div id="verein-name-wrap">
          <label
            htmlFor="verein_name"
            className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
          >
            Bei welchem Verein spielst du aktuell? *
          </label>
          <input
            type="text"
            name="verein_name"
            id="verein_name"
            required={hasOtherClub}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
            placeholder="Name des aktuellen Vereins"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="nachricht"
          className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2"
        >
          Fragen oder Anmerkungen zum Probetraining (optional)
        </label>
        <textarea
          name="nachricht"
          id="nachricht"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0a1f44] focus:border-transparent outline-none transition bg-gray-50 text-gray-900"
          placeholder="Deine Frage oder Anmerkung..."
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
          <Link href="/datenschutzbestimmung" style={{ color: 'var(--blue)' }}>
            <strong>Datenschutzbestimmungen</strong>
          </Link>{' '}
          gelesen und erkläre mich damit einverstanden, dass meine Daten zur
          Bearbeitung meines Anliegens gespeichert werden.
        </label>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          id="submit-btn"
          disabled={!privacyAgreed || status === 'loading'}
          style={status === 'success' ? { background: '#166534' } : undefined}
          className="w-full bg-[#cc0000] hover:bg-[#ff1a1a] text-white font-bold py-4 px-8 rounded-lg shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 uppercase tracking-wider cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'loading'
            ? 'Wird gesendet…'
            : status === 'success'
            ? '✓ Erfolgreich gesendet'
            : 'Anfrage senden'}
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          * Pflichtfelder müssen ausgefüllt werden.
        </p>
      </div>
    </form>
  );
}
