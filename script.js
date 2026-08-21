// ===================================
// CONTENT LOADING FROM data.json
// ===================================
let WHATSAPP_PHONE = '';
let WHATSAPP_MESSAGE = '';

function renderContent(data) {
    document.title = data.site.title;
    document.getElementById('nav-brand').textContent = data.site.brand;

    const navLinks = document.getElementById('nav-links');
    data.nav.links.forEach(function (link) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.label;
        li.appendChild(a);
        navLinks.appendChild(li);
    });

    const heroVideo = document.getElementById('hero-video');
    const source = document.createElement('source');
    source.src = data.hero.video;
    source.type = 'video/mp4';
    heroVideo.appendChild(source);
    document.getElementById('hero-title').textContent = data.hero.title;
    document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
    document.getElementById('hero-tagline').textContent = data.hero.tagline;

    document.getElementById('about-heading').textContent = data.about.heading;
    document.getElementById('about-description').textContent = data.about.description;

    const featuresContainer = document.getElementById('features-container');
    data.about.features.forEach(function (feature) {
        const card = document.createElement('div');
        card.className = 'feature-card';
        card.innerHTML = '<h3>' + feature.icon + ' ' + feature.title + '</h3><p>' + feature.text + '</p>';
        featuresContainer.appendChild(card);
    });

    document.getElementById('services-heading').textContent = data.about.servicesHeading;
    const servicesList = document.getElementById('services-list');
    data.about.services.forEach(function (service) {
        const li = document.createElement('li');
        li.textContent = service;
        servicesList.appendChild(li);
    });

    document.getElementById('offerings-heading').textContent = data.offerings.heading;
    document.getElementById('offerings-intro').textContent = data.offerings.intro;
    const offeringPhoto = document.getElementById('offering-photo');
    offeringPhoto.src = data.offerings.image;
    offeringPhoto.alt = data.offerings.imageAlt;

    const columnsRow = document.getElementById('offerings-columns');
    data.offerings.columns.forEach(function (col) {
        const th = document.createElement('th');
        th.textContent = col;
        columnsRow.appendChild(th);
    });

    const tbody = document.getElementById('offerings-tbody');
    data.offerings.items.forEach(function (item) {
        const tr = document.createElement('tr');
        [item.name, item.description, item.price, item.details].forEach(function (val) {
            const td = document.createElement('td');
            td.textContent = val;
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });

    document.getElementById('offerings-note').innerHTML = '<strong>' + data.offerings.note.split(':')[0] + ':</strong>' + data.offerings.note.split(':').slice(1).join(':');

    document.getElementById('instagram-heading').textContent = data.instagram.heading;
    const instaIntro = document.getElementById('instagram-intro');
    instaIntro.textContent = data.instagram.introPrefix + ' ';
    const instaHandleLink = document.createElement('a');
    instaHandleLink.className = 'insta-handle';
    instaHandleLink.href = data.instagram.handleUrl;
    instaHandleLink.target = '_blank';
    instaHandleLink.rel = 'noopener';
    instaHandleLink.textContent = data.instagram.handle;
    instaIntro.appendChild(instaHandleLink);

    const instaGrid = document.getElementById('instagram-grid');
    data.instagram.posts.forEach(function (url) {
        const wrap = document.createElement('div');
        wrap.className = 'insta-embed-wrap';
        wrap.innerHTML = '<blockquote class="instagram-media" data-instgrm-permalink="' + url + '" data-instgrm-version="14">' +
            '<a href="' + url + '">View this reel on Instagram</a></blockquote>';
        instaGrid.appendChild(wrap);
    });

    const followLink = document.getElementById('instagram-follow-link');
    followLink.href = data.instagram.handleUrl;
    followLink.textContent = data.instagram.followText;

    document.getElementById('contact-heading').textContent = data.contact.heading;
    document.getElementById('contact-intro').textContent = data.contact.intro;
    document.getElementById('contact-person').innerHTML = '👤 <strong>' + data.contact.person + '</strong>';
    document.getElementById('contact-address').textContent = '📍 ' + data.contact.address;
    document.getElementById('contact-phone').innerHTML = '📱 Call/WhatsApp: <strong>' + data.contact.phone + '</strong>';
    document.getElementById('contact-email').innerHTML = '📧 Email: <strong>' + data.contact.email + '</strong>';
    document.getElementById('contact-note').textContent = data.contact.note;

    const socialLink = document.getElementById('contact-social-link');
    socialLink.href = data.contact.social.url;
    socialLink.textContent = data.contact.social.label;

    document.getElementById('footer-line1').textContent = data.footer.line1;
    document.getElementById('footer-line2').textContent = data.footer.line2;

    WHATSAPP_PHONE = data.contact.whatsappPhone;
    WHATSAPP_MESSAGE = data.contact.whatsappMessage;

    const floatingActions = document.getElementById('floating-actions');
    const waLink = document.createElement('a');
    waLink.className = 'fab-btn fab-whatsapp';
    waLink.href = 'https://wa.me/' + WHATSAPP_PHONE + '?text=' + encodeURIComponent(WHATSAPP_MESSAGE);
    waLink.target = '_blank';
    waLink.rel = 'noopener';
    waLink.setAttribute('aria-label', 'Chat on WhatsApp');
    waLink.title = 'Chat on WhatsApp';
    waLink.innerHTML = '💬';
    floatingActions.appendChild(waLink);

    const igLink = document.createElement('a');
    igLink.className = 'fab-btn fab-instagram';
    igLink.href = data.instagram.handleUrl;
    igLink.target = '_blank';
    igLink.rel = 'noopener';
    igLink.setAttribute('aria-label', 'Follow us on Instagram');
    igLink.title = 'Follow us on Instagram';
    igLink.innerHTML = '📸';
    floatingActions.appendChild(igLink);

    // Re-run scroll animations and load embed script after content injection
    document.querySelectorAll('.feature-card, tbody tr').forEach(function (el) {
        el.style.opacity = '0';
        observer.observe(el);
    });
    var instaScript = document.createElement('script');
    instaScript.async = true;
    instaScript.src = 'https://www.instagram.com/embed.js';
    document.body.appendChild(instaScript);
}

fetch('data.json')
    .then(function (res) { return res.json(); })
    .then(renderContent)
    .catch(function (err) { console.error('Failed to load data.json', err); });

// ===================================
// HAMBURGER MENU
// ===================================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
const navActions = document.querySelector('.nav-actions');

// ===================================
// BACKGROUND MUSIC — unified controller
// ===================================
(function () {
    var vid = document.querySelector('.hero-video');
    var btn = document.getElementById('sound-toggle');
    var enabled  = true;   // user preference (manual toggle)
    var started  = false;  // has audio been unmuted at least once?
    var mutedByReel = false; // was music muted because user clicked a reel?

    /* ---------- helpers ---------- */
    function updateBtn() {
        if (!btn) return;
        btn.textContent = enabled ? '\uD83C\uDFB5' : '\uD83D\uDD07';
        btn.title       = enabled ? 'Disable music' : 'Enable music';
        btn.setAttribute('aria-label', enabled ? 'Disable background music' : 'Enable background music');
        btn.classList.toggle('muted',   !enabled);
        btn.classList.toggle('playing',  enabled && started);
    }

    function unmute() {
        if (!vid) return;
        vid.volume = 0.35;
        vid.muted  = false;
        if (vid.paused) vid.play().catch(function () {});
        started = true;
        updateBtn();
    }

    function muteForReel() {
        if (!vid || vid.muted) return;
        vid.muted    = true;
        mutedByReel  = true;
        enabled      = false;
        updateBtn();
    }

    function resumeFromReel() {
        if (!mutedByReel) return;
        mutedByReel = false;
        enabled     = true;
        unmute();
    }

    /* ---------- manual toggle button ---------- */
    if (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            mutedByReel = false;          // manual action overrides reel flag
            enabled = !enabled;
            if (vid) {
                if (enabled) { unmute(); }
                else { vid.muted = true; updateBtn(); }
            }
        });
    }

    /* ---------- start music on first real interaction ---------- */
    // Covers: clicks anywhere on the page, touch events
    function onFirstInteract() {
        if (enabled && !started) unmute();
        document.removeEventListener('click',      onFirstInteract);
        document.removeEventListener('touchstart', onFirstInteract);
    }
    document.addEventListener('click',      onFirstInteract);
    document.addEventListener('touchstart', onFirstInteract);

    /* ---------- reel clicked → mute (window loses focus to iframe) ---------- */
    window.addEventListener('blur', function () {
        // Only mute when the Instagram section is on-screen
        var sec = document.getElementById('instagram');
        if (sec) {
            var r = sec.getBoundingClientRect();
            if (r.top >= window.innerHeight || r.bottom <= 0) return;
        }
        muteForReel();
    });

    /* ---------- window / tab regains focus ---------- */
    function onReturn() {
        if (mutedByReel) {
            resumeFromReel();          // auto-resume after reel
        } else if (enabled && !started) {
            unmute();                  // first-ever start (user clicked iframe first)
        }
    }
    window.addEventListener('focus', onReturn);
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'visible') onReturn();
    });

    /* ---------- init ---------- */
    updateBtn();
}());

