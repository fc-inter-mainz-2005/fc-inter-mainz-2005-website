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

        const privacyCheck = document.getElementById('privacy-check');
        const submitBtn = document.getElementById('submit-btn');
        const form = document.getElementById('contact-form');

        privacyCheck.addEventListener('change', function () {
            submitBtn.disabled = !this.checked;
        });

        const vereinWrap = document.getElementById('verein-name-wrap');
        const vereinInput = document.getElementById('verein_name');
        const anderVereinRadios = document.querySelectorAll('input[name="anderer_verein"]');

        function toggleVereinField() {
            const jaChecked = document.getElementById('anderer_verein_ja').checked;
            if (jaChecked) {
                vereinWrap.style.display = 'block';
                vereinInput.setAttribute('required', 'required');
            } else {
                vereinWrap.style.display = 'none';
                vereinInput.removeAttribute('required');
                vereinInput.value = '';
            }
        }

        anderVereinRadios.forEach(radio => {
            radio.addEventListener('change', toggleVereinField);
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

            const formData = new FormData(form);
            submitBtn.disabled = true;
            submitBtn.innerHTML = `Wird gesendet…`;

            fetch('/', { method: 'POST', body: formData })
                .then(res => { if (!res.ok) throw new Error('rejected'); })
                .then(() => {
                    submitBtn.innerHTML = `✓ Erfolgreich gesendet`;
                    submitBtn.style.background = '#166534';
                    form.reset();
                    setTimeout(() => {
                        submitBtn.innerHTML = `Anfrage senden`;
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


        fetch('data/probetraining.json')
            .then(res => res.json())
            .then(data => {
                const box = document.getElementById('hinweis-box');
                if (!data.show_hinweis || !data.hinweis_text) {
                    box.style.display = 'none';
                } else {
                    document.getElementById('hinweis-text').textContent = data.hinweis_text;
                }
            });

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