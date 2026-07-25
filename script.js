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

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
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
const WHATSAPP_PHONE = '918957704643';
const WHATSAPP_MESSAGE = 'Hello, I am interested in booking for the Ganga Aarti Varanasi ceremony. Please let me know about the available packages and dates.';

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
