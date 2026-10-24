import { defineType, defineField } from 'sanity';

export const legalPages = defineType({
  name: 'legalPages',
  title: 'Rechtliche Seiten (Impressum & Datenschutz)',
  type: 'document',
  fieldsets: [
    { name: 'impressum', title: 'Impressum' },
    { name: 'datenschutz', title: 'Datenschutzerklärung' },
  ],
  fields: [
    defineField({
      name: 'impressum_content',
      title: 'Impressum Text / Markdown',
      type: 'text',
      rows: 15,
      fieldset: 'impressum',
    }),
    defineField({
      name: 'datenschutz_content',
      title: 'Datenschutzerklärung Text / Markdown',
      type: 'text',
      rows: 20,
      fieldset: 'datenschutz',
    }),
  ],
});
