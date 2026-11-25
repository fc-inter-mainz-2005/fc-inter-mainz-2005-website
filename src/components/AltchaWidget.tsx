'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import type {} from 'altcha/types/react';
import type { WidgetMethods } from 'altcha/types';

export type AltchaWidgetHandle = {
  /** Clears the check so a fresh challenge is solved (e.g. after a failed submission). */
  reset: () => void;
};

/** Widget texts in the site's "du" tone (overrides the formal defaults of altcha/i18n/de). */
const DE_TEXTS = {
  label: 'Ich bin kein Roboter',
  error: 'Überprüfung fehlgeschlagen. Bitte versuche es erneut.',
  expired: 'Überprüfung abgelaufen. Bitte bestätige erneut.',
  verificationRequired: 'Bitte bestätige zuerst „Ich bin kein Roboter“.',
  waitAlert: 'Überprüfung läuft … bitte einen Moment warten.',
};

const WIDGET_CONFIGURATION = JSON.stringify({
  humanInteractionSignature: false,
  validationMessage: 'Bitte bestätige „Ich bin kein Roboter“, bevor du das Formular absendest.',
});

let loader: Promise<void> | null = null;

/** Loads the web component and German texts once, in the browser only. */
function loadAltcha(): Promise<void> {
  if (!loader) {
    loader = (async () => {
      await import('altcha');
      await import('altcha/i18n/de');
      const de = globalThis.$altcha.i18n.get('de') ?? {};
      globalThis.$altcha.i18n.set('de', { ...de, ...DE_TEXTS });
    })().catch((err) => {
      loader = null;
      throw err;
    });
  }
  return loader;
}

/**
 * Self-hosted bot check (ALTCHA). Solves a small proof-of-work in the background once the
 * user starts filling in the form; it sets no cookies and contacts only our own /api/altcha.
 * It adds a hidden "altcha" field to the surrounding form and a required checkbox.
 */
const AltchaWidget = forwardRef<AltchaWidgetHandle, { className?: string }>(function AltchaWidget(
  { className = 'mb-5' },
  ref
) {
  const [ready, setReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const elRef = useRef<HTMLElement & Partial<WidgetMethods>>(null);

  useEffect(() => {
    let active = true;
    loadAltcha()
      .then(() => active && setReady(true))
      .catch((err) => {
        console.error('ALTCHA konnte nicht geladen werden:', err);
        if (active) setLoadFailed(true);
      });
    return () => {
      active = false;
    };
  }, []);

  useImperativeHandle(ref, () => ({
    reset: () => elRef.current?.reset?.(),
  }));

  if (loadFailed) {
    return (
      <p className={`text-sm text-red-700 ${className}`} role="alert">
        Die Sicherheitsprüfung konnte nicht geladen werden. Bitte lade die Seite neu oder schreib
        uns direkt an{' '}
        <a href="mailto:intermainz@gmail.com" style={{ textDecoration: 'underline' }}>
          intermainz@gmail.com
        </a>
        .
      </p>
    );
  }

  return (
    <div className={className} style={{ minHeight: 60 }}>
      {ready ? (
        <altcha-widget
          ref={elRef}
          challenge="/api/altcha"
          language="de"
          auto="onfocus"
          type="checkbox"
          name="altcha"
          configuration={WIDGET_CONFIGURATION}
        />
      ) : (
        <p className="text-sm text-gray-500" aria-live="polite">
          Sicherheitsprüfung wird geladen …
        </p>
      )}
    </div>
  );
});

export default AltchaWidget;
