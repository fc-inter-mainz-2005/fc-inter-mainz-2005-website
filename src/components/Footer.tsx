import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { FooterData } from '@/sanity/lib/fetch';

export default function Footer({ data }: { data?: FooterData }) {
  const brandDescription =
    data?.brand_description ||
    'Dein Fußballverein in der Landeshauptstadt Mainz. Gegründet 2005 mit Leidenschaft.';
  const addressLine1 = data?.address_line1 || 'Albert-Stohr-Straße 50';
  const addressLine2 = data?.address_line2 || '55128 Mainz';
  const email = data?.email || 'intermainz@gmail.com';
  const extraContact = data?.extra_contact || [];
  const facebookUrl =
    data?.facebook_url ||
    'https://www.facebook.com/p/FC-Inter-Mainz-2005-eV-100063568061273/';
  const instagramUrl =
    data?.instagram_url || 'https://www.instagram.com/fc_inter_mainz/';
  const currentYear = new Date().getFullYear();
  const defaultCopyright = `© ${currentYear} FC Inter Mainz 2005 e.V. Alle Rechte vorbehalten.`;
  const copyrightText = data?.copyright_text
    ? data.copyright_text
        .replace('{new Date().getFullYear()}', String(currentYear))
        .replace('{year}', String(currentYear))
        .replace(/©\s*\d{4}/, `© ${currentYear}`)
        .replace(/FC Inter Mainz(?!\s*2005)/g, 'FC Inter Mainz 2005')
    : defaultCopyright;

  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Image
              src="/fotos/logo.png"
              width={52}
              height={52}
              alt="FC Inter Mainz 2005 Wappen"
            />
            <div className="footer-brand-name">FC Inter Mainz 2005</div>
            <p className="footer-brand-desc" id="footer-brand-desc">
              {brandDescription}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="footer-col">
            <h4>Navigation</h4>
            <ul>
              <li>
                <Link href="/">Startseite</Link>
              </li>
              <li>
                <Link href="/geschichte">Geschichte</Link>
              </li>
              <li>
                <Link href="/teams">Teams</Link>
              </li>
              <li>
                <Link href="/vorstand">Vorstand</Link>
              </li>
              <li>
                <Link href="/kontakt">Kontakt</Link>
              </li>
              <li>
                <Link href="/probetraining">Probetraining</Link>
              </li>
              <li>
                <Link href="/downloadcenter">Downloadcenter</Link>
              </li>
              <li>
                <a
                  href="https://fc-inter-mainz.fan12.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Online-Shop
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Kontakt</h4>
            <p id="footer-address">
              {addressLine1}
              <br />
              {addressLine2}
            </p>
            {extraContact.length > 0 && (
              <div id="footer-extra-contact" className="footer-extra-contact">
                {extraContact.map((item, idx) => (
                  <p key={idx}>
                    {item.label ? `${item.label}: ` : ''}
                    {item.value}
                  </p>
                ))}
              </div>
            )}
            {email && (
              <p id="footer-email-wrap" style={{ marginBottom: '10px' }}>
                <a id="footer-email" href={`mailto:${email}`}>
                  {email}
                </a>
              </p>
            )}
            <p>
              <Link href="/kontakt">Kontakt</Link>
            </p>
          </div>

          {/* Social Media Links */}
          <div className="footer-col">
            <h4>Social Media</h4>
            <div className="footer-social">
              {facebookUrl && (
                <a
                  id="footer-facebook"
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
              )}
              {instagramUrl && (
                <a
                  id="footer-instagram"
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="footer-bottom">
          <span id="footer-copyright">{copyrightText}</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutzbestimmung">Datenschutzerklärung</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
