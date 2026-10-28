import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getBoardMembers, type BoardMember } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Unser Vorstand',
  description:
    'Die aktuelle Besetzung und Verantwortlichkeiten der Vereinsführung des FC Inter Mainz 2005 e.V. (Stand 2026).',
};

function getMemberContactHref(member: BoardMember): string | null {
  if (member.showContactButton === false || member.name === 'Sercan Güler') {
    return null;
  }
  if (member.contactHref) {
    return member.contactHref;
  }
  if (member.contactBetreff) {
    return `/kontakt?betreff=${encodeURIComponent(member.contactBetreff)}`;
  }
  if (member.name.includes('Santiago')) {
    return '/kontakt?betreff=Sponsoring%20%26%20Partnerschaften';
  }
  if (
    member.name.includes('Fernando') ||
    member.name.includes('José Luis') ||
    member.name.includes('Fuente')
  ) {
    return '/kontakt?betreff=Vorstand';
  }
  if (member.name.includes('Martin')) {
    return '/kontakt?betreff=Sportliche%20Leitung';
  }
  if (member.name.includes('Jaime')) {
    return '/kontakt?betreff=Finanzen%20%26%20Mitgliedsbeitr%C3%A4ge';
  }
  return '/kontakt';
}

function BoardMemberCard({ member }: { member: BoardMember }) {
  const roleLines = (member.role || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);
  const primaryRole = roleLines[0] || member.role;
  const secondaryRole =
    member.secondaryRole ||
    (roleLines.length > 1 ? roleLines.slice(1).join(' · ') : null);

  const contactHref = getMemberContactHref(member);

  return (
    <div className="vorstand-card">
      <div className="vorstand-photo relative">
        <Image
          src={member.photo}
          alt={member.name}
          width={140}
          height={140}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-1 text-[var(--blue)]">
        {member.name}
      </h3>
      <div className="mb-6 flex flex-col items-center justify-center min-h-[3.25rem]">
        <p className="text-[var(--red)] font-bold text-xs uppercase tracking-widest text-center">
          {primaryRole}
        </p>
        {secondaryRole && (
          <p className="text-[var(--text-muted)] font-medium text-xs mt-1.5 text-center">
            {secondaryRole}
          </p>
        )}
      </div>
      {contactHref ? (
        <Link
          href={contactHref}
          className="inline-block bg-transparent hover:bg-[var(--red)] border border-[var(--card-border)] hover:border-[var(--red)] text-[var(--blue)] hover:text-white font-bold py-3 px-8 rounded-lg transition mt-auto"
        >
          Kontaktieren
        </Link>
      ) : null}
    </div>
  );
}

export default async function VorstandPage() {
  const { vorstand: leadership, abteilung: departmentHeads } =
    await getBoardMembers();

  return (
    <>
      <header className="pt-40 pb-16 text-center z-10 relative">
        <p className="section-eyebrow">Führungsteam</p>
        <h1 className="text-4xl md:text-6xl font-black text-[#0a1f44] uppercase tracking-tighter">
          Unser Vorstand
        </h1>
        <p className="text-[var(--gray)] mt-4 max-w-2xl mx-auto px-4">
          Die aktuelle Besetzung und Verantwortlichkeiten der Vereinsführung
          (Stand 2026).
        </p>
      </header>

      <main className="section-inner relative z-10 pb-24 space-y-24">
        {/* 1. Vereinsführung */}
        <section>
          <div className="flex items-center mb-12">
            <h2 className="team-title text-2xl md:text-3xl">Vereinsführung</h2>
            <div className="flex-grow h-px bg-[var(--card-border)] ml-4 md:ml-8" />
          </div>

          <div className="vorstand-grid" id="vorstand-grid">
            {leadership.map((member, idx) => (
              <BoardMemberCard key={idx} member={member} />
            ))}
          </div>
        </section>

        {/* 2. Abteilungsverantwortliche */}
        <section>
          <div className="flex items-center mb-12">
            <h2 className="team-title text-2xl md:text-3xl">
              Abteilungs<span className="force-hyphen">-</span>
              <br className="force-break" />
              verantwortliche
            </h2>
            <div className="flex-grow h-px bg-[var(--card-border)] ml-4 md:ml-8" />
          </div>

          <div className="vorstand-grid" id="vorstand-grid-abteilung">
            {departmentHeads.map((member, idx) => (
              <BoardMemberCard key={idx} member={member} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
