const navbar = document.getElementById('navbar');
const topBar = document.getElementById('topBar');
let lastScroll = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    topBar.classList.toggle('nav-hidden', currentScroll > lastScroll && currentScroll > 80);

    navbar.classList.toggle('scrolled', currentScroll > 20);

    lastScroll = currentScroll;
}, { passive: true });

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
const mobileClose = document.getElementById('mobile-close');
hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

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

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function downloadFile(url, suggestedName) {
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

fetch('data/downloads.json')
    .then(res => { if (!res.ok) throw new Error('downloads.json not found'); return res.json(); })
    .then(data => {
        const grid = document.getElementById('download-grid');
        data.cards.forEach((card, i) => {
            const div = document.createElement('div');
            div.className = 'download-card reveal' + (i > 0 ? ' reveal-delay-' + Math.min(i, 3) : '');
            div.innerHTML = `
                <div class="download-icon">
                    <svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                    </svg>
                </div>
                <div class="download-title"></div>
                <p class="download-desc"></p>
                <button class="download-btn" aria-label="Datei herunterladen">
                    <svg fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"/>
                    </svg>
                    <span class="download-btn-text">Datei herunterladen</span>
                </button>`;
            div.querySelector('.download-title').textContent = card.title;
            div.querySelector('.download-desc').textContent = card.description;
            div.querySelector('.download-btn').addEventListener('click', () => downloadFile(card.file, card.filename));
            grid.appendChild(div);
            revealObserver.observe(div);
        });
    })
    .catch(err => console.warn('Downloads nicht verfügbar:', err));



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