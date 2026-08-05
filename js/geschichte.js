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

        fetch('data/geschichte.json')
            .then(res => { if (!res.ok) throw new Error('geschichte.json not found'); return res.json(); })
            .then(data => {
                const applyImg = (id, path, eager) => {
                    const img = document.getElementById(id);
                    img.src = netlifyImg(path, 1200);
                    img.srcset = netlifySrcset(path, [480, 800, 1200, 1600]);
                    img.sizes = '(min-width: 1024px) 58vw, 100vw';
                    img.loading = eager ? 'eager' : 'lazy';
                    img.fetchPriority = eager ? 'high' : 'low';
                    img.decoding = eager ? 'sync' : 'async';
                };
                applyImg('img-gruendung', data.gruendung, true);
                applyImg('img-aufstieg', data.aufstieg, false);
                applyImg('img-heute', data.heute, false);
            })
            .catch(err => console.warn('Geschichte-Fotos nicht verfügbar:', err));

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

        function netlifySrcset(path, widths, quality = 85) {
            if (!path || path.endsWith('.svg')) return '';
            return widths.map(w => `${netlifyImg(path, w, quality)} ${w}w`).join(', ');
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