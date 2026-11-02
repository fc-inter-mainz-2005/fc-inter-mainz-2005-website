import { sanityFetch } from './client';
import { resolveImageUrl, resolveFileUrl } from './image';
import {
  siteSettingsQuery,
  teamsQuery,
  boardMembersQuery,
  eventsQuery,
  sponsorsQuery,
  partnersQuery,
  downloadsQuery,
  geschichtePageQuery,
  probetrainingPageQuery,
  kontaktPageQuery,
  legalPagesQuery,
} from './queries';

// Local Fallback JSON Imports
import bannerData from '../../../data/banner.json';
import heroData from '../../../data/hero.json';
import statsData from '../../../data/stats.json';
import footerData from '../../../data/footer.json';
import teamsData from '../../../data/teams.json';
import vorstandData from '../../../data/vorstand.json';
import abteilungData from '../../../data/vorstand_abteilung.json';
import eventsData from '../../../data/events.json';
import sponsorsData from '../../../data/sponsors.json';
import partnerData from '../../../data/kooperationspartner.json';
import downloadsData from '../../../data/downloads.json';
import geschichteData from '../../../data/geschichte.json';
import probetrainingData from '../../../data/probetraining.json';
import kontaktData from '../../../data/kontakt.json';
import impressumData from '../../../content/impressum.json';
import datenschutzData from '../../../content/datenschutz.json';

// Types
export interface BannerData {
  show_banner: boolean;
  banner_text: string;
}

export interface HeroSlide {
  image: string;
  alt?: string;
}

export interface HeroData {
  title_line1: string;
  title_accent: string;
  title_line3: string;
  subtitle: string;
  slides: HeroSlide[];
}

export interface StatsData {
  gegruendet: string;
  mannschaften: string;
  mitglieder: string;
  nationen: string;
}

export interface ExtraContact {
  label?: string;
  value?: string;
}

export interface FooterData {
  brand_description: string;
  address_line1: string;
  address_line2: string;
  email: string;
  extra_contact: ExtraContact[];
  facebook_url: string;
  instagram_url: string;
  copyright_text: string;
}

export interface SiteSettings {
  banner: BannerData;
  hero: HeroData;
  stats: StatsData;
  footer: FooterData;
}

export interface Team {
  name: string;
  liga: string;
  photo: string;
  fupa_link?: string;
  trainer?: string;
  trainingszeiten?: string;
}

export interface BoardMember {
  name: string;
  role: string;
  category: string;
  photo: string;
  email?: string;
  secondaryRole?: string;
  contactHref?: string;
  contactBetreff?: string;
  showContactButton?: boolean;
}

export interface EventItem {
  name: string;
  meta?: string;
  description: string;
  link_text?: string;
  link_url?: string;
  date?: string;
  image?: string;
}

export interface SponsorItem {
  name: string;
  link: string;
  image: string;
}

export interface PartnerItem {
  name: string;
  description?: string;
  link: string;
  image: string;
}

export interface DownloadCard {
  title: string;
  description: string;
  file: string;
  filename?: string;
  category?: string;
}

export interface HistoryEpoch {
  jahr: string;
  titel: string;
  text: string;
  photo: string;
}

export interface GeschichteData {
  gruendung: HistoryEpoch;
  aufstieg: HistoryEpoch;
  heute: HistoryEpoch;
}

export interface ProbetrainingData {
  show_hinweis: boolean;
  hinweis_text: string;
}

export interface KontaktData {
  anschrift_name: string;
  strasse: string;
  plz_ort: string;
  email: string;
  maps_query: string;
}

export interface LegalData {
  impressum_content: string;
  datenschutz_content: string;
}

