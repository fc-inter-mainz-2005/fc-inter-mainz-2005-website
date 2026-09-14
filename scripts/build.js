const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

// Helper: Normalize Netlify Image CDN URL
function netlifyImg(imgPath, width, quality = 75) {
    if (!imgPath) return '';
    const cleanPath = String(imgPath).replace(/^\/+/, '');
    if (cleanPath.endsWith('.svg')) return '/' + cleanPath;
    return `/.netlify/images?url=${encodeURIComponent('/' + cleanPath)}&w=${width}&fm=webp&q=${quality}`;
}

// Helper: Generate Netlify srcset
function netlifySrcset(imgPath, widths, quality = 75) {
    if (!imgPath || String(imgPath).endsWith('.svg')) return '';
    return widths.map(w => `${netlifyImg(imgPath, w, quality)} ${w}w`).join(', ');
}

// Helper: Basic HTML escaping to prevent XSS / broken markup
function escapeHtml(str) {
    if (!str && str !== 0) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Helper: Safe URL
function safeUrl(url) {
    if (!url) return '';
    try {
        const u = new URL(url, 'https://intermainz.de');
        return ['http:', 'https:'].includes(u.protocol) ? u.href : '';
    } catch {
        return '';
    }
}

// Helper: Read JSON safely
function readJson(relPath) {
    const fullPath = path.join(ROOT_DIR, relPath);
    if (!fs.existsSync(fullPath)) {
        console.warn(`[build] Warning: ${relPath} not found`);
        return null;
    }
    try {
        return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    } catch (e) {
        console.error(`[build] Error parsing ${relPath}:`, e.message);
        return null;
    }
}

// ==========================================
// 1. Build index.html
// ==========================================
function buildIndex() {
    const htmlPath = path.join(ROOT_DIR, 'index.html');
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, 'utf8');

    const hero = readJson('data/hero.json');
    const stats = readJson('data/stats.json');
    const sponsors = readJson('data/sponsors.json');
    const events = readJson('data/events.json');
    const footer = readJson('data/footer.json');

    const heroWidths = [640, 960, 1200, 1600, 1920];

    if (hero) {
        const firstImg = hero.slides && hero.slides.length > 0 ? hero.slides[0].image : '';
        if (firstImg) {
            // Update preload in <head>
            const preloadTag = `<link rel="preload" as="image" href="${netlifyImg(firstImg, 1200, 75)}"
        imagesrcset="${netlifySrcset(firstImg, heroWidths, 75)}"
        imagesizes="100vw" fetchpriority="high">`;

            html = html.replace(
                /<link\s+rel="preload"\s+as="image"[^>]*fetchpriority="high">/s,
                preloadTag
            );

            // Update hero-slides: Slide 0 eager/fetchpriority="high", Slides 1+ data-src / data-srcset lazy
            const slidesHtml = hero.slides.map((s, idx) => {
                const isActive = idx === 0 ? ' active' : '';
                if (idx === 0) {
                    return `            <div class="hero-slide active">
                <img src="${netlifyImg(s.image, 1200, 75)}"
                    srcset="${netlifySrcset(s.image, heroWidths, 75)}"
                    sizes="100vw" width="1920" height="1080" alt="FC Inter Mainz" fetchpriority="high" decoding="sync">
            </div>`;
                } else {
                    return `            <div class="hero-slide">
                <img data-src="${netlifyImg(s.image, 1200, 75)}"
                    data-srcset="${netlifySrcset(s.image, heroWidths, 75)}"
                    sizes="100vw" width="1920" height="1080" alt="" loading="lazy" decoding="async">
            </div>`;
                }
            }).join('\n');

            html = html.replace(
                /<div\s+class="hero-slides"\s+id="heroSlides">[\s\S]*?<\/div>(?=\s*<div\s+class="hero-content">)/s,
                `<div class="hero-slides" id="heroSlides">\n${slidesHtml}\n        </div>`
            );

            // Update hero indicators
            const dotsHtml = hero.slides.map((_, idx) => {
                const isActive = idx === 0 ? ' active' : '';
                return `            <div class="hero-dot${isActive}" data-idx="${idx}"></div>`;
            }).join('\n');

            html = html.replace(
                /<div\s+class="hero-indicators"\s+id="heroIndicators">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/header>)/s,
                `<div class="hero-indicators" id="heroIndicators">\n${dotsHtml}\n        </div>`
            );
        }

        // Update hero title
        if (hero.title_line1) {
            const titleHtml = `\n                ${escapeHtml(hero.title_line1)}\n                <span class="accent">${escapeHtml(hero.title_accent || '')}</span>\n                ${escapeHtml(hero.title_line3 || '')}\n            `;
            html = html.replace(
                /<h1\s+class="hero-title"\s+id="hero-title">[\s\S]*?<\/h1>/s,
                `<h1 class="hero-title" id="hero-title">${titleHtml}</h1>`
            );
        }

        // Update hero subtitle
        if (hero.subtitle) {
            html = html.replace(
                /<p\s+class="hero-sub"\s+id="hero-sub">[\s\S]*?<\/p>/s,
                `<p class="hero-sub" id="hero-sub">${escapeHtml(hero.subtitle)}</p>`
            );
        }
    }

    // Update stats
    if (stats) {
        if (stats.gegruendet) html = html.replace(/(<div\s+class="stat-num"\s+id="stat-gegruendet">)[^<]*(<\/div>)/, `$1${escapeHtml(stats.gegruendet)}$2`);
        if (stats.mannschaften) html = html.replace(/(<div\s+class="stat-num"\s+id="stat-mannschaften">)[^<]*(<\/div>)/, `$1${escapeHtml(stats.mannschaften)}$2`);
        if (stats.mitglieder) html = html.replace(/(<div\s+class="stat-num"\s+id="stat-mitglieder">)[^<]*(<\/div>)/, `$1${escapeHtml(stats.mitglieder)}$2`);
        if (stats.nationen) html = html.replace(/(<div\s+class="stat-num"\s+id="stat-nationen">)[^<]*(<\/div>)/, `$1${escapeHtml(stats.nationen)}$2`);
    }

    // Update sponsors
    if (sponsors && Array.isArray(sponsors.sponsors)) {
        const sponsorsHtml = sponsors.sponsors.map(s => {
            const href = /^https?:\/\//i.test(s.link) ? s.link : '#';
            return `                <a href="${escapeHtml(href)}" target="_blank" rel="noopener" class="sponsor-item">
                    <img src="${netlifyImg(s.image, 140, 75)}" alt="${escapeHtml(s.name)}" width="70" height="70" title="${escapeHtml(s.name)}" loading="lazy">
                </a>`;
        }).join('\n');

        html = html.replace(
            /<div\s+class="sponsors-grid"\s+id="sponsors-track">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/section>)/s,
            `<div class="sponsors-grid" id="sponsors-track">\n${sponsorsHtml}\n            </div>`
        );
    }

    // Update events
    if (events && Array.isArray(events.events)) {
        const eventsHtml = events.events.map((event, index) => {
            const delayClass = index === 0 ? 'reveal-delay-1' : 'reveal-delay-2';
            const imgHtml = event.image ? `\n                        <div class="news-card-media"><img src="${netlifyImg(event.image, 144, 75)}" width="72" height="72" alt="${escapeHtml(event.name || '')}" loading="lazy" decoding="async"></div>` : '';
            const link = safeUrl(event.link_url);
            const linkHtml = link ? `\n                            <a class="news-card-link" href="${escapeHtml(link)}" target="_blank" rel="noopener">${escapeHtml(event.link_text || 'Fotos ansehen')}</a>` : '';

            return `                        <div class="news-card reveal ${delayClass}">${imgHtml}
                            <div class="news-card-content">
                                <div class="news-card-title">${escapeHtml(event.name || '')}</div>
                                <div class="news-card-meta">${escapeHtml(event.meta || '')}</div>
                                <p class="news-card-desc">${escapeHtml(event.description || '')}</p>${linkHtml}
                            </div>
                        </div>`;
        }).join('\n');

        html = html.replace(
            /<div\s+id="event-list"\s+class="space-y-4">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<\/section>)/s,
            `<div id="event-list" class="space-y-4">\n${eventsHtml}\n                    </div>`
        );
    }

    // Update footer brand description
    if (footer && footer.brand_description) {
        html = html.replace(
            /<p\s+class="footer-brand-desc"\s+id="footer-brand-desc">[\s\S]*?<\/p>/s,
            `<p class="footer-brand-desc" id="footer-brand-desc">${escapeHtml(footer.brand_description)}</p>`
        );
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('[build] index.html pre-rendered successfully.');
}

