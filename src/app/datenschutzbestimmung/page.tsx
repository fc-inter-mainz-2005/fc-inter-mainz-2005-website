import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPages } from '@/sanity/lib/fetch';

export const metadata: Metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung des FC Inter Mainz 2005 e.V. nach der Datenschutz-Grundverordnung (DSGVO).',
};

export default async function DatenschutzPage() {
  const { datenschutz_content } = await getLegalPages();
  return (
    <>
      <div className="page-header">
        <span className="section-eyebrow">Rechtliches</span>
        <h1 className="section-title">Datenschutzerklärung</h1>
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

        {/* Table of Contents */}
        <div className="toc-card">
          <h2>Inhaltsverzeichnis</h2>
          <ol>
            <li>
              <a href="#verantwortlicher">Verantwortlicher</a>
            </li>
            <li>
              <a href="#grundsaetze">Grundsätze der Datenverarbeitung</a>
            </li>
            <li>
              <a href="#rechte">Rechte der betroffenen Personen</a>
            </li>
            <li>
              <a href="#kontaktformular">
                Kontaktformular &amp; Probetraining
              </a>
            </li>
            <li>
              <a href="#hosting">Hosting</a>
            </li>
            <li>
              <a href="#cookies">Cookies</a>
            </li>
            <li>
              <a href="#fupa">FuPa-Widgets</a>
            </li>
            <li>
              <a href="#instagram">Instagram</a>
            </li>
            <li>
              <a href="#aenderungen">Änderungen dieser Erklärung</a>
            </li>
          </ol>
        </div>

        {/* 1. Verantwortlicher */}
        <div className="legal-card" id="verantwortlicher">
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und
            anderer nationaler Datenschutzgesetze sowie sonstiger
            datenschutzrechtlicher Bestimmungen ist:
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              FC Inter Mainz 2005 e.V.
            </strong>
            <br />
            Albert-Stohr-Straße 50 · 55128 Mainz
            <br />
            <a href="mailto:kontakt@intermainz.de">kontakt@intermainz.de</a>
          </p>
        </div>

        {/* 2. Grundsätze */}
        <div className="legal-card" id="grundsaetze">
          <h2>2. Grundsätze der Datenverarbeitung</h2>
          <p>
            Personenbezogene Daten werden von uns nur im Rahmen der
            Erforderlichkeit sowie zum Zwecke der Bereitstellung eines
            funktionsfähigen und nutzerfreundlichen Internetauftritts
            verarbeitet. Gemäß Art. 4 Ziffer 1 DSGVO gilt als „Verarbeitung“
            jeder Vorgang im Zusammenhang mit personenbezogenen Daten.
          </p>
          <p>
            Wir verarbeiten personenbezogene Daten nur, wenn eine der folgenden
            Rechtsgrundlagen vorliegt:
          </p>
          <ul>
            <li>Einwilligung der betroffenen Person (Art. 6 Abs. 1 lit. a DSGVO)</li>
            <li>Erfüllung eines Vertrags (Art. 6 Abs. 1 lit. b DSGVO)</li>
            <li>
              Erfüllung einer rechtlichen Verpflichtung (Art. 6 Abs. 1 lit. c
              DSGVO)
            </li>
            <li>Wahrung berechtigter Interessen (Art. 6 Abs. 1 lit. f DSGVO)</li>
          </ul>
        </div>

        {/* 3. Rechte der betroffenen Personen */}
        <div className="legal-card" id="rechte">
          <h2>3. Rechte der betroffenen Personen</h2>
          <p>Sie haben als betroffene Person folgende Rechte gegenüber uns:</p>
          <h3>Recht auf Auskunft (Art. 15 DSGVO)</h3>
          <p>
            Sie haben das Recht, Auskunft über die zu Ihrer Person gespeicherten
            Daten sowie über deren Verarbeitung zu erhalten.
          </p>
          <h3>Recht auf Berichtigung (Art. 16 DSGVO)</h3>
          <p>
            Sie haben das Recht, unrichtige personenbezogene Daten berichtigen zu
            lassen.
          </p>
          <h3>Recht auf Löschung (Art. 17 DSGVO)</h3>
          <p>
            Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten Daten zu
            verlangen, sofern keine gesetzlichen Aufbewahrungspflichten
            entgegenstehen.
          </p>
          <h3>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
          <p>
            Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
            personenbezogenen Daten zu verlangen.
          </p>
          <h3>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
          <p>
            Sie haben das Recht, Ihre bereitgestellten Daten in einem
            strukturierten, maschinenlesbaren Format zu erhalten.
          </p>
          <h3>Widerspruchsrecht (Art. 21 DSGVO)</h3>
          <p>
            Sie haben das Recht, jederzeit der Verarbeitung Ihrer Daten zu
            widersprechen.
          </p>
          <h3>Beschwerderecht</h3>
          <p>
            Sie haben das Recht, sich bei der zuständigen
            Datenschutzaufsichtsbehörde zu beschweren. In Rheinland-Pfalz ist
            dies der Landesbeauftragte für den Datenschutz und die
            Informationsfreiheit:{' '}
            <a
              href="https://www.datenschutz.rlp.de"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.datenschutz.rlp.de
            </a>
          </p>
        </div>

        {/* 4. Formulare & Probetraining */}
        <div className="legal-card" id="kontaktformular">
          <h2>4. Kontaktformular und Anmeldung zum Probetraining</h2>
          <p>
            Wenn Sie uns über unsere Formulare kontaktieren oder sich für ein
            Probetraining anmelden, werden die von Ihnen eingegebenen Daten zur
            Bearbeitung Ihres Anliegens bei uns gespeichert.
          </p>
          <p>
            Die Übermittlung der Formulardaten erfolgt technisch über den Dienst
            „Netlify Forms“ unseres Hosting-Anbieters Netlify, Inc. Es werden
            dabei keine zusätzlichen Cookies gesetzt.
          </p>

          <h3 style={{ marginTop: '12px', fontSize: '0.85rem' }}>
            Kontaktformular
          </h3>
          <p>
            Für allgemeine Anfragen erheben wir: Vorname, Nachname,
            E-Mail-Adresse, Anliegen und Ihre Nachricht. Als Anliegen können Sie
            zwischen „Allgemeine Anfrage“, „Mitgliedschaft“, „Sponsoring“,
            „Social Media“ und „Sonstiges“ wählen. Für eine Anmeldung zum
            Probetraining nutzen Sie bitte ausschließlich das separate
            Anmeldeformular auf unserer Seite „Probetraining“.
          </p>

          <p style={{ marginTop: '12px' }}>
            <strong style={{ color: 'var(--text-main)' }}>
              Speicherdauer (Kontaktformular):
            </strong>{' '}
            Die Daten aus dem Kontaktformular werden gelöscht, sobald Ihre
            Anfrage abschließend bearbeitet wurde, spätestens jedoch nach 12
            Monaten, sofern keine gesetzlichen Aufbewahrungspflichten
            entgegenstehen.
          </p>

          <h3 style={{ marginTop: '12px', fontSize: '0.85rem' }}>
            Datei-Anhang (optional)
          </h3>
          <p>
            Sie haben die Möglichkeit, dem Kontaktformular freiwillig eine Datei
            (z.B. PDF, Bild) beizufügen. Diese wird ausschließlich zur
            Bearbeitung Ihres Anliegens verwendet und nach Abschluss der
            Bearbeitung gelöscht.
          </p>

          <h3 style={{ marginTop: '12px', fontSize: '0.85rem' }}>
            Anmeldung zum Probetraining
          </h3>
          <p>
            Für die Organisation des Probetrainings erheben wir zusätzlich:{' '}
            <strong>Geburtsdatum und Telefonnummer</strong>. Diese Daten sind
            zwingend erforderlich, um Sie der passenden Altersklasse/Mannschaft
            zuzuordnen und Sie bei kurzfristigen Terminänderungen (z.B.
            Trainingsausfall) kontaktieren zu können.
          </p>
          <p>
            Zusätzlich fragen wir ab, ob Sie aktuell bei einem anderen Verein
            spielberechtigt sind und, falls ja, bei welchem Verein. Diese Angabe
            ist erforderlich, um Ihre Spielberechtigung im Rahmen eines
            möglichen Vereinswechsels korrekt einschätzen zu können. Optional
            können Sie uns zudem im Anmeldeformular freiwillige Anmerkungen oder
            Fragen zum Probetraining mitteilen.
          </p>

          <p style={{ marginTop: '12px' }}>
            <strong style={{ color: 'var(--text-main)' }}>
              Rechtsgrundlage:
            </strong>{' '}
            Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO
            (Anbahnung eines Vertragsverhältnisses/Vereinsmitgliedschaft) sowie
            Art. 6 Abs. 1 lit. f DSGVO (unser berechtigtes Interesse an der
            Organisation des Spielbetriebs und der Beantwortung von Anfragen).
          </p>

          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Speicherdauer:
            </strong>{' '}
            Die Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet
            wurde (z.B. nach Abschluss des Probetrainings, falls keine
            Mitgliedschaft zustande kommt) und keine gesetzlichen
            Aufbewahrungspflichten entgegenstehen.
          </p>
          <p>
            Ihre Daten werden nicht an Dritte weitergegeben und ausschließlich
            für den genannten Zweck (Vereinsorganisation) genutzt.
          </p>
        </div>

        {/* 5. Hosting */}
        <div className="legal-card" id="hosting">
          <h2>5. Hosting</h2>
          <p>
            Unsere Website wird extern gehostet. Wir nutzen für die Bereitstellung
            und den Betrieb dieser Online-Präsenz die Infrastruktur und Dienste
            von <strong>Netlify, Inc.</strong> (512 2nd Street, Floor 2, San
            Francisco, CA 94107, USA). Die personenbezogenen Daten, die beim
            Besuch dieser Website automatisch erfasst werden (insbesondere
            Logfiles wie IP-Adressen, Browsertyp, Datum und Uhrzeit des
            Zugriffs, etc.) sowie Daten aus Formularen, werden auf den Servern
            dieses Anbieters verarbeitet.
          </p>
          <p>
            Die Nutzung dieses Hosters erfolgt auf Grundlage von Art. 6 Abs. 1
            lit. f DSGVO (berechtigtes Interesse an einer sicheren, schnellen,
            fehlerfreien und effizienten Bereitstellung unseres Vereinsangebots
            durch einen professionellen IT-Dienstleister).
          </p>
          <p>
            <strong>Auftragsverarbeitung (AVV):</strong> Wir haben mit dem
            genannten Anbieter einen Vertrag über Auftragsverarbeitung (bzw. ein
            entsprechendes Data Processing Agreement) gemäß Art. 28 DSGVO
            abgeschlossen. Dies stellt sicher, dass die Verarbeitung streng nach
            unseren Weisungen und im Einklang mit europäischen
            Datenschutzstandards erfolgt. Soweit Daten bei der Nutzung von
            Netlify in die USA übertragen werden, wird das Datenschutzniveau
            durch den Abschluss der EU-Standardvertragsklauseln (Standard
            Contractual Clauses - SCC) abgesichert.
          </p>
        </div>

        {/* 6. Cookies */}
        <div className="legal-card" id="cookies">
          <h2>6. Cookies</h2>
          <p>
            Unsere Website selbst verwendet keine eigenen Tracking- oder
            Analyse-Cookies. Durch die Einbindung des FuPa-Widgets (siehe
            Abschnitt 7) können jedoch Cookies des Anbieters FuPa GmbH gesetzt
            werden, auf deren Inhalt und Speicherdauer wir keinen Einfluss
            haben. Nähere Informationen hierzu entnehmen Sie bitte der
            Datenschutzerklärung von FuPa.
          </p>
        </div>

        {/* 7. FuPa-Widgets */}
        <div className="legal-card" id="fupa">
          <h2>7. FuPa-Widgets</h2>
          <p>
            Auf unserer Website binden wir Widgets der Plattform{' '}
            <strong>FuPa</strong> ein, um aktuelle Spielergebnisse,
            Tabellenstände und kommende Spielpaarungen unserer Mannschaften live
            anzuzeigen. Dies ist ein Angebot der FuPa GmbH (Peigertinger Str. 9,
            94538 Fürstenstein).
          </p>
          <p>
            Beim Aufruf von Seiten unserer Website, auf denen diese Widgets
            eingebunden sind, baut Ihr Webbrowser automatisch eine direkte
            Verbindung zu den Servern der FuPa GmbH auf. Hierdurch wird Ihre
            IP-Adresse sowie die Information, welche spezifische Unterseite
            unserer Internetpräsenz Sie aufgerufen haben, an den Betreiber (FuPa
            GmbH) übermittelt. FuPa kann dabei auch Cookies auf Ihrem Endgerät
            speichern.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Rechtsgrundlage:
            </strong>{' '}
            Die Einbindung dieses Dienstes erfolgt auf Grundlage unseres
            berechtigten Interesses gemäß Art. 6 Abs. 1 lit. f DSGVO. Unser
            Interesse liegt darin, den Besuchern unserer Website aktuelle
            sportliche Informationen und Spielpläne direkt und
            benutzerfreundlich zur Verfügung zu stellen.
          </p>
          <p>
            Weitere Informationen über den Zweck und Umfang der Datenverarbeitung
            durch den Anbieter sowie Ihre diesbezüglichen Rechte entnehmen Sie
            bitte der Datenschutzerklärung von FuPa unter:{' '}
            <a
              href="https://www.fupa.net/datenschutz.html"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.fupa.net/datenschutz.html
            </a>
          </p>
        </div>

        {/* 8. Instagram */}
        <div className="legal-card" id="instagram">
          <h2>8. Instagram</h2>
          <p>
            Wir unterhalten eine Präsenz auf Instagram (Meta Platforms Ireland
            Limited, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2,
            Irland). Wenn Sie unsere Instagram-Seite besuchen, kann Instagram
            Daten über Sie erheben.
          </p>
          <p>
            Einzelheiten dazu entnehmen Sie der Datenschutzrichtlinie von
            Meta/Instagram:{' '}
            <a
              href="https://privacycenter.instagram.com/policy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              privacycenter.instagram.com/policy
            </a>
          </p>
          <p>
            Eine Übertragung von Daten in die USA und andere Drittländer kann
            nicht ausgeschlossen werden. Meta verwendet
            Standardvertragsklauseln gemäß Art. 46 DSGVO als Grundlage für die
            Datenübertragung.
          </p>
        </div>

        {/* 9. Änderungen */}
        <div className="legal-card" id="aenderungen">
          <h2>9. Änderungen dieser Erklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
            sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
            Änderungen unserer Leistungen in der Datenschutzerklärung
            umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
            Datenschutzerklärung.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>Stand:</strong> Juli
            2026
          </p>
        </div>
      </div>
    </>
  );
}
