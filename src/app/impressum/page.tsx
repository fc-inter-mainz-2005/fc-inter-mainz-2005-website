import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPages } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Impressum',
  description: 'Impressum und rechtliche Angaben des FC Inter Mainz 2005 e.V.',
};

export default async function ImpressumPage() {
  const { impressum_content } = await getLegalPages();
  return (
    <>
      <div className="page-header">
        <span className="section-eyebrow">Rechtliches</span>
        <h1 className="section-title">Impressum</h1>
        <span className="section-divider" />
      </div>

      <div className="content-area">
        <Link href="/" className="back-link">
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Zurück zur Startseite
        </Link>

        <div className="legal-card">
          <h2>Angaben gemäß § 5 DDG</h2>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              FC Inter Mainz 2005 e.V.
            </strong>
            <br />
            Albert-Stohr-Straße 50
            <br />
            55128 Mainz
            <br />
            Deutschland
          </p>
        </div>

        <div className="legal-card">
          <h2>Vertreten durch</h2>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              1. Vorsitzender:
            </strong>{' '}
            Santiago Ballabriga
            <br />
            <strong style={{ color: 'var(--text-main)' }}>
              2. Vorsitzender:
            </strong>{' '}
            Fernando Trochez
            <br />
            <strong style={{ color: 'var(--text-main)' }}>
              3. Vorsitzender:
            </strong>{' '}
            José Luis Fuente Fernández
          </p>
        </div>

        <div className="legal-card">
          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href="mailto:kontakt@intermainz.de">kontakt@intermainz.de</a>
            <br />
            Website: <a href="https://www.intermainz.de">www.intermainz.de</a>
          </p>
        </div>

        <div className="legal-card">
          <h2>Registereintrag</h2>
          <p>
            Eingetragen im Vereinsregister.
            <br />
            Registergericht: Amtsgericht Mainz
            <br />
            Registernummer: VR 3999
          </p>
        </div>

        <div className="legal-card">
          <h2>Verantwortlich für den Inhalt (§ 18 Abs. 2 MStV)</h2>
          <p>
            Santiago Ballabriga
            <br />
            Albert-Stohr-Straße 50
            <br />
            55128 Mainz
          </p>
        </div>

        <div className="legal-card">
          <h2>Haftungsausschluss</h2>
          <h3>Haftung für Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte
            auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach
            §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
            verpflichtet, übermittelte oder gespeicherte fremde Informationen zu
            überwachen oder nach Umständen zu forschen, die auf eine
            rechtswidrige Tätigkeit hinweisen.
          </p>
          <p>
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
            Informationen nach den allgemeinen Gesetzen bleiben hiervon
            unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem
            Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei
            Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
            Inhalte umgehend entfernen.
          </p>
          <h3>Haftung für Links</h3>
          <p>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
            fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
            verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
            Seiten unterliegen dem deutschen Urheberrecht. Die
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
            schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </div>

        <div className="legal-card">
          <h2>Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{' '}
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren
            vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </>
  );
}
