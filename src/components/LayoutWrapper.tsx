'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function LayoutWrapper({
  children,
  navbar,
  footer,
}: {
  children: React.ReactNode;
  navbar: React.ReactNode;
  footer: React.ReactNode;
}) {
  const pathname = usePathname();
  const isStudio = pathname?.startsWith('/studio');

  if (isStudio) {
    return <>{children}</>;
  }

  return (
    <>
      {navbar}
      <main className="flex-grow">{children}</main>
      {footer}
    </>
  );
}
