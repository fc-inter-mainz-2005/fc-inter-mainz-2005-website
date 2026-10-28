import { defineType, defineField } from 'sanity';

export const boardMember = defineType({
  name: 'boardMember',
  title: 'Vorstand & Funktionäre',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Vollständiger Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Funktion / Position',
      type: 'string',
      description: 'z.B. 1. Vorsitzender, Kassenwart, Sportdirektor (kann mehrzeilig sein)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'secondaryRole',
      title: 'Zusatzfunktion / Operative Rolle (optional)',
      type: 'string',
      description: 'z.B. Sponsoring & Partnerschaften',
    }),
    defineField({
      name: 'category',
      title: 'Bereich / Gremium',
      type: 'string',
      options: {
        list: [
          { title: 'Vereinsführung (Geschäftsführender Vorstand)', value: 'vorstand' },
          { title: 'Abteilungsverantwortliche & Obleute', value: 'abteilung' },
        ],
        layout: 'radio',
      },
      initialValue: 'vorstand',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Porträtfoto (wird rund dargestellt)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'email',
      title: 'Kontakt E-Mail',
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
