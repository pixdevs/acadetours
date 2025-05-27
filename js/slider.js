document.addEventListener('DOMContentLoaded', function() {
    // Testimonial slider
    const slides = document.querySelectorAll('.story-slide');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.style.display = 'none';
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        slides[n].style.display = 'block';
        dots[n].classList.add('active');
    }
    
    // Initialize slider
    if (slides.length > 0) {
        showSlide(currentSlide);
        
        // Add click event to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
        
        // Auto advance slides
        setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }
});