const navbar = document.getElementById('navbar');
const topBar = document.getElementById('topBar');
let lastScroll = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    navbar.classList.toggle('scrolled', currentScroll > 20);
    topBar.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 80);
    lastScroll = currentScroll;
}, { passive: true });

fetch('data/hero.json')
    .then(res => { if (!res.ok) throw new Error('hero.json not found'); return res.json(); })
    .then(data => {
        const titleEl = document.getElementById('hero-title');
        if (titleEl && data.title_line1) {
            titleEl.replaceChildren(
                document.createTextNode(data.title_line1 + ' '),
                Object.assign(document.createElement('span'), { className: 'accent', textContent: data.title_accent || '' }),
                document.createTextNode(' ' + (data.title_line3 || ''))
            );
        }
        const subEl = document.getElementById('hero-sub');
        if (subEl && data.subtitle) subEl.textContent = data.subtitle;

        const slidesWrap = document.getElementById('heroSlides');
        const dotsWrap = document.getElementById('heroIndicators');

        if (!slidesWrap.querySelector('.hero-slide:nth-child(2)')) {
            dotsWrap.replaceChildren();
            data.slides.forEach((s, i) => {
                const dot = document.createElement('div');
                dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                dot.dataset.idx = i;
                dotsWrap.appendChild(dot);

                if (i === 0) return;

                const div = document.createElement('div');
                div.className = 'hero-slide';
                const img = document.createElement('img');
                const heroSrcsetStr = `${netlifyImg(s.image, 640)} 640w, ${netlifyImg(s.image, 960)} 960w, ${netlifyImg(s.image, 1200)} 1200w, ${netlifyImg(s.image, 1600)} 1600w, ${netlifyImg(s.image, 1920)} 1920w`;
                img.setAttribute('data-src', netlifyImg(s.image, 1200));
                img.setAttribute('data-srcset', heroSrcsetStr);
                img.sizes = '100vw';
                img.width = 1920;
                img.height = 1080;
                img.alt = '';
                img.loading = 'lazy';
                img.fetchPriority = 'low';
                img.decoding = 'async';
                div.appendChild(img);
                slidesWrap.appendChild(div);
            });
        }

        function sanitizeImageUrl(urlValue) {
            if (!urlValue) return null;
            const value = urlValue.trim();
            try {
                const parsed = new URL(value, window.location.origin);
                if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.href;
            } catch (_) {
                return null;
            }
            return null;
        }

        function sanitizeSrcset(srcsetValue) {
            if (!srcsetValue) return null;
            const parts = srcsetValue.split(',').map(part => part.trim()).filter(Boolean);
            if (!parts.length) return null;

            const sanitizedParts = [];
            for (const part of parts) {
                const match = part.match(/^(\S+)(?:\s+(.+))?$/);
                if (!match) return null;
                const safeUrl = sanitizeImageUrl(match[1]);
                if (!safeUrl) return null;
                sanitizedParts.push(match[2] ? `${safeUrl} ${match[2]}` : safeUrl);
            }
            return sanitizedParts.join(', ');
        }

        function activateSlideImage(slideEl) {
            if (!slideEl) return;
            const img = slideEl.querySelector('img[data-src]');
            if (img) {
                const safeSrc = sanitizeImageUrl(img.getAttribute('data-src'));
                if (safeSrc) {
                    img.src = safeSrc;
                }
                const rawSrcset = img.getAttribute('data-srcset');
                if (rawSrcset) {
                    const safeSrcset = sanitizeSrcset(rawSrcset);
                    if (safeSrcset) {
                        img.srcset = safeSrcset;
                    }
                }
                img.removeAttribute('data-src');
                img.removeAttribute('data-srcset');
            }
        }

        const slides = document.querySelectorAll('.hero-slide');
        const dots = document.querySelectorAll('.hero-dot');
        let current = 0;
        let timer = null;
        let preloadTimer = null;
        const SLIDE_DURATION = 5500;
        const PRELOAD_OFFSET = 1000;

        function scheduleNextPreload() {
            clearTimeout(preloadTimer);
            const nextIdx = (current + 1) % slides.length;
            preloadTimer = setTimeout(() => {
                activateSlideImage(slides[nextIdx]);
            }, SLIDE_DURATION - PRELOAD_OFFSET);
        }

        function goTo(idx) {
            slides[current].classList.remove('active');
            dots[current].classList.remove('active');
            current = idx;
            activateSlideImage(slides[current]);
            slides[current].classList.add('active');
            dots[current].classList.add('active');
            scheduleNextPreload();
        }

        function next() {
            goTo((current + 1) % slides.length);
        }

        function startTimer() {
            clearInterval(timer);
            timer = setInterval(next, SLIDE_DURATION);
            scheduleNextPreload();
        }

        dots.forEach(dot => dot.addEventListener('click', () => {
            goTo(parseInt(dot.dataset.idx, 10));
            startTimer();
        }));

        if (slides.length > 1) {
            startTimer();
        }
    })


