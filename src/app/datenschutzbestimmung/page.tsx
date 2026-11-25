import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getLegalPages } from '@/sanity/lib/fetch';
import FupaConsentRevoke from '@/components/FupaConsentRevoke';

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
              <a href="#google-maps">Google Maps</a>
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
            <a href="mailto:intermainz@gmail.com">intermainz@gmail.com</a>
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
          <h3>Recht auf Widerruf einer Einwilligung (Art. 7 Abs. 3 DSGVO)</h3>
          <p>
            Sie haben das Recht, eine erteilte Einwilligung jederzeit mit
            Wirkung für die Zukunft zu widerrufen. Die Rechtmäßigkeit der bis
            zum Widerruf erfolgten Verarbeitung bleibt davon unberührt.
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
            Die Formulardaten werden von unserer Website (Hosting siehe
            Abschnitt 5) entgegengenommen und nicht in einer Datenbank
            gespeichert, sondern per E-Mail weitergeleitet. Für den E-Mail-Versand
            nutzen wir den Dienst <strong>Resend</strong> der Plus Five Five,
            Inc. (Resend), 2261 Market Street #5039, San Francisco, CA 94114,
            USA, als Auftragsverarbeiter. Über
            Resend werden zwei E-Mails versendet: eine Nachricht mit Ihren
            Angaben (einschließlich eines etwaigen Datei-Anhangs) an das
            Vereinspostfach sowie eine automatische Eingangsbestätigung an die
            von Ihnen angegebene E-Mail-Adresse. Es werden dabei keine Cookies
            gesetzt.
          </p>
          <p>
            Das Vereinspostfach ist ein Gmail-Konto, das von der Google Ireland
            Limited, Gordon House, Barrow Street, Dublin 4, Irland,
            bereitgestellt wird. Google verarbeitet die in diesem Postfach
            eingehenden Daten als eigener Verantwortlicher nach seinen eigenen
            Bedingungen. Eine Übermittlung von Daten an die Google LLC in den
            USA kann nicht ausgeschlossen werden. Die Google LLC ist nach dem
            EU-US Data Privacy Framework zertifiziert. Weitere Informationen
            finden Sie in der Datenschutzerklärung von Google:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
          </p>
          <p>
            <strong>Schutz vor Spam:</strong> Zum Schutz unserer Formulare vor
            automatisierten Anfragen verwenden wir die Open-Source-Software
            ALTCHA, die vollständig auf unserem eigenen Server (Hosting siehe
            Abschnitt 5) betrieben wird. Dabei löst Ihr Browser im Hintergrund
            eine kleine Rechenaufgabe; es werden keine Cookies gesetzt, keine
            Daten auf Ihrem Endgerät gespeichert und keine Daten an Dritte
            übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse an der Abwehr von Spam und Missbrauch unserer
            Formulare).
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
            <strong style={{ color: 'var(--text-main)' }}>
              Empfänger und Auftragsverarbeitung:
            </strong>{' '}
            Ihre Daten werden ausschließlich für den genannten Zweck
            (Vereinsorganisation) genutzt. Empfänger sind neben dem Verein nur
            die oben genannten Stellen (Resend als
            E-Mail-Versanddienst, Google als Anbieter des Vereinspostfachs
            sowie unser Hosting-Anbieter). Mit Plus Five Five, Inc. (Resend)
            besteht ein Vertrag über Auftragsverarbeitung gemäß Art. 28 DSGVO.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Übermittlung in die USA:
            </strong>{' '}
            Beim Versand über Resend werden Ihre Daten in die USA übermittelt.
            Plus Five Five, Inc. (Resend) ist nach dem EU-US Data Privacy
            Framework zertifiziert. Die Übermittlung erfolgt auf Grundlage des
            Angemessenheitsbeschlusses der Europäischen Kommission zum EU-US
            Data Privacy Framework (Art. 45 DSGVO).
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
            Analyse-Cookies. Inhalte von Drittanbietern (FuPa-Widgets, siehe
            Abschnitt 7, und Google Maps, siehe Abschnitt 8) werden erst
            geladen, nachdem Sie dies durch einen Klick ausdrücklich erlaubt
            haben. Erst dann können diese Anbieter Cookies oder ähnliche
            Technologien auf Ihrem Endgerät einsetzen, auf deren Inhalt und
            Speicherdauer wir keinen Einfluss haben.
          </p>
          <p>
            Wenn Sie dem Laden der FuPa-Inhalte zustimmen, speichern wir diese
            Entscheidung im lokalen Speicher Ihres Browsers (localStorage,
            Eintrag „intermainz-fupa-consent“), damit Sie bei späteren Besuchen
            nicht erneut zustimmen müssen. Dieser Eintrag enthält keine
            personenbezogenen Daten, wird nicht an uns übertragen und ist zur
            Speicherung der von Ihnen ausdrücklich gewünschten Einstellung
            unbedingt erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG). Sie können ihn
            jederzeit über den Widerruf in Abschnitt 7 oder durch Löschen der
            Website-Daten in Ihrem Browser entfernen.
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
            Die Widgets werden nicht automatisch geladen. Zunächst sehen Sie
            nur einfache Links zu unseren Mannschaftsseiten auf FuPa. Erst
            wenn Sie auf „FuPa-Inhalte laden“ klicken, baut Ihr Webbrowser eine
            direkte Verbindung zu den Servern der FuPa GmbH auf. Hierdurch wird
            Ihre
            IP-Adresse sowie die Information, welche spezifische Unterseite
            unserer Internetpräsenz Sie aufgerufen haben, an den Betreiber (FuPa
            GmbH) übermittelt. FuPa kann dabei auch Cookies auf Ihrem Endgerät
            speichern.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Rechtsgrundlage:
            </strong>{' '}
            Die Einbindung der FuPa-Widgets erfolgt ausschließlich auf
            Grundlage Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und
            § 25 Abs. 1 TDDDG.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Speicherung und Widerruf:
            </strong>{' '}
            Ihre Einwilligung wird im lokalen Speicher Ihres Browsers vermerkt
            (siehe Abschnitt 6), sodass die FuPa-Inhalte bei späteren Besuchen
            direkt geladen werden. Sie können Ihre Einwilligung jederzeit mit
            Wirkung für die Zukunft widerrufen. Danach werden die FuPa-Inhalte
            erst nach einem erneuten Klick wieder geladen. Bereits von FuPa
            gesetzte Cookies können Sie in den Einstellungen Ihres Browsers
            löschen.
          </p>
          <FupaConsentRevoke />
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

        {/* 8. Google Maps */}
        <div className="legal-card" id="google-maps">
          <h2>8. Google Maps</h2>
          <p>
            Auf unserer Kontaktseite können Sie eine Karte des Kartendienstes{' '}
            <strong>Google Maps</strong> anzeigen lassen. Anbieter ist die
            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
            Irland.
          </p>
          <p>
            Die Karte wird nicht automatisch geladen. Zunächst sehen Sie nur
            einen Platzhalter mit unserer Anschrift. Erst wenn Sie auf „Karte
            laden“ klicken, baut Ihr Webbrowser eine direkte Verbindung zu den
            Servern von Google auf. Dabei werden insbesondere Ihre IP-Adresse,
            die aufgerufene Seite sowie technische Informationen zu Ihrem
            Browser an Google übermittelt, und Google kann Cookies oder
            ähnliche Technologien auf Ihrem Endgerät einsetzen. Eine Übertragung
            von Daten an die Google LLC in den USA kann nicht ausgeschlossen
            werden. Google LLC ist nach dem EU-US Data Privacy Framework
            zertifiziert, auf dessen Grundlage ein Angemessenheitsbeschluss der
            EU-Kommission besteht (Art. 45 DSGVO).
          </p>
          <p>
            Über den Link „In Google Maps öffnen“ können Sie die Karte
            alternativ direkt bei Google aufrufen, ohne dass sie auf unserer
            Website geladen wird.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>
              Rechtsgrundlage:
            </strong>{' '}
            Die Einbindung von Google Maps erfolgt ausschließlich auf Grundlage
            Ihrer Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
            TDDDG. Die Einwilligung gilt nur für den jeweiligen Seitenaufruf und
            wird nicht gespeichert. Beim nächsten Aufruf der Kontaktseite wird
            die Karte erst nach einem erneuten Klick geladen. Sie können die
            Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen,
            indem Sie die Seite verlassen oder neu laden.
          </p>
          <p>
            Weitere Informationen zum Umgang mit Nutzerdaten finden Sie in der
            Datenschutzerklärung von Google:{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/privacy
            </a>
          </p>
        </div>

        {/* 9. Instagram */}
        <div className="legal-card" id="instagram">
          <h2>9. Instagram</h2>
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

        {/* 10. Änderungen */}
        <div className="legal-card" id="aenderungen">
          <h2>10. Änderungen dieser Erklärung</h2>
          <p>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit
            sie stets den aktuellen rechtlichen Anforderungen entspricht oder um
            Änderungen unserer Leistungen in der Datenschutzerklärung
            umzusetzen. Für Ihren erneuten Besuch gilt dann die neue
            Datenschutzerklärung.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>Stand:</strong>{' '}
            November 2026
          </p>
        </div>
      </div>
    </>
  );
}
