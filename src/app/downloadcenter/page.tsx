import React from 'react';
import type { Metadata } from 'next';
import { getDownloads } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Downloadcenter',
  description:
    'Wichtige Anträge und Dokumente des FC Inter Mainz 2005 e.V. zum Herunterladen: Spielerpass, Vereinswechsel und Mitgliedsantrag.',
};

export default async function DownloadcenterPage() {
  const cards = await getDownloads();

  return (
    <>
      <header className="pt-40 pb-16 relative z-10 text-center">
        <div className="container mx-auto px-6">
          <p className="section-eyebrow">Formulare & Dokumente</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#0a1f44] uppercase tracking-tighter mb-6">
            Download<span className="text-[var(--red)]">center</span>
          </h1>
          <div className="h-1 w-24 bg-[var(--red)] mx-auto" />
          <p
            className="mt-6 text-sm"
            style={{
              color: 'var(--text-muted)',
              maxWidth: '440px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7,
            }}
          >
            Hier findest du alle wichtigen Formulare und Anträge rund um den FC
            Inter Mainz als PDF oder Word-Dokument zum Herunterladen.
          </p>
        </div>
      </header>

      <main className="relative z-10 pb-24">
        <div className="section-inner">
          <div className="download-grid" id="download-grid">
            {cards.map((card, idx) => (
              <div key={idx} className="download-card">
                <div className="download-icon">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="download-title">{card.title}</div>
                <p className="download-desc">{card.description}</p>
                <a
                  href={card.file}
                  download={card.filename}
                  className="download-btn"
                  aria-label="Datei herunterladen"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
                    />
                  </svg>
                  <span className="download-btn-text">
                    Datei herunterladen
                  </span>
                </a>
              </div>
            ))}
          </div>

          <p
            className="text-xs text-center mt-12 hint-note"
            style={{
              color: 'var(--text-muted)',
              maxWidth: '540px',
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.7,
            }}
          >
            Hinweis: Ausgefüllte Formulare bitte per E-Mail an{' '}
            <a
              href="mailto:kontakt@intermainz.de"
              className="font-bold underline"
              style={{
                color: 'var(--text-main)',
                textDecorationColor: 'rgba(204,0,0,0.4)',
              }}
            >
              kontakt@intermainz.de
            </a>{' '}
            senden oder direkt bei der sportlichen Leitung bzw. beim Vorstand
            abgeben.
          </p>
        </div>
      </main>
    </>
  );
}
