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
