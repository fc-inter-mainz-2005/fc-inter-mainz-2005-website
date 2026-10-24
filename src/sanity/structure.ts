import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('FC Inter Mainz 2005 e.V. – CMS')
    .items([
      // Group 1: Singletons / Allgemeine Einstellungen & Seiten
      S.listItem()
        .title('Allgemeine Einstellungen & Seiten')
        .child(
          S.list()
            .title('Allgemeine Einstellungen & Seiten')
            .items([
              S.listItem()
                .title('Startseite, Banner & Footer')
                .child(
                  S.document()
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                ),
              S.listItem()
                .title('Seite: Vereinsgeschichte')
                .child(
                  S.document()
                    .schemaType('geschichtePage')
                    .documentId('geschichtePage')
                ),
              S.listItem()
                .title('Seite: Probetraining')
                .child(
                  S.document()
                    .schemaType('probetrainingPage')
                    .documentId('probetrainingPage')
                ),
              S.listItem()
                .title('Seite: Kontakt')
                .child(
                  S.document()
                    .schemaType('kontaktPage')
                    .documentId('kontaktPage')
                ),
              S.listItem()
                .title('Rechtliches (Impressum & Datenschutz)')
                .child(
                  S.document()
                    .schemaType('legalPages')
                    .documentId('legalPages')
                ),
            ])
        ),

      S.divider(),

      // Group 2: Document Collections / Vereinsdaten & Listen
      S.listItem()
        .title('Mannschaften')
        .schemaType('team')
        .child(S.documentTypeList('team').title('Alle Mannschaften')),

      S.listItem()
        .title('Vorstand & Funktionäre')
        .schemaType('boardMember')
        .child(
          S.documentTypeList('boardMember').title('Alle Funktionäre & Vorstandsmitglieder')
        ),

      S.listItem()
        .title('Neuigkeiten & Veranstaltungen')
        .schemaType('event')
        .child(
          S.documentTypeList('event').title('Alle Neuigkeiten & Termine')
        ),

      S.listItem()
        .title('Sponsoren')
        .schemaType('sponsor')
        .child(S.documentTypeList('sponsor').title('Alle Sponsoren')),

      S.listItem()
        .title('Kooperationspartner')
        .schemaType('partner')
        .child(
          S.documentTypeList('partner').title('Alle Kooperationspartner')
        ),

      S.listItem()
        .title('Downloadcenter Dokumente')
        .schemaType('downloadItem')
        .child(
          S.documentTypeList('downloadItem').title('Alle Dokumente')
        ),
    ]);
