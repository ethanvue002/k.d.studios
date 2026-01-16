// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const menuOverlay = document.getElementById('menuOverlay');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    menuOverlay.classList.toggle('active');
}

hamburger.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (!link.hasAttribute('target')) {
            toggleMenu();
        }
    });
});

// 3D logo tilt effect on mouse move
const logo = document.getElementById('logo-img');
const logoContainer = document.querySelector('.logo-container');

logoContainer.addEventListener('mousemove', (e) => {
    const rect = logoContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    logo.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
});

logoContainer.addEventListener('mouseleave', () => {
    logo.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.section-title, .service-card, .client-logo, .video-container, .team-member, .motto-description').forEach(el => {
    observer.observe(el);
});SS

// Form submission handler
function handleSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    e.target.reset();
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Auto-play videos immediately on page load
document.querySelectorAll('.video-container').forEach(container => {
    const video = container.querySelector('video');
    if (video) {
        // Try to play immediately
        video.play().catch(err => {
            console.log('Autoplay failed, trying again on user interaction:', err);
            // If autoplay fails, try again on first user interaction
            document.addEventListener('click', () => {
                video.play().catch(e => console.log('Still failed:', e));
            }, { once: true });
        });
        
        // Also try to play when video becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play().catch(err => console.log('Video play failed:', err));
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(container);
        
        // Ensure video keeps playing
        video.addEventListener('pause', () => {
            if (!video.ended) {
                video.play().catch(err => console.log('Resume failed:', err));
            }
        });
    }
});