import { defineType, defineField } from 'sanity';

export const probetrainingPage = defineType({
  name: 'probetrainingPage',
  title: 'Seite: Probetraining',
  type: 'document',
  fields: [
    defineField({
      name: 'show_hinweis',
      title: 'Wichtigen Hinweis anzeigen',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'hinweis_text',
      title: 'Hinweistext (z.B. Altersbegrenzung/Geschlecht)',
      type: 'text',
      rows: 3,
      initialValue:
        'Aktuell nehmen wir ausschließlich männliche Spieler ab 17 Jahren für unsere Kader auf.',
    }),
  ],
});
