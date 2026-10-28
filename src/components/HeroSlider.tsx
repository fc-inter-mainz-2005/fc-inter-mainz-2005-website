'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const normalizeSrc = (src: string) =>
  src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')
    ? src
    : `/${src}`;

interface Slide {
  image: string;
}

interface HeroData {
  title_line1: string;
  title_accent: string;
  title_line3: string;
  subtitle: string;
  slides: Slide[];
}

export default function HeroSlider({ data }: { data: HeroData }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = data.slides || [];

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <header className="hero">
      <div className="hero-slides" id="heroSlides">
        {slides.map((slide, idx) => {
          const imgPath = normalizeSrc(slide.image);
          const isActive = idx === currentSlide;

          return (
            <div
              key={idx}
              className={`hero-slide ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <Image
                src={imgPath}
                alt={idx === 0 ? 'FC Inter Mainz' : ''}
                fill
                priority={idx === 0}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: 'center' }}
              />
            </div>
          );
        })}
      </div>

      <div className="hero-content">

        <h1 className="hero-title" id="hero-title">
          {data.title_line1}{' '}
          <span className="accent">{data.title_accent}</span>{' '}
          {data.title_line3}
        </h1>

        <p className="hero-sub" id="hero-sub">
          {data.subtitle}
        </p>

        <div className="hero-actions">
          <Link href="/probetraining" className="btn-primary">
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Probetraining
          </Link>
          <a href="#ueber-uns" className="btn-outline">
            Über uns
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
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>

        {slides.length > 1 && (
          <div className="hero-indicators" id="heroIndicators">
            {slides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`hero-dot ${idx === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
