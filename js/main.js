document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            menuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Prevent scrolling on body when menu is open
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Cookie Consent Banner (GDPR) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    const rejectBtn = document.getElementById('reject-cookies');

    // Check if consent is already given
    if (!localStorage.getItem('pozolana_cookie_consent')) {
        // Show banner after a slight delay
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    const hideBannerAndSave = (consentType) => {
        cookieBanner.classList.remove('show');
        localStorage.setItem('pozolana_cookie_consent', consentType);
    };

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            hideBannerAndSave('all');
            // Logic to enable analytics/marketing cookies would go here
        });
    }

    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            hideBannerAndSave('essential');
            // Ensure non-essential cookies are not set
        });
    }

    // --- Form Submission ---
    // Let the form submit natively to FormSubmit.co
    // The redirect and captcha are handled by FormSubmit hidden fields.
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', () => {
            // Optional: You could show a loading state on the button here
            const btn = contactForm.querySelector('button[type="submit"]');
            if(btn) {
                btn.innerHTML = 'A enviar... <span style="font-size: 12px">⏳</span>';
                btn.style.opacity = '0.8';
            }
        });
    }

    // --- Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };
    
    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before it hits the bottom
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

});
