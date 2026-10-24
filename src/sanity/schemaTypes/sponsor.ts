import { defineType, defineField } from 'sanity';

export const sponsor = defineType({
  name: 'sponsor',
  title: 'Sponsoren',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name des Sponsors / Unternehmens',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Website-URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo des Sponsors',
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
