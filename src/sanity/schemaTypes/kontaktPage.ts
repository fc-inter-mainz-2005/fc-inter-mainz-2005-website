import { defineType, defineField } from 'sanity';

export const kontaktPage = defineType({
  name: 'kontaktPage',
  title: 'Seite: Kontakt',
  type: 'document',
  fields: [
    defineField({
      name: 'anschrift_name',
      title: 'Sportanlage / Anschrift Name',
      type: 'string',
      initialValue: 'Bezirkssportanlage Mainz',
    }),
    defineField({
      name: 'strasse',
      title: 'Straße & Hausnummer',
      type: 'string',
      initialValue: 'Albert-Stohr-Straße 50',
    }),
    defineField({
      name: 'plz_ort',
      title: 'PLZ & Ort',
      type: 'string',
      initialValue: '55128 Mainz, Deutschland',
    }),
    defineField({
      name: 'email',
      title: 'Kontakt E-Mail',
      type: 'string',
      initialValue: 'intermainz@gmail.com',
    }),
    defineField({
      name: 'maps_query',
      title: 'Google Maps Suchbegriff / Adresse',
      type: 'string',
      initialValue: 'Albert-Stohr-Straße 50, 55128 Mainz',
    }),
  ],
});
