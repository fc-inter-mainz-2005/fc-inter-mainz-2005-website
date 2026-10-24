import { defineType, defineField } from 'sanity';

export const team = defineType({
  name: 'team',
  title: 'Mannschaften',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Mannschaftsname',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'liga',
      title: 'Liga-Bezeichnung (Badge)',
      type: 'string',
      description: 'z.B. B-Klasse, C-Klasse, Ü32',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Mannschaftsfoto',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'fupa_link',
      title: 'FuPa-Kader Link',
      type: 'url',
    }),
    defineField({
      name: 'trainer',
      title: 'Trainer / Betreuer',
      type: 'string',
    }),
    defineField({
      name: 'trainingszeiten',
      title: 'Trainingszeiten',
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
