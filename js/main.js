document.addEventListener('DOMContentLoaded', function() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Header scroll effect
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    function syncMenuAria() {
        if (hamburger && navLinks) {
            hamburger.setAttribute('aria-expanded', String(navLinks.classList.contains('active')));
        }
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            syncMenuAria();
        });

        hamburger.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                hamburger.click();
            }
        });
    }

    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links li a');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks && hamburger && navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
                syncMenuAria();
            }
        });
    });

    // FAQ toggle
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.toggle-icon i');

        if (!question || !answer || !icon) {
            return;
        }

        question.addEventListener('click', function() {
            const isOpen = item.classList.contains('active');

            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const faqAnswer = faq.querySelector('.faq-answer');
                const faqIcon = faq.querySelector('.toggle-icon i');
                if (faqAnswer) {
                    faqAnswer.style.display = 'none';
                }
                if (faqIcon) {
                    faqIcon.className = 'fas fa-plus';
                }
            });

            if (!isOpen) {
                item.classList.add('active');
                answer.style.display = 'block';
                icon.className = 'fas fa-minus';
            }
        });
    });
    
    // Scroll animation for elements
    function checkScroll() {
        const elements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-up');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    }
    
    // Initial check
    checkScroll();
    
    // Check on scroll
    window.addEventListener('scroll', checkScroll);
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: prefersReducedMotion ? 'auto' : 'smooth'
                });
            }
        });
    });
});