import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getTeams } from '@/sanity/lib/fetch';
import { normalizeSrc } from '@/sanity/lib/image';

export const metadata: Metadata = {
  title: 'Unsere Mannschaften',
  description:
    'Die Mannschaften des FC Inter Mainz 2005 e.V.: Inter Mainz I (B-Klasse), Inter Mainz II (C-Klasse) und die Alte Herren (Ü32).',
};

const badgeStyles: Record<string, { bg: string; color: string }> = {
  'B-Klasse': { bg: 'var(--red)', color: 'white' },
  'C-Klasse': { bg: 'var(--blue-mid)', color: 'white' },
  Ü32: { bg: '#e2e8f0', color: 'var(--blue)' },
};

export default async function TeamsPage() {
  const teams = await getTeams();

  return (
    <>
      <header className="pt-40 pb-16 relative z-10 text-center">
        <div className="container mx-auto px-6">
          <p className="section-eyebrow">Die Kader</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#0a1f44] uppercase tracking-tighter mb-6">
            Unsere<br className="force-break" />{' '}
            <span className="text-[var(--red)]">Mannschaften</span>
          </h1>
          <div className="h-1 w-24 bg-[var(--red)] mx-auto" />

          <div
            className="mt-10 flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest"
            id="teams-nav"
          >
            {teams.map((team, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-300">|</span>}
                <a
                  href={`#team-${idx}`}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition"
                >
                  {team.name}
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      <main className="relative z-10 pb-24">
        <div className="section-inner space-y-28">
          <div id="teams-container" className="space-y-28">
            {teams.map((team, idx) => {
              const badgeStyle = badgeStyles[team.liga] || {
                bg: 'var(--red)',
                color: 'white',
              };

              return (
                <section key={idx} id={`team-${idx}`}>
                  <div className="flex items-center mb-8">
                    <h2 className="team-title">{team.name}</h2>
                    <div className="flex-grow h-px bg-gray-200 ml-4 md:ml-8" />
                    <span
                      className="ml-4 md:ml-8 text-xs font-bold px-3 py-1 rounded tracking-widest uppercase liga-badge"
                      style={{
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                      }}
                    >
                      {team.liga}
                    </span>
                  </div>

                  <div className="bg-[var(--bg-surface)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] shadow-md transform transition hover:scale-[1.02] duration-500">
                    <div className="team-photo-wrap">
                      <Image
                        src={normalizeSrc(team.photo)}
                        alt={`Mannschaftsfoto ${team.name}`}
                        fill
                        sizes="(min-width: 1024px) 900px, 100vw"
                        priority={idx === 0}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    </div>
                    {team.fupa_link && (
                      <div className="fupa-link-wrap">
                        <a
                          href={team.fupa_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-wider text-[var(--red)] hover:text-[var(--blue)] transition"
                        >
                          Kompletten Kader ansehen
                          <svg
                            width="14"
                            height="14"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
