/* GeneSense Interactive Animations */

// Smooth scroll reveal animations
document.addEventListener('DOMContentLoaded', function() {
    // Add staggered animation to article cards on homepage
    const cards = document.querySelectorAll('.article-card, .case-study-block, .reference-item');

    cards.forEach((card, index) => {
        card.style.setProperty('--delay', `${index * 0.1}s`);
        card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s both`;
    });

    // Add hover glow effect to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(30, 90, 150, 0.3)';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
        });
    });

    // Animate headings on scroll
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        heading.style.animation = 'fadeIn 0.8s ease-out';
    });

    // Add floating animation to sidebar boxes
    const sidebarBoxes = document.querySelectorAll('.sidebar-box');
    sidebarBoxes.forEach((box, index) => {
        box.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });

    // Link hover effects
    const links = document.querySelectorAll('a:not(.nav-link)');
    links.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.color = '#2D7A4A';
            this.style.transform = 'translateX(4px)';
        });
        link.addEventListener('mouseleave', function() {
            this.style.color = '#1E5A96';
            this.style.transform = 'translateX(0)';
        });
    });

    // Image placeholder fade-in animation
    const images = document.querySelectorAll('.image-placeholder, .featured-image');
    images.forEach(img => {
        img.style.animation = 'fadeIn 0.8s ease-out 0.3s both';
    });

    // Staggered list animation
    const listItems = document.querySelectorAll('li');
    listItems.forEach((item, index) => {
        item.style.animation = `slideInLeft 0.5s ease-out ${index * 0.08}s both`;
    });

    // Add pulse effect to key call-to-action buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 1.5s ease-in-out infinite';
        });
        btn.addEventListener('mouseleave', function() {
            this.style.animation = 'none';
        });
    });

    // Smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Fade in sections on page load
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        section.style.animation = `fadeIn 0.8s ease-out ${index * 0.15}s both`;
    });

    // Add interactive feedback to form-like elements
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.transition = 'all 0.3s ease';
            this.style.boxShadow = '0 0 0 3px rgba(30, 90, 150, 0.1)';
            this.style.borderColor = '#1E5A96';
        });
        input.addEventListener('blur', function() {
            this.style.boxShadow = 'none';
            this.style.borderColor = '#E8E8E8';
        });
    });

    // Lazy load effect for content sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // Observe article content sections
    document.querySelectorAll('article, .article-body, .reference-item').forEach(el => {
        observer.observe(el);
    });

    // Counter animation for statistics (if any)
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 50);
    });

    console.log('GeneSense animations initialized ✓');
});

// Add animation delay CSS variable support
const style = document.createElement('style');
style.innerHTML = `
    @supports (animation-delay: var(--delay)) {
        * {
            animation-delay: var(--delay, 0s);
        }
    }
`;
document.head.appendChild(style);