// ==========================================
// 2. Build teams.html
// ==========================================
function buildTeams() {
    const htmlPath = path.join(ROOT_DIR, 'teams.html');
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, 'utf8');

    const teamsData = readJson('data/teams.json');
    if (!teamsData || !Array.isArray(teamsData.teams) || teamsData.teams.length === 0) return;

    const badgeColors = ['var(--red)', 'var(--blue-mid)', '#e2e8f0'];
    const badgeText = ['white', 'white', 'var(--blue)'];
    const teamWidths = [480, 768, 1024, 1280, 1600];

    // Preload first team image in <head>
    const firstTeam = teamsData.teams[0];
    const preloadTag = `<link rel="preload" as="image" href="${netlifyImg(firstTeam.photo, 1024, 80)}"
        imagesrcset="${netlifySrcset(firstTeam.photo, teamWidths, 80)}"
        imagesizes="(min-width: 1024px) 900px, 100vw" fetchpriority="high">`;

    if (!html.includes('fetchpriority="high"')) {
        html = html.replace(
            /(<link\s+rel="preload"\s+href="fonts\/[^"]+"\s+as="font"[^>]*>)/,
            `$1\n\n    ${preloadTag}`
        );
    } else {
        html = html.replace(
            /<link\s+rel="preload"\s+as="image"[^>]*fetchpriority="high">/s,
            preloadTag
        );
    }

    // Teams navigation
    const navItems = teamsData.teams.map((team, i) => {
        const slug = 'team-' + i;
        const sep = i > 0 ? `<span class="text-gray-300">|</span>` : '';
        return `${sep}<a href="#${slug}" class="text-[var(--text-muted)] hover:text-[var(--text-main)] transition">${escapeHtml(team.name)}</a>`;
    }).join('\n                ');

    html = html.replace(
        /<div\s+class="mt-10[^"]*"\s+id="teams-nav">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/header>)/s,
        `<div class="mt-10 flex flex-wrap justify-center gap-x-3 md:gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-widest reveal reveal-delay-3" id="teams-nav">\n                ${navItems}\n            </div>`
    );

    // Teams container sections
    const sections = teamsData.teams.map((team, i) => {
        const slug = 'team-' + i;
        const isFirst = i === 0;
        const fupaLink = team.fupa_link ? `
                    <a href="${escapeHtml(team.fupa_link)}" target="_blank" rel="noopener"
                        class="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-wider text-[var(--red)] hover:text-[var(--blue)] transition">
                        Kompletten Kader ansehen
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>` : '';

        return `                <section id="${slug}" class="reveal">
                    <div class="flex items-center mb-8">
                        <h2 class="team-title">${escapeHtml(team.name)}</h2>
                        <div class="flex-grow h-px bg-gray-200 ml-4 md:ml-8"></div>
                        <span class="ml-4 md:ml-8 text-xs font-bold px-3 py-1 rounded tracking-widest uppercase liga-badge" style="background: ${badgeColors[i % badgeColors.length]}; color: ${badgeText[i % badgeText.length]};">${escapeHtml(team.liga || '')}</span>
                    </div>
                    <div class="bg-[var(--bg-surface)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] shadow-md transform transition hover:scale-[1.02] duration-500">
                        <div class="team-photo-wrap">
                            <img class="w-full h-full object-cover rounded-xl lightbox-img"
                                 src="${netlifyImg(team.photo, 1024, 80)}"
                                 srcset="${netlifySrcset(team.photo, teamWidths, 80)}"
                                 sizes="(min-width: 1024px) 900px, 100vw"
                                 alt="Mannschaftsfoto ${escapeHtml(team.name)}"
                                 width="1200" height="750"
                                 ${isFirst ? 'loading="eager" fetchpriority="high" decoding="sync"' : 'loading="lazy" fetchpriority="low" decoding="async"'}>
                        </div>
                        <div class="fupa-link-wrap">${fupaLink}</div>
                    </div>
                </section>`;
    }).join('\n\n');

    html = html.replace(
        /<div\s+id="teams-container"\s+class="space-y-28">[\s\S]*?<\/div>(?=\s*<\/div>\s*<\/main>)/s,
        `<div id="teams-container" class="space-y-28">\n${sections}\n            </div>`
    );

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('[build] teams.html pre-rendered successfully.');
}

