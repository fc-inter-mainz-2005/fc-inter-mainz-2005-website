import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LayoutWrapper from '@/components/LayoutWrapper';
import { getSiteSettings } from '@/sanity/lib/fetch';

const inter = localFont({
  src: [
    {
      path: '../../fonts/Inter-VariableFont_opsz,wght.woff2',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../../fonts/Inter-Italic-VariableFont_opsz,wght.woff2',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://intermainz.de'),
  title: {
    default: 'FC Inter Mainz 2005 e.V.',
    template: '%s | FC Inter Mainz 2005 e.V.',
  },
  description:
    'FC Inter Mainz 2005 e.V. – Fußballverein in Mainz mit drei Mannschaften. Trainingszeiten, Probetraining, Vereinsgeschichte und aktuelle News.',
  icons: {
    icon: '/fotos/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://intermainz.de',
    siteName: 'FC Inter Mainz 2005 e.V.',
    title: 'FC Inter Mainz 2005 e.V. – Fußballverein in Mainz',
    description:
      'Dein Fußballverein für alle Generationen in Mainz. Gegründet 2005 mit Leidenschaft.',
    images: [
      {
        url: '/fotos/InterMainz1.jpeg',
        width: 1200,
        height: 630,
        alt: 'FC Inter Mainz 2005 e.V.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FC Inter Mainz 2005 e.V. – Fußballverein in Mainz',
    description:
      'Dein Fußballverein für alle Generationen in Mainz. Gegründet 2005 mit Leidenschaft.',
    images: ['/fotos/InterMainz1.jpeg'],
  },
};

const sportsClubJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SportsOrganization',
  name: 'FC Inter Mainz 2005 e.V.',
  url: 'https://intermainz.de',
  logo: 'https://intermainz.de/fotos/logo.png',
  foundingDate: '2005',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Albert-Stohr-Straße 50',
    postalCode: '55128',
    addressLocality: 'Mainz',
    addressCountry: 'DE',
  },
  email: 'kontakt@intermainz.de',
  sameAs: [
    'https://www.facebook.com/p/FC-Inter-Mainz-2005-eV-100063568061273/',
    'https://www.instagram.com/fc_inter_mainz/',
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { banner, footer } = await getSiteSettings();

  return (
    <html lang="de" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(sportsClubJsonLd),
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <LayoutWrapper
          navbar={<Navbar banner={banner} />}
          footer={<Footer data={footer} />}
        >
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
