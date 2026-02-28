/**
 * AWARDS PAGE JAVASCRIPT
 * Eleanor Hartwell - Awards & Recognition
 * Handles counter animations, timeline effects, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const seriesCards = document.querySelectorAll('.series-card');
    const pressCards = document.querySelectorAll('.press-card');
    const membershipCards = document.querySelectorAll('.membership-card');
    
    // ==========================================================================
    // 2. COUNTER ANIMATION FOR STATS
    // ==========================================================================
    /**
     * Animates counting up for statistics
     * Features:
     * - Intersection Observer triggers animation
     * - Counts from 0 to target value
     * - Preserves original text formatting
     */
    
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.getAttribute('data-target'));
                    const suffix = stat.textContent.includes('+') ? '+' : '';
                    
                    if (!stat.classList.contains('counted')) {
                        let current = 0;
                        const increment = Math.ceil(target / 50);
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= target) {
                                stat.textContent = target + suffix;
                                clearInterval(timer);
                            } else {
                                stat.textContent = current + suffix;
                            }
                        }, 30);
                        
                        stat.classList.add('counted');
                    }
                    
                    statObserver.unobserve(stat);
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    // ==========================================================================
    // 3. TIMELINE ANIMATIONS
    // ==========================================================================
    /**
     * Animates timeline items as they scroll into view
     * Features:
     * - Staggered fade-in animation
     * - Responsive to scroll position
     */
    
    if (timelineItems.length > 0) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
    
    // ==========================================================================
    // 4. HOVER EFFECTS FOR SERIES CARDS
    // ==========================================================================
    /**
     * Adds interactive hover effects to series award cards
     */
    
    seriesCards.forEach(card => {
        const awards = card.querySelectorAll('.series-award-item');
        
        card.addEventListener('mouseenter', function() {
            awards.forEach((award, index) => {
                setTimeout(() => {
                    award.style.transform = 'translateX(10px)';
                    award.style.backgroundColor = 'rgba(230, 184, 156, 0.1)';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            awards.forEach(award => {
                award.style.transform = '';
                award.style.backgroundColor = '';
            });
        });
    });
    
    // ==========================================================================
    // 5. PRESS CARD INTERACTIONS
    // ==========================================================================
    /**
     * Adds subtle hover effects to press cards
     */
    
    pressCards.forEach(card => {
        const quoteIcon = card.querySelector('.press-quote i');
        
        card.addEventListener('mouseenter', function() {
            if (quoteIcon) {
                quoteIcon.style.opacity = '0.4';
                quoteIcon.style.transform = 'scale(1.1)';
                quoteIcon.style.transition = 'all 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (quoteIcon) {
                quoteIcon.style.opacity = '0.2';
                quoteIcon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ==========================================================================
    // 6. MEMBERSHIP CARD ICON ANIMATION
    // ==========================================================================
    /**
     * Adds icon rotation on hover
     */
    
    membershipCards.forEach(card => {
        const icon = card.querySelector('i');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // ==========================================================================
    // 7. FEATURED AWARD PARALLAX
    // ==========================================================================
    /**
     * Creates subtle parallax effect on featured award image
     */
    
    const featuredImage = document.querySelector('.featured-image');
    const featuredGrid = document.querySelector('.featured-grid');
    
    if (featuredImage && featuredGrid && window.innerWidth > 768) {
        featuredGrid.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const moveX = (x - centerX) / 20;
            const moveY = (y - centerY) / 20;
            
            featuredImage.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        featuredGrid.addEventListener('mouseleave', function() {
            featuredImage.style.transform = 'translate(0, 0)';
        });
    }
    
    // ==========================================================================
    // 8. YEAR BADGE PULSE ANIMATION
    // ==========================================================================
    /**
     * Adds continuous pulse animation to featured year badge
     */
    
    const featuredYear = document.querySelector('.featured-year');
    if (featuredYear) {
        setInterval(() => {
            featuredYear.style.transform = 'scale(1.05)';
            setTimeout(() => {
                featuredYear.style.transform = 'scale(1)';
            }, 300);
        }, 3000);
    }
    

    
    // ==========================================================================
    // 10. TOUCH DEVICE SUPPORT
    // ==========================================================================
    /**
     * Detects touch devices and simplifies hover effects
     */
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        const hoverElements = document.querySelectorAll('.stat-card, .series-card, .press-card, .membership-card');
        hoverElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
    }
    
    // ==========================================================================
    // 11. NOTIFICATION SYSTEM (for potential interactions)
    // ==========================================================================
    
    /**
     * Shows a temporary notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, info, error)
     */
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = 'awards-notification';
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Cormorant Garamond', serif;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // ==========================================================================
    // 12. ADD ANIMATION STYLES
    // ==========================================================================
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================================================
    // 13. ACTIVE STATE FOR TIMELINE YEARS
    // ==========================================================================
    /**
     * Highlights the current year based on scroll position
     */
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY + 200;
        
        timelineItems.forEach(item => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;
            const yearElement = item.querySelector('.timeline-year');
            
            if (scrollPosition >= itemTop && scrollPosition < itemBottom) {
                yearElement.style.transform = 'scale(1.1)';
                yearElement.style.boxShadow = '0 5px 20px rgba(230, 184, 156, 0.5)';
            } else {
                yearElement.style.transform = '';
                yearElement.style.boxShadow = '';
            }
        });
    });
    
    // ==========================================================================
    // 14. LAZY LOADING FOR IMAGES
    // ==========================================================================
    
    const images = document.querySelectorAll('.featured-image img, .press-card img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    img.style.transition = 'opacity 0.5s ease';
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            img.style.opacity = '0';
            imageObserver.observe(img);
        });
    }
    
    // ==========================================================================
    // 15. KEYBOARD NAVIGATION FOR CARDS
    // ==========================================================================
    /**
     * Allows keyboard navigation through award cards
     */
    
    const focusableCards = [...seriesCards, ...pressCards, ...membershipCards];
    
    focusableCards.forEach((card, index) => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.series-link');
                if (link) {
                    link.click();
                }
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextCard = focusableCards[index + 1];
                if (nextCard) {
                    nextCard.focus();
                }
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevCard = focusableCards[index - 1];
                if (prevCard) {
                    prevCard.focus();
                }
            }
        });
    });
});

