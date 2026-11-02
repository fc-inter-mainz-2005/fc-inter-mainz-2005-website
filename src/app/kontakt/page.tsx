import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import KontaktForm from '@/components/KontaktForm';
import { getKontaktPage } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktiere den FC Inter Mainz 2005 e.V. – Anfragen zu Probetrainings, Mitgliedschaften, Sponsoring und Spielbetrieb.',
};

export default async function KontaktPage() {
  const kontakt = await getKontaktPage();
  const anschriftName = kontakt.anschrift_name;
  const strasse = kontakt.strasse;
  const plzOrt = kontakt.plz_ort;
  const email = kontakt.email || 'intermainz@gmail.com';
  const mapsQuery = encodeURIComponent(
    kontakt.maps_query || `${strasse}, ${plzOrt}`
  );

  return (
    <>
      <header className="pt-40 pb-16 relative z-10 text-center">
        <div className="container mx-auto px-6">
          <p className="section-eyebrow">Kontakt</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#0a1f44] uppercase tracking-tighter mb-6">
            Kontakt<span style={{ color: 'var(--red)' }}>ieren</span> Sie uns
          </h1>
          <div
            className="h-1 w-24 mx-auto"
            style={{ background: 'var(--red)', borderRadius: '2px' }}
          />
          <p
            className="mt-6 text-sm"
            style={{
              color: 'var(--text-muted)',
              maxWidth: '420px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7,
            }}
          >
            Haben Sie Fragen zum Verein, zu Probetrainings oder zu Sponsoring?
            Wir freuen uns von Ihnen zu hören.
          </p>
        </div>
      </header>

      <main className="relative z-10 pb-24">
        <div className="section-inner">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Sidebar Cards */}
            <div className="md:col-span-1 flex flex-col gap-5">
              <div className="info-card">
                <div className="info-card-title">Anschrift</div>
                <p className="info-card-text" id="anschrift-text">
                  {anschriftName}
                  <br />
                  {strasse}
                  <br />
                  {plzOrt}
                </p>
              </div>

              <div className="info-card map-card">
                <iframe
                  id="map-iframe"
                  src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  title="Standort FC Inter Mainz auf Google Maps"
                />
              </div>

              <div className="info-card">
                <div className="info-card-title">E-Mail</div>
                <p className="info-card-text">
                  <a href={`mailto:${email}`} id="email-link">
                    {email}
                  </a>
                </p>
              </div>

              <div className="info-card">
                <div className="info-card-title">Social Media</div>
                <p className="info-card-text" style={{ marginBottom: '14px' }}>
                  Folgt uns auf Instagram für aktuelle News und Spielberichte.
                </p>
                <a
                  href="https://www.instagram.com/fc_inter_mainz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    textDecoration: 'none',
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid var(--card-border)',
                    borderRadius: '8px',
                    padding: '9px 14px',
                    transition: 'background 0.25s, border-color 0.25s',
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    fill="var(--text-muted)"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                  @fc_inter_mainz
                </a>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <Suspense
                fallback={
                  <div className="form-card text-center py-12 text-[var(--gray)]">
                    Wird geladen…
                  </div>
                }
              >
                <KontaktForm />
              </Suspense>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
