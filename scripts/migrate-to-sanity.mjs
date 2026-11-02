import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@sanity/client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper: Simple .env.local parser
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || '';
        value = value.trim().replace(/^['"](.*)['"]$/, '$1');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-08-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (
  !projectId ||
  projectId === 'your_project_id' ||
  projectId === 'dummy_project_id' ||
  projectId === 'your-project-id' ||
  projectId === 'dummy-project-id'
) {
  console.error('\n❌ Fehler: NEXT_PUBLIC_SANITY_PROJECT_ID ist nicht konfiguriert.');
  console.log('Bitte trage deine echte Sanity Project ID in die .env.local ein:\nNEXT_PUBLIC_SANITY_PROJECT_ID="deine-id"');
  process.exit(1);
}

if (!token || token === 'your_write_token') {
  console.error('\n❌ Fehler: SANITY_API_WRITE_TOKEN ist nicht konfiguriert.');
  console.log('Bitte erstelle einen API Token mit Schreibrechten unter https://sanity.io/manage und trage ihn in .env.local ein:\nSANITY_API_WRITE_TOKEN="dein-token"');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

// Cache for uploaded assets to avoid uploading the same file multiple times
const assetCache = new Map();

async function uploadFileAsset(relPath, assetType = 'image') {
  if (!relPath) return null;

  // Clean path
  let clean = relPath.replace(/^\/+/, '');
  let fullPath = path.join(ROOT_DIR, 'public', clean);

  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(ROOT_DIR, clean);
  }

  if (!fs.existsSync(fullPath)) {
    console.warn(`  ⚠️ Datei nicht gefunden: ${relPath}`);
    return null;
  }

  if (assetCache.has(fullPath)) {
    return assetCache.get(fullPath);
  }

  const filename = path.basename(fullPath);
  console.log(`  ⬆️ Lade ${assetType} hoch: ${filename}...`);

  try {
    const stream = fs.createReadStream(fullPath);
    const asset = await client.assets.upload(assetType, stream, { filename });
    assetCache.set(fullPath, asset._id);
    return asset._id;
  } catch (err) {
    console.error(`  ❌ Fehler beim Hochladen von ${filename}:`, err.message);
    return null;
  }
}

function readJson(relPath) {
  const full = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(full)) return null;
  try {
    return JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (err) {
    console.error(`Fehler beim Lesen von ${relPath}:`, err.message);
    return null;
  }
}

async function migrate() {
  console.log('🚀 Starte Migration von JSON-Daten & Assets nach Sanity...');

  // 1. Site Settings (banner, hero, stats, footer)
  console.log('\n📦 1. Migriere Allgemeine Einstellungen & Startseite (siteSettings)...');
  const banner = readJson('data/banner.json') || {};
  const hero = readJson('data/hero.json') || {};
  const stats = readJson('data/stats.json') || {};
  const footer = readJson('data/footer.json') || {};

  const heroSlides = [];
  if (Array.isArray(hero.slides)) {
    for (let i = 0; i < hero.slides.length; i++) {
      const slide = hero.slides[i];
      const assetId = await uploadFileAsset(slide.image, 'image');
      if (assetId) {
        heroSlides.push({
          _key: `slide_${i}`,
          _type: 'image',
          asset: { _type: 'reference', _ref: assetId },
          alt: `Slide ${i + 1}`,
        });
      }
    }
  }

  const siteSettingsDoc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    show_banner: Boolean(banner.show_banner),
    banner_text: banner.banner_text || '',

    hero_title_line1: hero.title_line1 || 'Leidenschaft.',
    hero_title_accent: hero.title_accent || 'Gemeinschaft.',
    hero_title_line3: hero.title_line3 || 'Fussball.',
    hero_subtitle: hero.subtitle || '',
    hero_slides: heroSlides,

    stat_gegruendet: stats.gegruendet || '2005',
    stat_mannschaften: stats.mannschaften || '3',
    stat_mitglieder: stats.mitglieder || '100+',
    stat_nationen: stats.nationen || '30+',

    brand_description: footer.brand_description || '',
    address_line1: footer.address_line1 || 'Albert-Stohr-Straße 50',
    address_line2: footer.address_line2 || '55128 Mainz',
    email: footer.email || 'intermainz@gmail.com',
    facebook_url: footer.facebook_url || '',
    instagram_url: footer.instagram_url || '',
    copyright_text: footer.copyright_text || '',
  };

  await client.createOrReplace(siteSettingsDoc);
  console.log('  ✅ siteSettings erfolgreich angelegt.');

  // 2. Geschichte Page
  console.log('\n📦 2. Migriere Vereinsgeschichte (geschichtePage)...');
  const geschichte = readJson('data/geschichte.json') || {};
  const gDoc = {
    _id: 'geschichtePage',
    _type: 'geschichtePage',
    gruendung_jahr: geschichte.gruendung?.jahr || '2005',
    gruendung_titel: geschichte.gruendung?.titel || 'Die Gründung',
    gruendung_text: geschichte.gruendung?.text || '',
    aufstieg_jahr: geschichte.aufstieg?.jahr || '2023',
    aufstieg_titel: geschichte.aufstieg?.titel || 'Aufstieg & Wachstum',
    aufstieg_text: geschichte.aufstieg?.text || '',
    heute_jahr: geschichte.heute?.jahr || 'HEUTE',
    heute_titel: geschichte.heute?.titel || 'Der moderne Verein',
    heute_text: geschichte.heute?.text || '',
  };

  const gPhoto1 = await uploadFileAsset(geschichte.gruendung?.photo, 'image');
  if (gPhoto1) gDoc.gruendung_photo = { _type: 'image', asset: { _type: 'reference', _ref: gPhoto1 } };

  const gPhoto2 = await uploadFileAsset(geschichte.aufstieg?.photo, 'image');
  if (gPhoto2) gDoc.aufstieg_photo = { _type: 'image', asset: { _type: 'reference', _ref: gPhoto2 } };

  const gPhoto3 = await uploadFileAsset(geschichte.heute?.photo, 'image');
  if (gPhoto3) gDoc.heute_photo = { _type: 'image', asset: { _type: 'reference', _ref: gPhoto3 } };

  await client.createOrReplace(gDoc);
  console.log('  ✅ geschichtePage erfolgreich angelegt.');

  // 3. Probetraining Page
  console.log('\n📦 3. Migriere Probetraining Einstellungen...');
  const probe = readJson('data/probetraining.json') || {};
  await client.createOrReplace({
    _id: 'probetrainingPage',
    _type: 'probetrainingPage',
    show_hinweis: Boolean(probe.show_hinweis),
    hinweis_text: probe.hinweis_text || '',
  });
  console.log('  ✅ probetrainingPage erfolgreich angelegt.');

  // 4. Kontakt Page
  console.log('\n📦 4. Migriere Kontakt Einstellungen...');
  const kontakt = readJson('data/kontakt.json') || {};
  await client.createOrReplace({
    _id: 'kontaktPage',
    _type: 'kontaktPage',
    anschrift_name: kontakt.anschrift_name || '',
    strasse: kontakt.strasse || '',
    plz_ort: kontakt.plz_ort || '',
    email: kontakt.email || '',
    maps_query: `${kontakt.strasse || ''}, ${kontakt.plz_ort || ''}`,
  });
  console.log('  ✅ kontaktPage erfolgreich angelegt.');

  // 5. Legal Pages
  console.log('\n📦 5. Migriere Rechtliche Seiten (legalPages)...');
  const impressum = readJson('content/impressum.json') || {};
  const datenschutz = readJson('content/datenschutz.json') || {};
  const impressumContent = (impressum.content || '')
    .replaceAll('José Luis Fuente Fernández', 'José Fernández')
    .replaceAll('José Luis Fuente', 'José Fernández');
  await client.createOrReplace({
    _id: 'legalPages',
    _type: 'legalPages',
    impressum_content: impressumContent,
    datenschutz_content: datenschutz.content || '',
  });
  console.log('  ✅ legalPages erfolgreich angelegt.');

  // 6. Teams Collection
  console.log('\n📦 6. Migriere Mannschaften (team)...');
  const teamsData = readJson('data/teams.json') || { teams: [] };
  for (let i = 0; i < teamsData.teams.length; i++) {
    const t = teamsData.teams[i];
    const doc = {
      _id: `team-${i}`,
      _type: 'team',
      name: t.name,
      liga: t.liga,
      fupa_link: t.fupa_link || '',
      order: i,
    };
    const photoId = await uploadFileAsset(t.photo, 'image');
    if (photoId) doc.photo = { _type: 'image', asset: { _type: 'reference', _ref: photoId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Team angelegt: ${t.name}`);
  }

  // 7. Board Members Collection (Vorstand & Abteilung)
  console.log('\n📦 7. Migriere Vorstand & Funktionäre (boardMember)...');
  const vorstandData = readJson('data/vorstand.json') || { members: [] };
  for (let i = 0; i < vorstandData.members.length; i++) {
    const m = vorstandData.members[i];
    const memberName = (m.name || '')
      .replace('José Luis Fuente Fernández', 'José Fernández')
      .replace('José Luis Fuente', 'José Fernández');
    const doc = {
      _id: `boardMember-vorstand-${i}`,
      _type: 'boardMember',
      name: memberName,
      role: m.role,
      category: 'vorstand',
      order: i,
    };
    if (m.secondaryRole) doc.secondaryRole = m.secondaryRole;
    const photoId = await uploadFileAsset(m.photo, 'image');
    if (photoId) doc.photo = { _type: 'image', asset: { _type: 'reference', _ref: photoId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Vorstand angelegt: ${memberName} (${m.role})`);
  }

  const abteilungData = readJson('data/vorstand_abteilung.json') || { members: [] };
  for (let i = 0; i < abteilungData.members.length; i++) {
    const m = abteilungData.members[i];
    const doc = {
      _id: `boardMember-abteilung-${i}`,
      _type: 'boardMember',
      name: m.name,
      role: m.role,
      category: 'abteilung',
      order: 10 + i,
    };
    if (m.secondaryRole) doc.secondaryRole = m.secondaryRole;
    const photoId = await uploadFileAsset(m.photo, 'image');
    if (photoId) doc.photo = { _type: 'image', asset: { _type: 'reference', _ref: photoId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Abteilung angelegt: ${m.name} (${m.role})`);
  }

  // Lösche eventuell veraltete Einträge aus früherer Migration (z.B. der ehemalige 4. Eintrag)
  for (let i = abteilungData.members.length; i < 10; i++) {
    try {
      await client.delete(`boardMember-abteilung-${i}`);
    } catch {
      // Ignorieren falls nicht vorhanden
    }
  }

  // 8. Events Collection
  console.log('\n📦 8. Migriere Neuigkeiten & Veranstaltungen (event)...');
  const eventsData = readJson('data/events.json') || { events: [] };
  for (let i = 0; i < eventsData.events.length; i++) {
    const ev = eventsData.events[i];
    const doc = {
      _id: `event-${i}`,
      _type: 'event',
      name: ev.name,
      meta: ev.meta || '',
      description: ev.description || '',
      link_text: ev.link_text || 'Mehr erfahren',
      link_url: ev.link_url || '',
    };
    if (ev.image) {
      const imgId = await uploadFileAsset(ev.image, 'image');
      if (imgId) doc.image = { _type: 'image', asset: { _type: 'reference', _ref: imgId } };
    }
    await client.createOrReplace(doc);
    console.log(`  ✅ Neuigkeit angelegt: ${ev.name}`);
  }

  // 9. Sponsors Collection
  console.log('\n📦 9. Migriere Sponsoren (sponsor)...');
  const sponsorsData = readJson('data/sponsors.json') || { sponsors: [] };
  for (let i = 0; i < sponsorsData.sponsors.length; i++) {
    const sp = sponsorsData.sponsors[i];
    const doc = {
      _id: `sponsor-${i}`,
      _type: 'sponsor',
      name: sp.name,
      link: sp.link,
      order: i,
    };
    const logoId = await uploadFileAsset(sp.image, 'image');
    if (logoId) doc.logo = { _type: 'image', asset: { _type: 'reference', _ref: logoId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Sponsor angelegt: ${sp.name}`);
  }

  // 10. Partners Collection
  console.log('\n📦 10. Migriere Kooperationspartner (partner)...');
  const partnersData = readJson('data/kooperationspartner.json') || { partners: [] };
  for (let i = 0; i < partnersData.partners.length; i++) {
    const pt = partnersData.partners[i];
    const doc = {
      _id: `partner-${i}`,
      _type: 'partner',
      name: pt.name,
      description: pt.description || '',
      link: pt.link,
      order: i,
    };
    const logoId = await uploadFileAsset(pt.image, 'image');
    if (logoId) doc.logo = { _type: 'image', asset: { _type: 'reference', _ref: logoId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Partner angelegt: ${pt.name}`);
  }

  // 11. Downloads Collection
  console.log('\n📦 11. Migriere Downloadcenter Dokumente (downloadItem)...');
  const downloadsData = readJson('data/downloads.json') || { cards: [] };
  for (let i = 0; i < downloadsData.cards.length; i++) {
    const dl = downloadsData.cards[i];
    const doc = {
      _id: `downloadItem-${i}`,
      _type: 'downloadItem',
      title: dl.title,
      description: dl.description,
      filename: dl.filename || '',
      order: i,
    };
    const fileId = await uploadFileAsset(dl.file, 'file');
    if (fileId) doc.file = { _type: 'file', asset: { _type: 'reference', _ref: fileId } };
    await client.createOrReplace(doc);
    console.log(`  ✅ Dokument angelegt: ${dl.title}`);
  }

  console.log('\n🎉 Migration erfolgreich abgeschlossen! Alle Daten sind in Sanity verfügbar.');
}

migrate().catch((err) => {
  console.error('\n❌ Schwerwiegender Fehler während der Migration:', err);
  process.exit(1);
});
