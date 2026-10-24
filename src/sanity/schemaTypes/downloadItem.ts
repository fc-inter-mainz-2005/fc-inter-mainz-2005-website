import { defineType, defineField } from 'sanity';

export const downloadItem = defineType({
  name: 'downloadItem',
  title: 'Downloadcenter Dokumente',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Dokumententitel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung / Verwendungszweck',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Datei (PDF / DOCX)',
      type: 'file',
    }),
    defineField({
      name: 'filename',
      title: 'Download-Dateiname',
      type: 'string',
      description: 'z.B. "Spielerlaubnis.pdf"',
    }),
    defineField({
      name: 'category',
      title: 'Kategorie (optional)',
      type: 'string',
    }),
    defineField({
      name: 'order',
      title: 'Sortierreihenfolge',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge aufsteigend',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});
