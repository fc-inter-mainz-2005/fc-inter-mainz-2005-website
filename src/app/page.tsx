import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import HeroSlider from '@/components/HeroSlider';
import StatsCounter from '@/components/StatsCounter';
import FupaWidgets from '@/components/FupaWidgets';

import {
  getSiteSettings,
  getEvents,
  getSponsors,
  getPartners,
} from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'FC Inter Mainz 2005 e.V. – Fußballverein in Mainz',
  description:
    'FC Inter Mainz 2005 e.V. – Fußballverein in Mainz mit drei Mannschaften. Trainingszeiten, Probetraining, Vereinsgeschichte und aktuelle News.',
};

export default async function HomePage() {
  const [{ hero, stats }, events, sponsors, partners] = await Promise.all([
    getSiteSettings(),
    getEvents(),
    getSponsors(),
    getPartners(),
  ]);

  return (
    <>
      {/* 1. Hero Slideshow */}
      <HeroSlider data={hero} />

      {/* 2. Stats / Counter Bar */}
      <StatsCounter stats={stats} />

      {/* 3. Matchday & FuPa Widgets */}
      <FupaWidgets />

      {/* 4. Sponsors & Partners */}
      <section>
        <div className="section-inner">
          <p className="sponsors-label">Unsere offiziellen Partner & Sponsoren</p>

          <div className="sponsors-grid" id="sponsors-track">
            {sponsors.map((sponsor, idx) => (
              <a
                key={idx}
                href={sponsor.link}
                target="_blank"
                rel="noopener noreferrer"
                className="sponsor-item"
                title={sponsor.name}
              >
                <Image
                  src={sponsor.image}
                  alt={sponsor.name}
                  width={140}
                  height={70}
                  className="max-h-[88px] w-auto h-auto object-contain rounded-lg"
                />
              </a>
            ))}
          </div>

          {partners.length > 0 && (
            <div id="collab-block" style={{ marginTop: '64px' }}>
              <p className="sponsors-label">Unsere Kooperationspartner</p>
              <div className="sponsors-grid" id="collab-track">
                {partners.map((partner, idx) => (
                  <a
                    key={idx}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sponsor-item"
                    title={partner.name}
                  >
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      width={140}
                      height={70}
                      className="max-h-[88px] w-auto h-auto object-contain rounded-lg"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 5. About ("Über uns") Section */}
      <section className="vorstand-section" id="ueber-uns">
        <div className="section-inner">
          <div className="section-header">
            <p className="section-eyebrow">Der Verein</p>
            <h2 className="section-title">Über uns</h2>
            <span className="section-divider" />
          </div>

          <div className="about-grid">
            {/* Card 1: Geschichte */}
            <Link href="/geschichte" className="about-card">
              <Image
                src="/fotos/InterMainzGrundung.jpg"
                alt="Geschichte"
                fill
                sizes="(min-width: 900px) 420px, 100vw"
                className="about-card-img object-cover"
              />
              <div className="about-card-content">
                <div className="about-card-title">Geschichte</div>
                <span className="about-card-btn">
                  Mehr erfahren
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
                </span>
              </div>
            </Link>

            {/* Card 2: Teams */}
            <Link href="/teams" className="about-card">
              <Image
                src="/fotos/TeamsIndex.jpg"
                alt="Teams"
                fill
                sizes="(min-width: 900px) 420px, 100vw"
                className="about-card-img object-cover"
              />
              <div className="about-card-content">
                <div className="about-card-title">Teams</div>
                <span className="about-card-btn">
                  Mehr erfahren
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
                </span>
              </div>
            </Link>

            {/* Card 3: Vorstand */}
            <Link href="/vorstand" className="about-card">
              <Image
                src="/fotos/InterMainz4.jpg"
                alt="Vorstand"
                fill
                sizes="(min-width: 900px) 420px, 100vw"
                className="about-card-img object-cover"
              />
              <div className="about-card-content">
                <div className="about-card-title">Vorstand</div>
                <span className="about-card-btn">
                  Mehr erfahren
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
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Upcoming Events / Neuigkeiten */}
      {events.length > 0 && (
        <section>
          <div className="section-inner">
            <div className="news-events">
              <div id="veranstaltungen">
                <div className="section-header">
                  <p className="section-eyebrow">Kalender</p>
                  <h2 className="section-title">Neuigkeiten</h2>
                  <span className="section-divider" />
                </div>
                <div id="event-list" className="space-y-4">
                  {events.map((ev, idx) => (
                    <div key={idx} className="news-card">
                      <div className="news-card-content">
                        <div className="news-card-title">{ev.name}</div>
                        {ev.meta && <div className="news-card-meta">{ev.meta}</div>}
                        <p className="news-card-desc">{ev.description}</p>
                        {ev.link_url && (
                          <a
                            className="news-card-link"
                            href={ev.link_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {ev.link_text || 'Mehr erfahren'}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
