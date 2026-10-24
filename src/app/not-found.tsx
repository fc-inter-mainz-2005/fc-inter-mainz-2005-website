import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="error-wrap">
      <Image
        src="/fotos/logo.png"
        alt="FC Inter Mainz Wappen"
        width={64}
        height={64}
        className="mb-5 h-16 w-auto"
        priority
      />
      <div className="error-code">404</div>
      <h1 className="error-title">Diese Seite gibt&apos;s bei uns nicht</h1>
      <p className="error-text">
        Der Link ist entweder falsch oder die Seite wurde verschoben. Aber keine
        Sorge — der Weg zurück ins Spiel ist ganz einfach.
      </p>
      <Link href="/" className="error-btn">
        Zur Startseite
      </Link>
    </div>
  );
}
