import { defineType, defineField } from 'sanity';

export const partner = defineType({
  name: 'partner',
  title: 'Kooperationspartner',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name des Partners',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Beschreibung / Kooperationsbereich',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Website-URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo des Partners',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
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
