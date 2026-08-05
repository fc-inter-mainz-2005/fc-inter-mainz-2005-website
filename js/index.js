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
                const slidesWrap = document.getElementById('heroSlides');
                const dotsWrap = document.getElementById('heroIndicators');
                data.slides.forEach((s, i) => {
                    const div = document.createElement('div');
                    div.className = 'hero-slide' + (i === 0 ? ' active' : '');

                    const img = document.createElement('img');
                    img.src = netlifyImg(s.image, 1920);
                    img.srcset = `${netlifyImg(s.image, 800)} 800w, ${netlifyImg(s.image, 1920)} 1920w`;
                    img.sizes = '100vw';
                    img.width = 1920;
                    img.height = 1080;
                    img.alt = '';
                    if (i === 0) {
                        img.loading = 'eager';
                        img.fetchPriority = 'high';
                        img.decoding = 'sync';
                    } else {
                        img.loading = 'lazy';
                        img.fetchPriority = 'low';
                        img.decoding = 'async';
                    }
                    div.appendChild(img);

                    slidesWrap.appendChild(div);
                    const dot = document.createElement('div');
                    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
                    dot.dataset.idx = i;
                    dotsWrap.appendChild(dot);
                });
                const slides = document.querySelectorAll('.hero-slide');
                const dots = document.querySelectorAll('.hero-dot');
                let current = 0, timer;
                function goTo(idx) {
                    slides[current].classList.remove('active'); dots[current].classList.remove('active');
                    current = idx;
                    slides[current].classList.add('active'); dots[current].classList.add('active');
                }
                function next() { goTo((current + 1) % slides.length); }
                function startTimer() { clearInterval(timer); timer = setInterval(next, 5500); }
                dots.forEach(dot => dot.addEventListener('click', () => { goTo(parseInt(dot.dataset.idx)); startTimer(); }));
                if (slides.length > 1) startTimer();
            })


        fetch('data/stats.json')
            .then(res => { if (!res.ok) throw new Error('stats.json not found'); return res.json(); })
            .then(data => {
                const el = document.getElementById('stat-mitglieder');
                if (el && data.mitglieder) el.textContent = data.mitglieder;
            })
            .catch(err => console.warn('Stats nicht verfügbar:', err));

        (function loadFupaScript() {
            const s = document.createElement('script');
            s.async = true;
            s.src = 'https://widget-api.fupa.net/vendor/widget.js?v1';
            document.body.appendChild(s);
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
                data.sponsors.forEach(s => {
                    const a = document.createElement('a');
                    a.href = /^https?:\/\//i.test(s.link) ? s.link : '#';
                    a.target = '_blank';
                    a.rel = 'noopener';
                    a.className = 'sponsor-item';
                    const img = document.createElement('img');
                    img.src = netlifyImg(s.image, 220, 90);
                    img.alt = s.name;
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

        function netlifyImg(path, width, quality = 85) {
            if (!path || path.endsWith('.svg')) return path;
            return `/.netlify/images?url=${encodeURIComponent('/' + path)}&w=${width}&fm=webp&q=${quality}`;
        }


    
        fetch('data/banner.json')
            .then(res => { if (!res.ok) throw new Error('banner.json not found'); return res.json(); })
            .then(data => {
                const banner = document.getElementById('domain-banner');
                if (!banner) return;
                if (!data.show_banner) {
                    banner.style.display = 'none';
                } else if (data.banner_text) {
                    banner.textContent = data.banner_text;
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
            })
            .catch(err => console.warn('Footer-Daten nicht verfügbar:', err));