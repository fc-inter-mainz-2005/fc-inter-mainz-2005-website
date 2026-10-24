import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Allgemeine Website-Einstellungen & Startseite',
  type: 'document',
  fieldsets: [
    { name: 'banner', title: 'Top-Ankündigungsbanner' },
    { name: 'hero', title: 'Startseite: Hero-Bereich' },
    { name: 'stats', title: 'Startseite: Vereins-Statistiken' },
    { name: 'footer', title: 'Footer & Kontaktinformationen' },
  ],
  fields: [
    // Top Banner
    defineField({
      name: 'show_banner',
      title: 'Banner anzeigen',
      type: 'boolean',
      fieldset: 'banner',
      initialValue: false,
    }),
    defineField({
      name: 'banner_text',
      title: 'Banner-Text',
      type: 'string',
      fieldset: 'banner',
    }),

    // Hero Section
    defineField({
      name: 'hero_title_line1',
      title: 'Hero Titel Zeile 1',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Leidenschaft.',
    }),
    defineField({
      name: 'hero_title_accent',
      title: 'Hero Titel Akzent (Hervorgehoben in Rot)',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Gemeinschaft.',
    }),
    defineField({
      name: 'hero_title_line3',
      title: 'Hero Titel Zeile 3',
      type: 'string',
      fieldset: 'hero',
      initialValue: 'Fussball.',
    }),
    defineField({
      name: 'hero_subtitle',
      title: 'Hero Untertitel',
      type: 'text',
      rows: 3,
      fieldset: 'hero',
      initialValue:
        'Willkommen beim FC Inter Mainz. Dein Verein im Herzen von Mainz seit 2005 - für sportlichen Ehrgeiz und sozialen Zusammenhalt.',
    }),
    defineField({
      name: 'hero_slides',
      title: 'Hero Slideshow Bilder',
      type: 'array',
      fieldset: 'hero',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternativtext (Barrierefreiheit)',
            },
          ],
        },
      ],
    }),

    // Stats Section
    defineField({
      name: 'stat_gegruendet',
      title: 'Statistik: Gegründet',
      type: 'string',
      fieldset: 'stats',
      initialValue: '2005',
    }),
    defineField({
      name: 'stat_mannschaften',
      title: 'Statistik: Mannschaften',
      type: 'string',
      fieldset: 'stats',
      initialValue: '3',
    }),
    defineField({
      name: 'stat_mitglieder',
      title: 'Statistik: Mitglieder',
      type: 'string',
      fieldset: 'stats',
      initialValue: '100+',
    }),
    defineField({
      name: 'stat_nationen',
      title: 'Statistik: Nationen',
      type: 'string',
      fieldset: 'stats',
      initialValue: '30+',
    }),

    // Footer & Global Contact
    defineField({
      name: 'brand_description',
      title: 'Vereinsbeschreibung im Footer',
      type: 'text',
      rows: 2,
      fieldset: 'footer',
      initialValue:
        'Dein Fußballverein in der Landeshauptstadt Mainz. Gegründet 2005 mit Leidenschaft.',
    }),
    defineField({
      name: 'address_line1',
      title: 'Adresse Zeile 1',
      type: 'string',
      fieldset: 'footer',
      initialValue: 'Albert-Stohr-Straße 50',
    }),
    defineField({
      name: 'address_line2',
      title: 'Adresse Zeile 2',
      type: 'string',
      fieldset: 'footer',
      initialValue: '55128 Mainz',
    }),
    defineField({
      name: 'email',
      title: 'Kontakt E-Mail',
      type: 'string',
      fieldset: 'footer',
      initialValue: 'kontakt@intermainz.de',
    }),
    defineField({
      name: 'facebook_url',
      title: 'Facebook URL',
      type: 'url',
      fieldset: 'footer',
      initialValue:
        'https://www.facebook.com/p/FC-Inter-Mainz-2005-eV-100063568061273/',
    }),
    defineField({
      name: 'instagram_url',
      title: 'Instagram URL',
      type: 'url',
      fieldset: 'footer',
      initialValue: 'https://www.instagram.com/fc_inter_mainz/',
    }),
    defineField({
      name: 'copyright_text',
      title: 'Copyright Text',
      type: 'string',
      fieldset: 'footer',
      initialValue: '© 2026 FC Inter Mainz 2005 e.V. Alle Rechte vorbehalten.',
    }),
  ],
});
