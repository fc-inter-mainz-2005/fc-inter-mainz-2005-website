import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { getGeschichtePage } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Vereinsgeschichte',
  description:
    'Die Geschichte des FC Inter Mainz 2005 e.V. – von der Gründung 2005 über den Aufstieg bis zum modernen Verein mit drei Mannschaften.',
};

export default async function GeschichtePage() {
  const { gruendung, aufstieg, heute } = await getGeschichtePage();

  return (
    <>
      <header className="pt-40 pb-16 relative z-10 text-center">
        <div className="container mx-auto px-6">
          <p className="section-eyebrow">Tradition seit 2005</p>
          <h1 className="text-4xl md:text-6xl font-black text-[#0a1f44] uppercase tracking-tighter mb-6">
            Unsere<br className="force-break" />{' '}
            <span className="text-[var(--red)]">Geschichte</span>
          </h1>
          <div className="h-1 w-24 bg-[var(--red)] mx-auto" />
        </div>
      </header>

      <main className="relative z-10 pb-24">
        <div className="section-inner space-y-32">
          {/* 1. Die Gründung */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 lg:col-span-5">
              <div className="bg-year-watermark" id="jahr-gruendung">
                {gruendung.jahr}
              </div>
              <h2 className="history-title" id="titel-gruendung">
                {gruendung.titel}
              </h2>
              <div
                className="text-[var(--gray)] leading-relaxed text-sm md:text-base space-y-4"
                id="text-gruendung"
              >
                {gruendung.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7 bg-[var(--card-bg)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] transform transition hover:scale-105 duration-500 shadow-2xl">
              <div className="history-photo-wrap">
                <Image
                  src={gruendung.photo}
                  alt={gruendung.titel}
                  fill
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* 2. Aufstieg & Wachstum */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="order-1 lg:col-span-7 bg-[var(--card-bg)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] transform transition hover:scale-105 duration-500 shadow-2xl">
              <div className="history-photo-wrap">
                <Image
                  src={aufstieg.photo}
                  alt={aufstieg.titel}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="relative order-2 lg:col-span-5">
              <div className="bg-year-watermark" id="jahr-aufstieg">
                {aufstieg.jahr}
              </div>
              <h2 className="history-title" id="titel-aufstieg">
                {aufstieg.titel}
              </h2>
              <div
                className="text-[var(--gray)] leading-relaxed text-sm md:text-base space-y-4"
                id="text-aufstieg"
              >
                {aufstieg.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Der moderne Verein */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="relative order-2 lg:order-1 lg:col-span-5">
              <div
                className="bg-year-watermark"
                id="jahr-heute"
                style={{ fontSize: '6rem', top: '-30px' }}
              >
                {heute.jahr}
              </div>
              <h2 className="history-title" id="titel-heute">
                {heute.titel}
              </h2>
              <div
                className="text-[var(--gray)] leading-relaxed text-sm md:text-base space-y-4"
                id="text-heute"
              >
                {heute.text.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="order-1 lg:order-2 lg:col-span-7 bg-[var(--card-bg)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] transform transition hover:scale-105 duration-500 shadow-2xl">
              <div className="history-photo-wrap">
                <Image
                  src={heute.photo}
                  alt={heute.titel}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
