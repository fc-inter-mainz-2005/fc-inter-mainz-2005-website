const navbar = document.getElementById('navbar');
        const topBar = document.getElementById('topBar');
        let lastScroll = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            topBar.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 80);
            lastScroll = currentScroll;
        }, { passive: true });

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

        fetch('data/vorstand.json')
            .then(res => {
                if (!res.ok) throw new Error('vorstand.json not found');
                return res.json();
            })
            .then(data => {
                const grid = document.getElementById('vorstand-grid');
                data.members.forEach(m => {
                    const card = document.createElement('div');
                    card.className = 'vorstand-card';
                    card.innerHTML = `
                <div class="vorstand-photo"><img alt="" class="w-full h-full object-cover"></div>
                <h3 class="text-xl font-bold mb-1 text-[var(--blue)]"></h3>
                <p class="text-[var(--red)] font-bold text-xs uppercase tracking-widest mb-6"></p>
                <a href="kontakt.html" class="inline-block bg-transparent hover:bg-[var(--red)] border border-[var(--card-border)] hover:border-[var(--red)] text-[var(--blue)] hover:text-white font-bold py-3 px-8 rounded-lg transition">Kontaktieren</a>`;
                    card.querySelector('img').src = netlifyImg(m.photo, 300, 90);
                    card.querySelector('img').alt = m.name;
                    card.querySelector('img').width = 300;
card.querySelector('img').height = 300;
card.querySelector('img').loading = 'lazy';
card.querySelector('img').decoding = 'async';
                    card.querySelector('h3').textContent = m.name;
                    card.querySelector('p').textContent = m.role;
                    grid.appendChild(card);
                });
            }).catch(err => console.warn('Vorstand not available:', err));


        fetch('data/vorstand_abteilung.json')
            .then(res => { if (!res.ok) throw new Error('vorstand_abteilung.json not found'); return res.json(); })
            .then(data => {
                const grid = document.getElementById('vorstand-grid-abteilung');
                data.members.forEach(m => {
                    const initials = m.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                    const card = document.createElement('div');
                    card.className = 'vorstand-card';
                    card.innerHTML = `
                <div class="vorstand-photo">
                    <img alt="" class="w-full h-full object-cover">
                </div>
                <h3 class="text-xl font-bold mb-1 text-[var(--blue)]"></h3>
                <p class="text-[var(--red)] font-bold text-xs uppercase tracking-widest mb-6"></p>`;
                    const imgEl = card.querySelector('img');
                    imgEl.src = netlifyImg(m.photo, 300, 90);
                    imgEl.alt = m.name;
                    imgEl.width = 300;
imgEl.height = 300;
imgEl.loading = 'lazy';
imgEl.decoding = 'async';
                    imgEl.onerror = function () {
                        const fallback = document.createElement('div');
                        fallback.className = 'w-full h-full bg-blue-900/20 flex items-center justify-center text-blue-500 text-4xl font-black';
                        fallback.textContent = initials;
                        this.parentElement.replaceChildren(fallback);
                    };
                    card.querySelector('h3').textContent = m.name;
                    card.querySelector('p').textContent = m.role;
                    grid.appendChild(card);
                });
            }).catch(err => console.warn('Abteilungsverantwortliche nicht verfügbar:', err));

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
            if (!path || path.endsWith('.svg')) return path; // SVGs no se tocan
            return `/.netlify/images?url=${encodeURIComponent('/' + path)}&w=${width}&fm=webp&q=${quality}`;
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
            })
            .catch(err => console.warn('Footer-Daten nicht verfügbar:', err));