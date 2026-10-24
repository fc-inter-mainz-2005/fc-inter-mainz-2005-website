import { groq } from 'next-sanity';

// 1. Site Settings (Top Banner, Hero, Stats, Footer)
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    _id,
    show_banner,
    banner_text,
    hero_title_line1,
    hero_title_accent,
    hero_title_line3,
    hero_subtitle,
    hero_slides[]{
      _key,
      alt,
      asset->{
        _id,
        url
      }
    },
    stat_gegruendet,
    stat_mannschaften,
    stat_mitglieder,
    stat_nationen,
    brand_description,
    address_line1,
    address_line2,
    email,
    facebook_url,
    instagram_url,
    copyright_text
  }
`;

// 2. Teams
export const teamsQuery = groq`
  *[_type == "team"] | order(order asc) {
    _id,
    name,
    liga,
    fupa_link,
    trainer,
    trainingszeiten,
    order,
    photo {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 3. Board Members (Vorstand & Abteilung)
export const boardMembersQuery = groq`
  *[_type == "boardMember"] | order(order asc) {
    _id,
    name,
    role,
    category,
    email,
    order,
    photo {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 4. Events / News
export const eventsQuery = groq`
  *[_type == "event"] | order(date desc, _createdAt desc) {
    _id,
    name,
    meta,
    description,
    link_text,
    link_url,
    date,
    image {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 5. Sponsors
export const sponsorsQuery = groq`
  *[_type == "sponsor"] | order(order asc) {
    _id,
    name,
    link,
    order,
    logo {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 6. Partners
export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    description,
    link,
    order,
    logo {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 7. Downloadcenter Items
export const downloadsQuery = groq`
  *[_type == "downloadItem"] | order(order asc) {
    _id,
    title,
    description,
    filename,
    category,
    order,
    file {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 8. Geschichte Page
export const geschichtePageQuery = groq`
  *[_type == "geschichtePage"][0]{
    _id,
    gruendung_jahr,
    gruendung_titel,
    gruendung_text,
    gruendung_photo {
      asset->{
        _id,
        url
      }
    },
    aufstieg_jahr,
    aufstieg_titel,
    aufstieg_text,
    aufstieg_photo {
      asset->{
        _id,
        url
      }
    },
    heute_jahr,
    heute_titel,
    heute_text,
    heute_photo {
      asset->{
        _id,
        url
      }
    }
  }
`;

// 9. Probetraining Page
export const probetrainingPageQuery = groq`
  *[_type == "probetrainingPage"][0]{
    _id,
    show_hinweis,
    hinweis_text
  }
`;

// 10. Kontakt Page
export const kontaktPageQuery = groq`
  *[_type == "kontaktPage"][0]{
    _id,
    anschrift_name,
    strasse,
    plz_ort,
    email,
    maps_query
  }
`;

// 11. Legal Pages (Impressum & Datenschutz)
export const legalPagesQuery = groq`
  *[_type == "legalPages"][0]{
    _id,
    impressum_content,
    datenschutz_content
  }
`;