fetch('data/stats.json')
    .then(res => { if (!res.ok) throw new Error('stats.json not found'); return res.json(); })
    .then(data => {
        const setStat = (id, val) => {
            const el = document.getElementById(id);
            if (el && val) el.textContent = val;
        };
        setStat('stat-gegruendet', data.gegruendet);
        setStat('stat-mannschaften', data.mannschaften);
        setStat('stat-mitglieder', data.mitglieder);
        setStat('stat-nationen', data.nationen);
    })
    .catch(err => console.warn('Stats nicht verfügbar:', err));

(function loadFupaScript() {
    const matchesSection = document.querySelector('.matches-section');
    if (!matchesSection) return;
    const obs = new IntersectionObserver((entries, o) => {
        if (entries.some(e => e.isIntersecting)) {
            const s = document.createElement('script');
            s.async = true;
            s.src = 'https://widget-api.fupa.net/vendor/widget.js?v1';
            document.body.appendChild(s);
            o.disconnect();
        }
    }, { rootMargin: '300px' });
    obs.observe(matchesSection);
})();

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

(function () {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    els.forEach(el => observer.observe(el));
})();


fetch('data/events.json')
    .then(res => {
        if (!res.ok) throw new Error('events.json not found');
        return res.json();
    })
    .then(data => {
        const list = document.getElementById('event-list');
        if (list && list.children.length > 0) return;

        const dynamicObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        const safeUrl = (url) => {
            if (!url) return '';
            try {
                const u = new URL(url, window.location.origin);
                return ['http:', 'https:'].includes(u.protocol) ? u.href : '';
            } catch {
                return '';
            }
        };

        data.events.forEach((event, index) => {
            const card = document.createElement('div');
            card.className = `news-card reveal ${index === 0 ? 'reveal-delay-1' : 'reveal-delay-2'}`;

            if (event.image) {
                const media = document.createElement('div');
                media.className = 'news-card-media';
                const img = document.createElement('img');
                img.src = netlifyImg(event.image, 144, 80);
                img.width = 72;
                img.height = 72;
                img.alt = event.name || '';
                img.loading = 'lazy';
                img.decoding = 'async';
                media.appendChild(img);
                card.appendChild(media);
            }

            const content = document.createElement('div');
            content.className = 'news-card-content';
            content.innerHTML = `
                        <div class="news-card-title"></div>
                        <div class="news-card-meta"></div>
                        <p class="news-card-desc"></p>`;
            content.querySelector('.news-card-title').textContent = event.name || '';
            content.querySelector('.news-card-meta').textContent = event.meta || '';
            content.querySelector('.news-card-desc').textContent = event.description || '';

            const linkUrl = safeUrl(event.link_url);
            if (linkUrl) {
                const a = document.createElement('a');
                a.className = 'news-card-link';
                a.href = linkUrl;
                a.target = '_blank';
                a.rel = 'noopener';
                a.textContent = event.link_text || 'Fotos ansehen';
                content.appendChild(a);
            }

            card.appendChild(content);
            list.appendChild(card);
            dynamicObserver.observe(card);
        });
    })
    .catch(err => console.warn('Events not loaded:', err));

