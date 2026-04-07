document.addEventListener('DOMContentLoaded', function() {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -8% 0px',
        threshold: 0.15
    };
    
    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class when element is in viewport
                entry.target.classList.add('animate');
                // Unobserve after animation starts
                observer.unobserve(entry.target);
            }
        });
    };
    
    const animatedElements = document.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right, .zoom-in');

    animatedElements.forEach(element => {
        const inlineDelay = element.style.animationDelay;
        if (inlineDelay) {
            element.style.setProperty('--stagger-delay', inlineDelay);
            element.style.animationDelay = '';
        }
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
        animatedElements.forEach(element => element.classList.add('animate'));
    } else {
        const observer = new IntersectionObserver(handleIntersect, observerOptions);
        animatedElements.forEach(element => observer.observe(element));
    }
    
    // Animate header on page load
    const header = document.getElementById('header');
    if (header) {
        setTimeout(() => {
            header.classList.add('loaded');
        }, 100);
    }
    
    // Ripple effect for buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Parallax effect for hero section
    const hero = document.getElementById('hero');

    if (hero && !reduceMotion) {
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (ticking) {
                return;
            }

            window.requestAnimationFrame(() => {
                const scrollPosition = Math.max(window.scrollY, 0);
                hero.style.backgroundPositionY = `${scrollPosition * 0.35}px`;
                ticking = false;
            });

            ticking = true;
        }, { passive: true });
    }
});