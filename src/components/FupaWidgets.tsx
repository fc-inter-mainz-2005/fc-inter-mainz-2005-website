'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { readFupaConsent, storeFupaConsent } from './fupaConsent';

const FUPA_URL = 'https://www.fupa.net/club/fc-inter-mainz';

const WIDGETS = [
  { id: '3H3VDqsfqhC9UagnvObtyRxyqqv', title: 'FC Inter Mainz', label: 'FC Inter Mainz I' },
  { id: '3H86m7DAQODYtcqZ0DSyRxT1sR4', title: 'FC Inter Mainz II', label: 'FC Inter Mainz II' },
  { id: '3H3W8BQ9dKsBBPN7l8GxRiO7NtF', title: 'FC Inter Mainz Ü32', label: 'FC Inter Mainz Ü32' },
];

export default function FupaWidgets() {
  // Starts false on server and client to avoid a hydration mismatch;
  // a stored consent is picked up after mount.
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    if (readFupaConsent()) setConsented(true);
  }, []);

  const handleConsent = () => {
    storeFupaConsent();
    setConsented(true);
  };

  return (
    <section className="matches-section">
      {/* widget.js renders into every [id^="fp-widget_root"] present when it
          loads, and watches for roots added later. It is only requested
          after consent. */}
      {consented && (
        <Script
          src="https://widget-api.fupa.net/vendor/widget.js?v1"
          strategy="afterInteractive"
        />
      )}
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Spielplan & Tabelle</p>
          <h2 className="section-title">Aktuelle Ergebnisse</h2>
          <span className="section-divider" />
        </div>

        {!consented && (
          <div className="fupa-consent">
            <p className="consent-notice">
              Spielpläne und Tabellen werden über FuPa bereitgestellt. Beim
              Laden werden Daten (u.&nbsp;a. Ihre IP-Adresse) an die FuPa GmbH
              übertragen, und FuPa kann Cookies auf Ihrem Gerät speichern. Ihre
              Auswahl wird in Ihrem Browser gespeichert und kann jederzeit
              widerrufen werden. Mehr dazu in der{' '}
              <Link href="/datenschutzbestimmung#fupa">
                Datenschutzerklärung
              </Link>
              .
            </p>
            <button
              type="button"
              className="consent-btn"
              onClick={handleConsent}
            >
              FuPa-Inhalte laden
            </button>
          </div>
        )}

        <div className="widget-grid">
          {WIDGETS.map((w) => (
            <div className="widget-card fupa-card" key={w.id}>
              <h3 className="widget-title">{w.title}</h3>
              {/* The fp-widget_root id is set only after consent. The key
                  forces a fresh node so FuPa's MutationObserver sees it if
                  the script is already loaded in this session. */}
              <div
                key={consented ? 'fupa-on' : 'fupa-off'}
                id={consented ? `fp-widget_root-${w.id}` : undefined}
              >
                <a href={FUPA_URL} target="_blank" rel="noopener noreferrer">
                  {w.label} auf FuPa
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
