// Home2 Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Tab functionality for featured work
    const tabBtns = document.querySelectorAll('.tab-btn');
    const workContents = document.querySelectorAll('.work-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                workContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const series = this.getAttribute('data-series');
                const targetContent = document.getElementById(series);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
    }
    
    // Testimonials slider dots
    const dots = document.querySelectorAll('.dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (dots.length > 0 && testimonialCards.length > 0) {
        // Show first testimonial by default (already visible from CSS)
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));
                
                // Add active class to clicked dot
                this.classList.add('active');
                
                // Hide all testimonials and show the selected one
                testimonialCards.forEach((card, i) => {
                    if (i === index) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.6s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Smooth scroll for scroll indicator
    const scrollLink = document.querySelector('.scroll-down');
    if (scrollLink) {
        scrollLink.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-simple-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim()) {
                alert('Thank you for subscribing! You will receive a confirmation email shortly.');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Hover animations for journey cards
    const journeyCards = document.querySelectorAll('.journey-card');
    journeyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.journey-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'transform 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.journey-icon i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
});