// ==========================================
// 3. Build vorstand.html
// ==========================================
function buildVorstand() {
    const htmlPath = path.join(ROOT_DIR, 'vorstand.html');
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, 'utf8');

    const vorstand = readJson('data/vorstand.json');
    const abteilung = readJson('data/vorstand_abteilung.json');

    if (vorstand && Array.isArray(vorstand.members)) {
        const membersHtml = vorstand.members.map(m => {
            return `                <div class="vorstand-card">
                    <div class="vorstand-photo"><img src="${netlifyImg(m.photo, 280, 75)}" alt="${escapeHtml(m.name)}" width="140" height="140" loading="lazy" decoding="async" class="w-full h-full object-cover"></div>
                    <h3 class="text-xl font-bold mb-1 text-[var(--blue)]">${escapeHtml(m.name)}</h3>
                    <p class="text-[var(--red)] font-bold text-xs uppercase tracking-widest mb-6">${escapeHtml(m.role)}</p>
                    <a href="kontakt.html" class="inline-block bg-transparent hover:bg-[var(--red)] border border-[var(--card-border)] hover:border-[var(--red)] text-[var(--blue)] hover:text-white font-bold py-3 px-8 rounded-lg transition">Kontaktieren</a>
                </div>`;
        }).join('\n');

        html = html.replace(
            /<div\s+class="vorstand-grid"\s+id="vorstand-grid">[\s\S]*?<\/div>(?=\s*<\/section>)/s,
            `<div class="vorstand-grid" id="vorstand-grid">\n${membersHtml}\n            </div>`
        );
    }

    if (abteilung && Array.isArray(abteilung.members)) {
        const abteilungHtml = abteilung.members.map(m => {
            return `                <div class="vorstand-card">
                    <div class="vorstand-photo"><img src="${netlifyImg(m.photo, 280, 75)}" alt="${escapeHtml(m.name)}" width="140" height="140" loading="lazy" decoding="async" class="w-full h-full object-cover"></div>
                    <h3 class="text-xl font-bold mb-1 text-[var(--blue)]">${escapeHtml(m.name)}</h3>
                    <p class="text-[var(--red)] font-bold text-xs uppercase tracking-widest mb-6">${escapeHtml(m.role)}</p>
                </div>`;
        }).join('\n');

        html = html.replace(
            /<div\s+class="vorstand-grid\s+vorstand-grid-4"\s+id="vorstand-grid-abteilung">[\s\S]*?<\/div>(?=\s*<\/section>)/s,
            `<div class="vorstand-grid vorstand-grid-4" id="vorstand-grid-abteilung">\n${abteilungHtml}\n            </div>`
        );
    }

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('[build] vorstand.html pre-rendered successfully.');
}

