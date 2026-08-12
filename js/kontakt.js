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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();

const privacyCheck = document.getElementById('privacy-check');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('contact-form');

privacyCheck.addEventListener('change', function () {
    submitBtn.disabled = !this.checked;
});

const recaptchaWrap = document.getElementById('recaptcha-wrap');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    if (!recaptchaWrap.classList.contains('visible')) {
        recaptchaWrap.classList.add('visible');
        recaptchaWrap.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    if (typeof grecaptcha === 'undefined' || !grecaptcha.getResponse().length) {
        alert('Bitte bestätige das reCAPTCHA, bevor du das Formular absendest.');
        return;
    }

    const fileInput = form.querySelector('#anhang');

    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const allowedExt = ['.pdf', '.jpg', '.jpeg', '.png', '.docx'];
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
        const maxSize = 3 * 1024 * 1024;
        const ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExt.includes(ext) || !allowedTypes.includes(file.type)) {
            alert('Dateityp nicht erlaubt. Bitte nur PDF, JPG, PNG oder DOCX hochladen.');
            return;
        }
        if (file.size > maxSize) {
            alert('Die Datei ist zu groß (max. 3 MB).');
            return;
        }
    }

    const formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" style="animation:spin 1s linear infinite"><path stroke-linecap="round" stroke-linejoin="round" d="M4 12a8 8 0 018-8v8H4z"/></svg> Wird gesendet…`;

    fetch('/', { method: 'POST', body: formData })
        .then(res => { if (!res.ok) throw new Error('rejected'); })
        .then(() => {
            submitBtn.innerHTML = `✓ Erfolgreich gesendet`;
            submitBtn.style.background = '#166534';
            form.reset();
            setTimeout(() => {
                submitBtn.innerHTML = `Nachricht<br class="force-break"> absenden`;
                submitBtn.style.background = '';
                submitBtn.disabled = true;
            }, 4000);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Es gab ein Problem beim Senden der Anfrage.');
            submitBtn.disabled = false;
        });
});

fetch('data/kontakt.json')
    .then(res => { if (!res.ok) throw new Error('kontakt.json not found'); return res.json(); })
    .then(data => {
        const anschrift = document.getElementById('anschrift-text');
        anschrift.replaceChildren();
        [data.anschrift_name, data.strasse, data.plz_ort].forEach((line, index) => {
            if (index > 0) {
                anschrift.appendChild(document.createElement('br'));
            }
            anschrift.appendChild(document.createTextNode(line || ''));
        });
        const emailLink = document.getElementById('email-link');
        emailLink.href = 'mailto:' + data.email;
        emailLink.textContent = data.email;
    })
    .catch(err => console.warn('Kontaktdaten nicht verfügbar:', err));

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