// 1. Site Settings (Top Banner, Hero, Stats, Footer)
export async function getSiteSettings(): Promise<SiteSettings> {
  const sanitySettings = await sanityFetch<any>({
    query: siteSettingsQuery,
    tags: ['sanity'],
  });

  const banner: BannerData = {
    show_banner:
      sanitySettings?.show_banner !== undefined
        ? Boolean(sanitySettings.show_banner)
        : Boolean(bannerData.show_banner),
    banner_text: sanitySettings?.banner_text ?? bannerData.banner_text,
  };

  const heroSlides: HeroSlide[] =
    Array.isArray(sanitySettings?.hero_slides) && sanitySettings.hero_slides.length > 0
      ? sanitySettings.hero_slides.map((s: any) => ({
          image: resolveImageUrl(s, '/fotos/InterMainz1.jpeg'),
          alt: s.alt || '',
        }))
      : (heroData.slides || []).map((s: any) => ({
          image: resolveImageUrl(s.image, '/fotos/InterMainz1.jpeg'),
        }));

  const hero: HeroData = {
    title_line1: sanitySettings?.hero_title_line1 ?? heroData.title_line1,
    title_accent: sanitySettings?.hero_title_accent ?? heroData.title_accent,
    title_line3: sanitySettings?.hero_title_line3 ?? heroData.title_line3,
    subtitle: sanitySettings?.hero_subtitle ?? heroData.subtitle,
    slides: heroSlides,
  };

  const stats: StatsData = {
    gegruendet: sanitySettings?.stat_gegruendet ?? statsData.gegruendet ?? '2005',
    mannschaften: sanitySettings?.stat_mannschaften ?? statsData.mannschaften ?? '3',
    mitglieder: sanitySettings?.stat_mitglieder ?? statsData.mitglieder ?? '100+',
    nationen: sanitySettings?.stat_nationen ?? statsData.nationen ?? '30+',
  };

  const footer: FooterData = {
    brand_description:
      sanitySettings?.brand_description ??
      footerData.brand_description ??
      'Dein Fußballverein in der Landeshauptstadt Mainz. Gegründet 2005 mit Leidenschaft.',
    address_line1: sanitySettings?.address_line1 ?? footerData.address_line1 ?? 'Albert-Stohr-Straße 50',
    address_line2: sanitySettings?.address_line2 ?? footerData.address_line2 ?? '55128 Mainz',
    email: sanitySettings?.email ?? footerData.email ?? 'intermainz@gmail.com',
    extra_contact: (footerData.extra_contact || []) as ExtraContact[],
    facebook_url:
      sanitySettings?.facebook_url ??
      footerData.facebook_url ??
      'https://www.facebook.com/p/FC-Inter-Mainz-2005-eV-100063568061273/',
    instagram_url:
      sanitySettings?.instagram_url ??
      footerData.instagram_url ??
      'https://www.instagram.com/fc_inter_mainz/',
    copyright_text:
      sanitySettings?.copyright_text ??
      footerData.copyright_text ??
      `© ${new Date().getFullYear()} FC Inter Mainz 2005 e.V. Alle Rechte vorbehalten.`,
  };

  return { banner, hero, stats, footer };
}

// 2. Teams
export async function getTeams(): Promise<Team[]> {
  const sanityTeams = await sanityFetch<any[]>({
    query: teamsQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanityTeams) && sanityTeams.length > 0) {
    return sanityTeams.map((t) => ({
      name: t.name,
      liga: t.liga,
      photo: resolveImageUrl(t.photo, '/fotos/placeholder.jpg'),
      fupa_link: t.fupa_link || '',
      trainer: t.trainer || '',
      trainingszeiten: t.trainingszeiten || '',
    }));
  }

  return (teamsData.teams || []).map((t: any) => ({
    name: t.name,
    liga: t.liga,
    photo: resolveImageUrl(t.photo),
    fupa_link: t.fupa_link || '',
    trainer: t.trainer || '',
    trainingszeiten: t.trainingszeiten || '',
  }));
}

