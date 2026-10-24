import { defineType, defineField } from 'sanity';

export const event = defineType({
  name: 'event',
  title: 'Neuigkeiten & Veranstaltungen',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Titel der Meldung',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'meta',
      title: 'Kurzinfo / Datum / Untertitel',
      type: 'string',
      description: 'z.B. "Ab sofort bei jedem Heimspiel im Einsatz"',
    }),
    defineField({
      name: 'description',
      title: 'Text / Beschreibung',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Beitragsbild (optional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'link_text',
      title: 'Link-Beschriftung',
      type: 'string',
      initialValue: 'Mehr erfahren',
    }),
    defineField({
      name: 'link_url',
      title: 'Link-URL (z.B. Instagram-Post oder Website)',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Datum (für chronologische Sortierung)',
      type: 'datetime',
    }),
  ],
  orderings: [
    {
      title: 'Neueste zuerst',
      name: 'dateDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
});
