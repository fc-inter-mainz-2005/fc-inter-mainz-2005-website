const navbar = document.getElementById('navbar');
        const topBar = document.getElementById('topBar');
        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            navbar.classList.toggle('scrolled', currentScroll > 20);
            topBar.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 80);
            lastScroll = currentScroll;
        }, { passive: true });

        const hamburger = document.getElementById('hamburger');
        const mobileNav = document.getElementById('mobile-nav');
        const mobileClose = document.getElementById('mobile-close');
        hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
        mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
        mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

        function openLightbox(src, alt) {
            document.getElementById('lightbox-img').src = src;
            document.getElementById('lightbox-img').alt = alt || '';
            document.getElementById('lightbox').classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('open');
            document.body.style.overflow = '';
        }
        document.getElementById('lightbox').addEventListener('click', function (e) {
            if (e.target === this) closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
        document.querySelectorAll('.lightbox-img').forEach(img => {
            img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
        });

        const badgeColors = ['var(--red)', 'var(--blue-mid)', '#e2e8f0'];
        const badgeText = ['white', 'white', 'var(--blue)'];

        fetch('data/teams.json')
            .then(res => { if (!res.ok) throw new Error('teams.json not found'); return res.json(); })
            .then(data => {
                const nav = document.getElementById('teams-nav');
                const container = document.getElementById('teams-container');

                data.teams.forEach((team, i) => {
                    const slug = 'team-' + i;

                    if (i > 0) {
                        const sep = document.createElement('span');
                        sep.className = 'text-gray-300';
                        sep.textContent = '|';
                        nav.appendChild(sep);
                    }
                    const navLink = document.createElement('a');
                    navLink.href = '#' + slug;
                    navLink.className = 'text-[var(--text-muted)] hover:text-[var(--text-main)] transition';
                    navLink.textContent = team.name;
                    nav.appendChild(navLink);

                    const section = document.createElement('section');
                    section.id = slug;
                    section.className = 'reveal';
                    section.innerHTML = `
                <div class="flex items-center mb-8">
                    <h2 class="team-title"></h2>
                    <div class="flex-grow h-px bg-gray-200 ml-4 md:ml-8"></div>
                    <span class="ml-4 md:ml-8 text-xs font-bold px-3 py-1 rounded tracking-widest uppercase liga-badge"></span>
                </div>
                <div class="bg-[var(--bg-surface)] p-3 md:p-4 rounded-2xl border border-[var(--card-border)] shadow-md transform transition hover:scale-[1.02] duration-500">
                    <img class="w-full h-auto object-cover rounded-xl lightbox-img" alt="">
                    <div class="fupa-link-wrap"></div>
                </div>`;
                    section.querySelector('.team-title').textContent = team.name;
                    const badge = section.querySelector('.liga-badge');
                    badge.textContent = team.liga || '';
                    badge.style.background = badgeColors[i % badgeColors.length];
                    badge.style.color = badgeText[i % badgeText.length];

                    const img = section.querySelector('img');
                    img.src = netlifyImg(team.photo, 1200);
                    img.srcset = [480, 800, 1200, 1600]
                        .map(w => `${netlifyImg(team.photo, w)} ${w}w`)
                        .join(', ');
                    img.sizes = '(min-width: 1024px) 900px, 100vw';
                    img.alt = 'Mannschaftsfoto ' + team.name;
                    img.loading = i === 0 ? 'eager' : 'lazy';
                    img.fetchPriority = i === 0 ? 'high' : 'low';
                    img.decoding = i === 0 ? 'sync' : 'async';
                    img.onerror = function () {
                        const wrap = document.createElement('div');
                        wrap.className = 'w-full h-72 bg-gray-100 rounded-xl flex flex-col items-center justify-center text-[var(--text-muted)]';
                        wrap.innerHTML = `<svg class="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`;
                        const label = document.createElement('p');
                        label.className = 'text-sm font-semibold uppercase tracking-wide text-[var(--blue)]';
                        label.textContent = 'Mannschaftsfoto ' + team.name;
                        wrap.appendChild(label);
                        this.parentElement.replaceChildren(wrap);
                    };

                    if (team.fupa_link) {
                        section.querySelector('.fupa-link-wrap').innerHTML = `
                    <a href="${team.fupa_link}" target="_blank" rel="noopener"
                        class="inline-flex items-center gap-2 mt-4 text-sm font-bold uppercase tracking-wider text-[var(--red)] hover:text-[var(--blue)] transition">
                        Kompletten Kader ansehen
                        <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </a>`;
                    }
                    container.appendChild(section);
                    revealObserver.observe(section);
                    section.querySelectorAll('.lightbox-img').forEach(img => {
                        img.addEventListener('click', () => openLightbox(img.currentSrc || img.src, img.alt));
                    });
                });
            })
            .catch(err => console.warn('Teams nicht verfügbar:', err));

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