// 3. Board Members (Vorstand & Abteilung)
export async function getBoardMembers(): Promise<{
  vorstand: BoardMember[];
  abteilung: BoardMember[];
}> {
  const sanityMembers = await sanityFetch<any[]>({
    query: boardMembersQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanityMembers) && sanityMembers.length > 0) {
    const vorstand = sanityMembers
      .filter((m) => m.category === 'vorstand' || !m.category)
      .map((m) => ({
        name: m.name,
        role: m.role,
        secondaryRole: m.secondaryRole || '',
        category: 'vorstand',
        photo: resolveImageUrl(m.photo, '/fotos/placeholder.jpg'),
        email: m.email || '',
        contactHref: m.contactHref || '',
        contactBetreff: m.contactBetreff || '',
        showContactButton: m.showContactButton !== false,
      }));

    const abteilung = sanityMembers
      .filter((m) => m.category === 'abteilung')
      .map((m) => ({
        name: m.name,
        role: m.role,
        secondaryRole: m.secondaryRole || '',
        category: 'abteilung',
        photo: resolveImageUrl(m.photo, '/fotos/placeholder.jpg'),
        email: m.email || '',
        contactHref: m.contactHref || '',
        contactBetreff: m.contactBetreff || '',
        showContactButton: m.showContactButton !== false,
      }));

    return { vorstand, abteilung };
  }

  return {
    vorstand: (vorstandData.members || []).map((m: any) => ({
      name: m.name,
      role: m.role,
      secondaryRole: m.secondaryRole || '',
      category: 'vorstand',
      photo: resolveImageUrl(m.photo),
      email: m.email || '',
      contactHref: m.contactHref || '',
      contactBetreff: m.contactBetreff || '',
      showContactButton: m.showContactButton !== false,
    })),
    abteilung: (abteilungData.members || []).map((m: any) => ({
      name: m.name,
      role: m.role,
      secondaryRole: m.secondaryRole || '',
      category: 'abteilung',
      photo: resolveImageUrl(m.photo),
      email: m.email || '',
      contactHref: m.contactHref || '',
      contactBetreff: m.contactBetreff || '',
      showContactButton: m.showContactButton !== false,
    })),
  };
}

// 4. Events / Neuigkeiten
export async function getEvents(): Promise<EventItem[]> {
  const sanityEvents = await sanityFetch<any[]>({
    query: eventsQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanityEvents) && sanityEvents.length > 0) {
    return sanityEvents.map((ev) => ({
      name: ev.name,
      meta: ev.meta || '',
      description: ev.description || '',
      link_text: ev.link_text || 'Mehr erfahren',
      link_url: ev.link_url || '',
      date: ev.date || '',
      image: ev.image ? resolveImageUrl(ev.image) : undefined,
    }));
  }

  return (eventsData.events || []).map((ev: any) => ({
    name: ev.name,
    meta: ev.meta || '',
    description: ev.description || '',
    link_text: ev.link_text || 'Mehr erfahren',
    link_url: ev.link_url || '',
    date: ev.date || '',
    image: ev.image ? resolveImageUrl(ev.image) : undefined,
  }));
}

// 5. Sponsors
export async function getSponsors(): Promise<SponsorItem[]> {
  const sanitySponsors = await sanityFetch<any[]>({
    query: sponsorsQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanitySponsors) && sanitySponsors.length > 0) {
    return sanitySponsors.map((s) => ({
      name: s.name,
      link: s.link,
      image: resolveImageUrl(s.logo, '/fotos/placeholder.jpg'),
    }));
  }

  return (sponsorsData.sponsors || []).map((s: any) => ({
    name: s.name,
    link: s.link,
    image: resolveImageUrl(s.image),
  }));
}

// 6. Partners
export async function getPartners(): Promise<PartnerItem[]> {
  const sanityPartners = await sanityFetch<any[]>({
    query: partnersQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanityPartners) && sanityPartners.length > 0) {
    return sanityPartners.map((p) => ({
      name: p.name,
      description: p.description || '',
      link: p.link,
      image: resolveImageUrl(p.logo, '/fotos/placeholder.jpg'),
    }));
  }

  return (partnerData.partners || []).map((p: any) => ({
    name: p.name,
    description: p.description || '',
    link: p.link,
    image: resolveImageUrl(p.image),
  }));
}

// 7. Downloadcenter Items
export async function getDownloads(): Promise<DownloadCard[]> {
  const sanityDownloads = await sanityFetch<any[]>({
    query: downloadsQuery,
    tags: ['sanity'],
  });

  if (Array.isArray(sanityDownloads) && sanityDownloads.length > 0) {
    return sanityDownloads.map((dl) => ({
      title: dl.title,
      description: dl.description,
      file: resolveFileUrl(dl.file, dl.filename ? `/documents/${dl.filename}` : ''),
      filename: dl.filename || '',
      category: dl.category || '',
    }));
  }

  return (downloadsData.cards || []).map((c: any) => ({
    title: c.title,
    description: c.description,
    file: resolveFileUrl(c.file),
    filename: c.filename || '',
    category: c.category || '',
  }));
}