fetch('data/sponsors.json')
    .then(res => {
        if (!res.ok) throw new Error('sponsors.json not found');
        return res.json();
    })
    .then(data => {
        const track = document.getElementById('sponsors-track');
        if (track && track.children.length > 0) return;
        data.sponsors.forEach(s => {
            const a = document.createElement('a');
            a.href = /^https?:\/\//i.test(s.link) ? s.link : '#';
            a.target = '_blank';
            a.rel = 'noopener';
            a.className = 'sponsor-item';
            const img = document.createElement('img');
            img.src = netlifyImg(s.image, 140, 75);
            img.alt = s.name;
            img.width = 70;
            img.height = 70;
            img.title = s.name;
            img.loading = 'lazy';
            a.appendChild(img);
            track.appendChild(a);
        });
    }).catch(err => console.warn('Sponsors not available:', err));


document.querySelectorAll('.nav-links li.has-dropdown > .dropdown-toggle').forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parent = toggle.closest('li');
        document.querySelectorAll('.nav-links li.has-dropdown').forEach(li => {
            if (li !== parent) li.classList.remove('open');
        });
        parent.classList.toggle('open');
    });
});
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-links li.has-dropdown')) {
        document.querySelectorAll('.nav-links li.has-dropdown').forEach(li => li.classList.remove('open'));
    }
});

document.querySelectorAll('.mobile-nav-group-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        toggle.closest('.mobile-nav-group').classList.toggle('open');
    });
});

function netlifyImg(path, width, quality = 75) {
    if (!path || path.endsWith('.svg')) return path;
    const cleanPath = path.replace(/^\/+/, '');
    return `/.netlify/images?url=${encodeURIComponent('/' + cleanPath)}&w=${width}&fm=webp&q=${quality}`;
}



fetch('data/banner.json')
    .then(res => { if (!res.ok) throw new Error('banner.json not found'); return res.json(); })
    .then(data => {
        const banner = document.getElementById('domain-banner');
        if (!banner) return;
        if (data.show_banner) {
            banner.style.display = 'block';
            if (data.banner_text) {
                banner.textContent = data.banner_text;
            }
        }
    })
    .catch(err => console.warn('Banner nicht verfügbar:', err));

fetch('data/footer.json')
    .then(res => { if (!res.ok) throw new Error('footer.json not found'); return res.json(); })
    .then(data => {
        const desc = document.getElementById('footer-brand-desc');
        if (desc && data.brand_description) desc.textContent = data.brand_description;

        const addr = document.getElementById('footer-address');
        if (addr) {
            addr.replaceChildren();
            [data.address_line1, data.address_line2].forEach((line, i) => {
                if (i > 0) addr.appendChild(document.createElement('br'));
                addr.appendChild(document.createTextNode(line || ''));
            });
        }

        const extraWrap = document.getElementById('footer-extra-contact');
        if (extraWrap && Array.isArray(data.extra_contact)) {
            extraWrap.replaceChildren();
            data.extra_contact.forEach(item => {
                const p = document.createElement('p');
                p.textContent = (item && item.line) ? item.line : item;
                extraWrap.appendChild(p);
            });
        }

        const copy = document.getElementById('footer-copyright');
        if (copy && data.copyright_text) copy.textContent = data.copyright_text;

        const emailWrap = document.getElementById('footer-email-wrap');
        const emailLink = document.getElementById('footer-email');
        if (emailWrap && emailLink && data.email) {
            emailLink.href = 'mailto:' + data.email;
            emailLink.textContent = data.email;
            emailWrap.style.display = 'block';
        }

        const fbLink = document.getElementById('footer-facebook');
        if (fbLink && data.facebook_url) fbLink.href = data.facebook_url;
        const igLink = document.getElementById('footer-instagram');
        if (igLink && data.instagram_url) igLink.href = data.instagram_url;
    })
    .catch(err => console.warn('Footer-Daten nicht verfügbar:', err));