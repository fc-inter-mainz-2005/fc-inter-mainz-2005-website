'use client';

import React, { useEffect, useState } from 'react';
import { readFupaConsent, revokeFupaConsent } from './fupaConsent';

export default function FupaConsentRevoke() {
  const [stored, setStored] = useState<boolean | null>(null);

  useEffect(() => {
    setStored(readFupaConsent());
  }, []);

  if (stored === null) return null;

  if (!stored) {
    return (
      <p style={{ color: 'var(--text-main)' }}>
        Derzeit ist in diesem Browser keine Einwilligung für FuPa gespeichert.
      </p>
    );
  }

  return (
    <p>
      <button
        type="button"
        className="consent-link-button"
        onClick={() => {
          revokeFupaConsent();
          setStored(false);
        }}
      >
        FuPa-Einwilligung widerrufen
      </button>
    </p>
  );
}
