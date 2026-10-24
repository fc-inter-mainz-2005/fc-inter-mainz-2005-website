import { defineType, defineField } from 'sanity';

export const geschichtePage = defineType({
  name: 'geschichtePage',
  title: 'Seite: Vereinsgeschichte',
  type: 'document',
  fieldsets: [
    { name: 'gruendung', title: 'Epoche 1: Die Gründung' },
    { name: 'aufstieg', title: 'Epoche 2: Aufstieg & Wachstum' },
    { name: 'heute', title: 'Epoche 3: Der moderne Verein' },
  ],
  fields: [
    // Gründung
    defineField({
      name: 'gruendung_jahr',
      title: 'Jahr / Wasserzeichen',
      type: 'string',
      fieldset: 'gruendung',
      initialValue: '2005',
    }),
    defineField({
      name: 'gruendung_titel',
      title: 'Titel',
      type: 'string',
      fieldset: 'gruendung',
      initialValue: 'Die Gründung',
    }),
    defineField({
      name: 'gruendung_text',
      title: 'Textabsätze',
      type: 'text',
      rows: 6,
      fieldset: 'gruendung',
    }),
    defineField({
      name: 'gruendung_photo',
      title: 'Historisches Foto',
      type: 'image',
      fieldset: 'gruendung',
      options: { hotspot: true },
    }),

    // Aufstieg
    defineField({
      name: 'aufstieg_jahr',
      title: 'Jahr / Wasserzeichen',
      type: 'string',
      fieldset: 'aufstieg',
      initialValue: '2023',
    }),
    defineField({
      name: 'aufstieg_titel',
      title: 'Titel',
      type: 'string',
      fieldset: 'aufstieg',
      initialValue: 'Aufstieg & Wachstum',
    }),
    defineField({
      name: 'aufstieg_text',
      title: 'Textabsätze',
      type: 'text',
      rows: 6,
      fieldset: 'aufstieg',
    }),
    defineField({
      name: 'aufstieg_photo',
      title: 'Aufstiegsfoto',
      type: 'image',
      fieldset: 'aufstieg',
      options: { hotspot: true },
    }),

    // Heute
    defineField({
      name: 'heute_jahr',
      title: 'Jahr / Wasserzeichen',
      type: 'string',
      fieldset: 'heute',
      initialValue: 'HEUTE',
    }),
    defineField({
      name: 'heute_titel',
      title: 'Titel',
      type: 'string',
      fieldset: 'heute',
      initialValue: 'Der moderne Verein',
    }),
    defineField({
      name: 'heute_text',
      title: 'Textabsätze',
      type: 'text',
      rows: 6,
      fieldset: 'heute',
    }),
    defineField({
      name: 'heute_photo',
      title: 'Aktuelles Vereinsfoto',
      type: 'image',
      fieldset: 'heute',
      options: { hotspot: true },
    }),
  ],
});
