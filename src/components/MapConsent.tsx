'use client';

import React, { useState } from 'react';
import Link from 'next/link';

type Props = {
  /** Already URL-encoded query string for Google Maps. */
  mapsQuery: string;
  addressLine: string;
};

/**
 * Click-to-load wrapper for the Google Maps embed.
 * No request goes to Google until the user clicks "Karte laden".
 * Consent applies to the current page view only and is not stored.
 */
export default function MapConsent({ mapsQuery, addressLine }: Props) {
  const [loaded, setLoaded] = useState(false);
  const externalUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  if (loaded) {
    return (
      <iframe
        id="map-iframe"
        src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        title="Standort FC Inter Mainz auf Google Maps"
      />
    );
  }

  return (
    <div className="map-placeholder">
      <p className="map-placeholder-address">{addressLine}</p>
      <p className="consent-notice">
        Beim Laden der Karte werden Daten (u.&nbsp;a. Ihre IP-Adresse) an
        Google übertragen. Mehr dazu in der{' '}
        <Link href="/datenschutzbestimmung#google-maps">
          Datenschutzerklärung
        </Link>
        .
      </p>
      <button
        type="button"
        className="consent-btn"
        onClick={() => setLoaded(true)}
      >
        Karte laden
      </button>
      <a
        href={externalUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="consent-link"
      >
        In Google Maps öffnen
      </a>
    </div>
  );
}
