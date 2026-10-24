'use client';

import React, { useEffect } from 'react';
import Script from 'next/script';

export default function FupaWidgets() {
  useEffect(() => {
    // If the FuPa script was already loaded on a previous navigation, re-trigger it
    if (typeof window !== 'undefined' && (window as any)._fupaWidget) {
      try {
        (window as any)._fupaWidget.init?.();
      } catch (e) {
        // ignore
      }
    }
  }, []);

  return (
    <section className="matches-section">
      <Script
        src="https://widget-api.fupa.net/vendor/widget.js?v1"
        strategy="lazyOnload"
      />
      <div className="section-inner">
        <div className="section-header">
          <p className="section-eyebrow">Spielplan & Tabelle</p>
          <h2 className="section-title">Aktuelle Ergebnisse</h2>
          <span className="section-divider" />
        </div>

        <div className="widget-grid">
          <div className="widget-card fupa-card">
            <h3 className="widget-title">FC Inter Mainz</h3>
            <div id="fp-widget_root-3H3VDqsfqhC9UagnvObtyRxyqqv">
              <a
                href="https://www.fupa.net/club/fc-inter-mainz"
                target="_blank"
                rel="noopener noreferrer"
              >
                FC Inter Mainz I auf FuPa
              </a>
            </div>
          </div>

          <div className="widget-card fupa-card">
            <h3 className="widget-title">FC Inter Mainz II</h3>
            <div id="fp-widget_root-3H86m7DAQODYtcqZ0DSyRxT1sR4">
              <a
                href="https://www.fupa.net/club/fc-inter-mainz"
                target="_blank"
                rel="noopener noreferrer"
              >
                FC Inter Mainz II auf FuPa
              </a>
            </div>
          </div>

          <div className="widget-card fupa-card">
            <h3 className="widget-title">FC Inter Mainz Ü32</h3>
            <div id="fp-widget_root-3H3W8BQ9dKsBBPN7l8GxRiO7NtF">
              <a
                href="https://www.fupa.net/club/fc-inter-mainz"
                target="_blank"
                rel="noopener noreferrer"
              >
                FC Inter Mainz Ü32 auf FuPa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