// 8. Geschichte Page
export async function getGeschichtePage(): Promise<GeschichteData> {
  const sanityGeschichte = await sanityFetch<any>({
    query: geschichtePageQuery,
    tags: ['sanity'],
  });

  if (sanityGeschichte) {
    return {
      gruendung: {
        jahr: sanityGeschichte.gruendung_jahr || geschichteData.gruendung.jahr,
        titel: sanityGeschichte.gruendung_titel || geschichteData.gruendung.titel,
        text: sanityGeschichte.gruendung_text || geschichteData.gruendung.text,
        photo: resolveImageUrl(sanityGeschichte.gruendung_photo, geschichteData.gruendung.photo),
      },
      aufstieg: {
        jahr: sanityGeschichte.aufstieg_jahr || geschichteData.aufstieg.jahr,
        titel: sanityGeschichte.aufstieg_titel || geschichteData.aufstieg.titel,
        text: sanityGeschichte.aufstieg_text || geschichteData.aufstieg.text,
        photo: resolveImageUrl(sanityGeschichte.aufstieg_photo, geschichteData.aufstieg.photo),
      },
      heute: {
        jahr: sanityGeschichte.heute_jahr || geschichteData.heute.jahr,
        titel: sanityGeschichte.heute_titel || geschichteData.heute.titel,
        text: sanityGeschichte.heute_text || geschichteData.heute.text,
        photo: resolveImageUrl(sanityGeschichte.heute_photo, geschichteData.heute.photo),
      },
    };
  }

  return {
    gruendung: {
      ...geschichteData.gruendung,
      photo: resolveImageUrl(geschichteData.gruendung.photo),
    },
    aufstieg: {
      ...geschichteData.aufstieg,
      photo: resolveImageUrl(geschichteData.aufstieg.photo),
    },
    heute: {
      ...geschichteData.heute,
      photo: resolveImageUrl(geschichteData.heute.photo),
    },
  };
}

// 9. Probetraining Page
export async function getProbetrainingPage(): Promise<ProbetrainingData> {
  const sanityProbe = await sanityFetch<any>({
    query: probetrainingPageQuery,
    tags: ['sanity'],
  });

  if (sanityProbe) {
    return {
      show_hinweis:
        sanityProbe.show_hinweis !== undefined
          ? Boolean(sanityProbe.show_hinweis)
          : Boolean(probetrainingData.show_hinweis),
      hinweis_text: sanityProbe.hinweis_text || probetrainingData.hinweis_text,
    };
  }

  return {
    show_hinweis: Boolean(probetrainingData.show_hinweis),
    hinweis_text: probetrainingData.hinweis_text,
  };
}

// 10. Kontakt Page
export async function getKontaktPage(): Promise<KontaktData> {
  const sanityKontakt = await sanityFetch<any>({
    query: kontaktPageQuery,
    tags: ['sanity'],
  });

  if (sanityKontakt) {
    return {
      anschrift_name:
        sanityKontakt.anschrift_name || kontaktData.anschrift_name || 'Bezirkssportanlage Mainz',
      strasse: sanityKontakt.strasse || kontaktData.strasse || 'Albert-Stohr-Straße 50',
      plz_ort: sanityKontakt.plz_ort || kontaktData.plz_ort || '55128 Mainz, Deutschland',
      email: sanityKontakt.email || kontaktData.email || 'intermainz@gmail.com',
      maps_query:
        sanityKontakt.maps_query ||
        `${kontaktData.strasse || 'Albert-Stohr-Straße 50'}, ${kontaktData.plz_ort || '55128 Mainz'}`,
    };
  }

  return {
    anschrift_name: kontaktData.anschrift_name || 'Bezirkssportanlage Mainz',
    strasse: kontaktData.strasse || 'Albert-Stohr-Straße 50',
    plz_ort: kontaktData.plz_ort || '55128 Mainz, Deutschland',
    email: kontaktData.email || 'intermainz@gmail.com',
    maps_query: `${kontaktData.strasse || 'Albert-Stohr-Straße 50'}, ${kontaktData.plz_ort || '55128 Mainz'}`,
  };
}

// 11. Legal Pages (Impressum & Datenschutz)
export async function getLegalPages(): Promise<LegalData> {
  const sanityLegal = await sanityFetch<any>({
    query: legalPagesQuery,
    tags: ['sanity'],
  });

  return {
    impressum_content: sanityLegal?.impressum_content || impressumData.content || '',
    datenschutz_content: sanityLegal?.datenschutz_content || datenschutzData.content || '',
  };
}