if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', isOpen);
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when a nav link is clicked (links are added dynamically, so delegate)
    navLinks.addEventListener('click', function (e) {
        if (e.target.tagName === 'A') {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking outside (but not on nav-actions)
    document.addEventListener('click', function (e) {
        if (
            !hamburger.contains(e.target) &&
            !navLinks.contains(e.target) &&
            !(navActions && navActions.contains(e.target))
        ) {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ===================================
// MOBILE DETECTION & OPTIMIZATION
// ===================================
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimize for mobile devices
if (isMobileDevice()) {
    document.documentElement.style.fontSize = '14px';
}

// ===================================
// Function to open WhatsApp chat
// ===================================
function openWhatsApp() {
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
}

// ===================================
// Smooth scrolling for navigation links
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// Add animation on scroll
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, observerOptions);

// Observe feature cards and table for animation
document.querySelectorAll('.feature-card, tbody tr').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// CSS Animation (added dynamically)
// ===================================
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Highlight active navigation link
// ===================================
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Add active link styling
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-links a.active {
        color: var(--primary-color) !important;
        border-bottom: 2px solid var(--primary-color);
        padding-bottom: 0.3rem;
    }
`;
document.head.appendChild(activeStyle);

console.log('✨ Ganga Aarti Varanasi Website Loaded Successfully!');
