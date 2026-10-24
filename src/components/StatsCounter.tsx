'use client';

import React, { useEffect, useRef, useState } from 'react';

interface StatsData {
  gegruendet: string;
  mannschaften: string;
  mitglieder: string;
  nationen: string;
}

export default function StatsCounter({ stats }: { stats: StatsData }) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="stats-bar" ref={containerRef}>
      <div className="stat-item">
        <div className="stat-num" id="stat-gegruendet">
          {stats.gegruendet || '2005'}
        </div>
        <div className="stat-label">Gegründet</div>
      </div>
      <div className="stat-item">
        <div className="stat-num" id="stat-mannschaften">
          {stats.mannschaften || '3'}
        </div>
        <div className="stat-label">Mannschaften</div>
      </div>
      <div className="stat-item">
        <div className="stat-num" id="stat-mitglieder">
          {stats.mitglieder || '100+'}
        </div>
        <div className="stat-label">Mitglieder</div>
      </div>
      <div className="stat-item">
        <div className="stat-num" id="stat-nationen">
          {stats.nationen || '30+'}
        </div>
        <div className="stat-label">Nationen</div>
      </div>
    </div>
  );
}
