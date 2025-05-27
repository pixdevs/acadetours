document.addEventListener('DOMContentLoaded', function() {
    // Contact form validation and handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const formElements = contactForm.elements;
            
            for (let i = 0; i < formElements.length; i++) {
                const element = formElements[i];
                
                if (element.hasAttribute('required') && element.value.trim() === '') {
                    isValid = false;
                    element.classList.add('error');
                } else {
                    element.classList.remove('error');
                }
                
                // Email validation
                if (element.type === 'email' && element.value.trim() !== '') {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(element.value)) {
                        isValid = false;
                        element.classList.add('error');
                    }
                }
            }
            
            if (isValid) {
                // Form submission success - in a real site, this would send the data to a server
                // For now, we'll just show a success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your message! We will get back to you soon.';
                
                // Display the message after the form
                contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
                
                // Reset the form
                contactForm.reset();
                
                // Remove the message after a few seconds
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 5000);
            } else {
                // Scroll to the first error
                const firstError = contactForm.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstError.focus();
                }
            }
        });
        
        // Remove error class on input
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.trim() !== '') {
                    this.classList.remove('error');
                }
            });
        });
    }
});

// Add CSS styles for form validation
document.head.insertAdjacentHTML('beforeend', `
<style>
.error {
    border-color: #f44336 !important;
    box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
}

.success-message {
    background-color: #E8F5E9;
    color: #2E7D32;
    padding: 15px;
    border-radius: 8px;
    margin-top: 20px;
    display: flex;
    align-items: center;
    transition: opacity 0.5s ease;
}

.success-message i {
    font-size: 1.5rem;
    margin-right: 10px;
}
</style>
`);