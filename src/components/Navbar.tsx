'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import type { BannerData } from '@/sanity/lib/fetch';

export default function Navbar({ banner }: { banner?: BannerData }) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isClubGroupOpen, setIsClubGroupOpen] = useState(false);
  const [isClubDropdownOpen, setIsClubDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Transparent-to-solid scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    // Set initial state
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
    setIsClubGroupOpen(false);
    setIsClubDropdownOpen(false);
  }, [pathname]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const isVereinActive =
    pathname === '/geschichte' ||
    pathname === '/teams' ||
    pathname === '/vorstand';

  // Only make transparent on the home page (which has a full-bleed dark hero)
  const isHomePage = pathname === '/';
  const isTransparent = isHomePage && !isScrolled && !isMobileOpen;

  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <>
      <div className="top-bar" id="topBar">
        {banner?.show_banner && (
          <div className="domain-banner" id="domain-banner">
            {banner.banner_text}
          </div>
        )}

        <nav
          id="navbar"
          className={isTransparent ? 'transparent' : ''}
        >
          {/* Mobile Cart Icon */}
          <a
            href="https://fc-inter-mainz.fan12.de/"
            className="nav-cart-mobile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Online-Shop"
            style={isTransparent ? { color: 'white' } : undefined}
          >
            <svg
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </a>

          {/* Club Logo */}
          <Link href="/" className="nav-logo">
            <Image
              src="/fotos/logo.png"
              width={46}
              height={46}
              alt="Inter Mainz Wappen"
              priority
            />
            <span style={isTransparent ? { color: 'white', textShadow: '0 0 20px rgba(0,0,0,0.8)' } : undefined}>
              FC Inter Mainz
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            <li>
              <Link
                href="/"
                className={pathname === '/' ? 'active' : ''}
                style={isTransparent ? { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                Startseite
              </Link>
            </li>
            <li
              className={`has-dropdown ${isClubDropdownOpen ? 'open' : ''}`}
              onMouseEnter={() => setIsClubDropdownOpen(true)}
              onMouseLeave={() => setIsClubDropdownOpen(false)}
            >
              <button
                type="button"
                className={`dropdown-toggle ${isVereinActive ? 'active' : ''}`}
                onClick={() => setIsClubDropdownOpen((prev) => !prev)}
                aria-expanded={isClubDropdownOpen}
                style={isTransparent
                  ? { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }
                  : undefined
                }
              >
                Verein
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M1 1l5 5 5-5" />
                </svg>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    href="/geschichte"
                    className={pathname === '/geschichte' ? 'active' : ''}
                  >
                    Geschichte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/teams"
                    className={pathname === '/teams' ? 'active' : ''}
                  >
                    Teams
                  </Link>
                </li>
                <li>
                  <Link
                    href="/vorstand"
                    className={pathname === '/vorstand' ? 'active' : ''}
                  >
                    Vorstand
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link
                href="/kontakt"
                className={pathname === '/kontakt' ? 'active' : ''}
                style={isTransparent ? { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                Kontakt
              </Link>
            </li>
            <li>
              <Link
                href="/probetraining"
                className={pathname === '/probetraining' ? 'active' : ''}
                style={isTransparent ? { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                Probetraining
              </Link>
            </li>
            <li>
              <Link
                href="/downloadcenter"
                className={pathname === '/downloadcenter' ? 'active' : ''}
                style={isTransparent ? { color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                Downloadcenter
              </Link>
            </li>
            <li>
              <a
                href="https://fc-inter-mainz.fan12.de/"
                className="nav-cta"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                Online-Shop
              </a>
            </li>
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="nav-hamburger"
            id="hamburger"
            aria-label="Menü öffnen"
            onClick={() => setIsMobileOpen(true)}
            type="button"
            style={isTransparent ? { '--hamburger-color': 'white' } as React.CSSProperties : undefined}
          >
            <span style={isTransparent ? { background: 'white' } : undefined} />
            <span style={isTransparent ? { background: 'white' } : undefined} />
            <span style={isTransparent ? { background: 'white' } : undefined} />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`mobile-nav ${isMobileOpen ? 'open' : ''}`}
        id="mobile-nav"
      >
        <button
          className="mobile-nav-close"
          id="mobile-close"
          aria-label="Menü schließen"
          onClick={() => setIsMobileOpen(false)}
          type="button"
        >
          <svg fill="none" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <Link
          href="/"
          className={pathname === '/' ? 'active' : ''}
          onClick={() => setIsMobileOpen(false)}
        >
          Startseite
        </Link>

        <div className={`mobile-nav-group ${isClubGroupOpen ? 'open' : ''}`}>
          <button
            className={`mobile-nav-group-toggle ${isVereinActive ? 'active' : ''}`}
            onClick={() => setIsClubGroupOpen((prev) => !prev)}
            type="button"
          >
            Verein
            <svg
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <div className="mobile-nav-submenu">
            <Link
              href="/geschichte"
              className={pathname === '/geschichte' ? 'active' : ''}
              onClick={() => setIsMobileOpen(false)}
            >
              Geschichte
            </Link>
            <Link
              href="/vorstand"
              className={pathname === '/vorstand' ? 'active' : ''}
              onClick={() => setIsMobileOpen(false)}
            >
              Vorstand
            </Link>
            <Link
              href="/teams"
              className={pathname === '/teams' ? 'active' : ''}
              onClick={() => setIsMobileOpen(false)}
            >
              Teams
            </Link>
          </div>
        </div>

        <Link
          href="/kontakt"
          className={pathname === '/kontakt' ? 'active' : ''}
          onClick={() => setIsMobileOpen(false)}
        >
          Kontakt
        </Link>
        <Link
          href="/probetraining"
          className={pathname === '/probetraining' ? 'active' : ''}
          onClick={() => setIsMobileOpen(false)}
        >
          Probetraining
        </Link>
        <Link
          href="/downloadcenter"
          className={pathname === '/downloadcenter' ? 'active' : ''}
          onClick={() => setIsMobileOpen(false)}
        >
          Downloadcenter
        </Link>
        <a
          href="https://fc-inter-mainz.fan12.de/"
          className="nav-cta mt-4"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setIsMobileOpen(false)}
        >
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          Online-Shop
        </a>
      </div>
    </>
  );
}