// ==========================================
// 4. Build geschichte.html
// ==========================================
function buildGeschichte() {
    const htmlPath = path.join(ROOT_DIR, 'geschichte.html');
    if (!fs.existsSync(htmlPath)) return;
    let html = fs.readFileSync(htmlPath, 'utf8');

    const geschichte = readJson('data/geschichte.json');
    if (!geschichte) return;

    const histWidths = [480, 768, 1024, 1280, 1600];

    ['gruendung', 'aufstieg', 'heute'].forEach((key, idx) => {
        const era = geschichte[key];
        if (!era) return;

        // Update year
        if (era.jahr) {
            const regex = new RegExp(`(<div[^>]*id="jahr-${key}"[^>]*>)[^<]*(<\\/div>)`);
            html = html.replace(regex, `$1${escapeHtml(era.jahr)}$2`);
        }

        // Update title
        if (era.titel) {
            const regex = new RegExp(`(<h2[^>]*id="titel-${key}"[^>]*>)[^<]*(<\\/h2>)`);
            html = html.replace(regex, `$1${escapeHtml(era.titel)}$2`);
        }

        // Update paragraphs
        if (era.text) {
            const pTags = era.text.split('\n\n')
                .filter(p => p.trim())
                .map(p => `<p class="mb-4">${escapeHtml(p.trim())}</p>`)
                .join('\n                        ');
            const regex = new RegExp(`(<div[^>]*id="text-${key}"[^>]*>)[\\s\\S]*?(<\\/div>)`);
            html = html.replace(regex, `$1\n                        ${pTags}\n                    $2`);
        }

        // Update image wrapped in .history-photo-wrap for CLS prevention
        if (era.photo) {
            const isEager = idx === 0;
            const imgTag = `<div class="history-photo-wrap">
                        <img src="${netlifyImg(era.photo, 1024, 80)}"
                            srcset="${netlifySrcset(era.photo, histWidths, 80)}"
                            sizes="(min-width: 1024px) 58vw, 100vw"
                            alt="${escapeHtml(era.titel || 'Historisches Bild')}" id="img-${key}"
                            class="w-full h-full object-cover rounded-xl lightbox-img"
                            width="1200" height="750"
                            ${isEager ? 'loading="eager" fetchpriority="high" decoding="sync"' : 'loading="lazy" fetchpriority="low" decoding="async"'}>
                    </div>`;

            const imgRegex = new RegExp(`<div class="history-photo-wrap">\\s*<img[^>]*id="img-${key}"[^>]*>\\s*<\\/div>|<img[^>]*id="img-${key}"[^>]*>`, 's');
            html = html.replace(imgRegex, imgTag);

            // If first image, preload in <head>
            if (isEager) {
                const preloadTag = `<link rel="preload" as="image" href="${netlifyImg(era.photo, 1024, 80)}"
        imagesrcset="${netlifySrcset(era.photo, histWidths, 80)}"
        imagesizes="(min-width: 1024px) 58vw, 100vw" fetchpriority="high">`;

                if (!html.includes('fetchpriority="high"')) {
                    html = html.replace(
                        /(<link\s+rel="preload"\s+href="fonts\/[^"]+"\s+as="font"[^>]*>)/,
                        `$1\n\n    ${preloadTag}`
                    );
                } else {
                    html = html.replace(
                        /<link\s+rel="preload"\s+as="image"[^>]*fetchpriority="high">/s,
                        preloadTag
                    );
                }
            }
        }
    });

    fs.writeFileSync(htmlPath, html, 'utf8');
    console.log('[build] geschichte.html pre-rendered successfully.');
}

// Execute all builders
console.log('--- Starting Static Pre-Render Build ---');
buildIndex();
buildTeams();
buildVorstand();
buildGeschichte();
console.log('--- Static Pre-Render Build Complete ---');
