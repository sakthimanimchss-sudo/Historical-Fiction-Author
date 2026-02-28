/**
 * BLOG PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles category filtering, animations, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const newsletterForm = document.querySelector('.newsletter-form');
    const pageLinks = document.querySelectorAll('.page-link');
    const featuredPost = document.querySelector('.featured-grid');
    
    // ==========================================================================
    // 2. CATEGORY FILTER FUNCTIONALITY
    // ==========================================================================
    /**
     * Filters blog posts by category
     * Features:
     * - Toggle active class on buttons
     * - Show/hide blog cards with animation
     * - Maintains filter state
     */
    
    if (categoryBtns.length > 0) {
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                
                // Filter blog cards
                blogCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Add animation
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                // Show notification
                showFilterNotification(category);
            });
        });
    }
    
    /**
     * Shows notification when filter changes
     * @param {string} category - Selected category
     */
    function showFilterNotification(category) {
        const categoryNames = {
            'all': 'All Posts',
            'writing': 'Writing Life',
            'research': 'Research Stories',
            'history': 'History Deep Dive',
            'events': 'Events & News'
        };
        
        const count = Array.from(blogCards).filter(
            card => category === 'all' || card.getAttribute('data-category') === category
        ).length;
        
        showNotification(`Showing ${count} posts in ${categoryNames[category]}`, 'info');
    }
    
    // ==========================================================================
    // 3. ANIMATE BLOG CARDS ON SCROLL
    // ==========================================================================
    /**
     * Uses Intersection Observer to animate blog cards as they scroll into view
     * Features:
     * - Staggered animation
     * - Triggers when card is 20% visible
     */
    
    if (blogCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    
                    // Unobserve after animation
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        blogCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
    
    // ==========================================================================
    // 4. FEATURED POST ANIMATION
    // ==========================================================================
    
    if (featuredPost) {
        const featuredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    featuredObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        featuredPost.style.opacity = '0';
        featuredPost.style.transform = 'translateY(30px)';
        featuredPost.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        featuredObserver.observe(featuredPost);
    }
    
    // ==========================================================================
    // 5. NEWSLETTER FORM SUBMISSION
    // ==========================================================================
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing to the blog!', 'success');
                emailInput.value = '';
                
                // Track subscription (analytics)
                trackNewsletterSignup(email);
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    /**
     * Validates email format
     * @param {string} email - Email to validate
     * @returns {boolean} - True if valid
     */
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    /**
     * Tracks newsletter signup (analytics placeholder)
     * @param {string} email - Subscriber email
     */
    function trackNewsletterSignup(email) {
        // In production, this would send to analytics
        console.log('Newsletter signup:', email);
    }
    
    // ==========================================================================
    // 6. PAGINATION HANDLING
    // ==========================================================================
    
    if (pageLinks.length > 0) {
        pageLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only prevent default if it's a placeholder link
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    
                    // Simulate page change
                    showNotification('Loading more posts...', 'info');
                    
                    // In production, this would load the next page
                    setTimeout(() => {
                        showNotification('Page loaded!', 'success');
                    }, 1000);
                }
            });
        });
    }
    
    // ==========================================================================
    // 7. HOVER EFFECTS FOR BLOG CARDS
    // ==========================================================================
    
    blogCards.forEach(card => {
        const image = card.querySelector('.card-image img');
        const category = card.querySelector('.card-category');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1) rotate(1deg)';
            }
            if (category) {
                category.style.backgroundColor = 'var(--accent-primary)';
                category.style.transition = 'background-color 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1) rotate(0)';
            }
            if (category) {
                category.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
            }
        });
    });
    
    // ==========================================================================
    // 8. POST STATS INTERACTION
    // ==========================================================================
    
    const likeButtons = document.querySelectorAll('.post-stats i.fa-heart');
    
    likeButtons.forEach(like => {
        like.addEventListener('click', function(e) {
            e.preventDefault();
            
            const countSpan = this.parentElement;
            let count = parseInt(countSpan.textContent);
            
            if (this.style.color === 'rgb(184, 92, 58)') {
                // Unlike
                this.style.color = '';
                count--;
                showNotification('Post unliked', 'info');
            } else {
                // Like
                this.style.color = 'var(--accent-primary)';
                this.style.transform = 'scale(1.2)';
                count++;
                showNotification('Post liked!', 'success');
                
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
            
            countSpan.textContent = ` ${count} Likes`;
        });
    });
    
    // ==========================================================================
    // 9. NOTIFICATION SYSTEM
    // ==========================================================================
    
    /**
     * Displays temporary notifications to users
     * @param {string} message - The message to display
     * @param {string} type - The type of notification (success, error, info)
     */
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.blog-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `blog-notification notification-${type}`;
        
        // Set icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1rem;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid white;
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 4 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    // ==========================================================================
    // 10. ADD ANIMATION STYLES
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
    // 11. PARALLAX EFFECT FOR PAGE HEADER
    // ==========================================================================
    
    const pageHeader = document.querySelector('.page-header');
    
    if (pageHeader && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < pageHeader.offsetHeight) {
                const speed = 0.3;
                pageHeader.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    }
    
    // ==========================================================================
    // 12. ACTIVE CATEGORY FROM URL HASH
    // ==========================================================================
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        const matchingBtn = document.querySelector(`[data-category="${hash}"]`);
        if (matchingBtn) {
            matchingBtn.click();
        }
    }
    
    // ==========================================================================
    // 13. KEYBOARD NAVIGATION FOR CATEGORY BUTTONS
    // ==========================================================================
    
    categoryBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextBtn = categoryBtns[index + 1];
                if (nextBtn) {
                    nextBtn.focus();
                    nextBtn.click();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevBtn = categoryBtns[index - 1];
                if (prevBtn) {
                    prevBtn.focus();
                    prevBtn.click();
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                const firstBtn = categoryBtns[0];
                firstBtn.focus();
                firstBtn.click();
            } else if (e.key === 'End') {
                e.preventDefault();
                const lastBtn = categoryBtns[categoryBtns.length - 1];
                lastBtn.focus();
                lastBtn.click();
            }
        });
    });
    
    // ==========================================================================
    // 14. TOUCH DEVICE SUPPORT
    // ==========================================================================
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        blogCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                const image = this.querySelector('.card-image img');
                if (image) {
                    image.style.transform = 'scale(1.05)';
                }
            });
            
            card.addEventListener('touchend', function() {
                const image = this.querySelector('.card-image img');
                if (image) {
                    setTimeout(() => {
                        image.style.transform = 'scale(1)';
                    }, 300);
                }
            });
        });
    }
    
    // ==========================================================================
    // 15. INFINITE SCROLL SIMULATION (Optional)
    // ==========================================================================
    
    let page = 1;
    const loadingTrigger = document.querySelector('.pagination-section');
    
    if (loadingTrigger && window.innerWidth > 768) {
        const infiniteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && page < 5) {
                    page++;
                    // In production, this would load more posts
                    console.log(`Loading page ${page}`);
                }
            });
        }, { threshold: 0.5 });
        
        infiniteObserver.observe(loadingTrigger);
    }
    
    // ==========================================================================
    // 16. READ TIME ESTIMATOR
    // ==========================================================================
    
    blogCards.forEach(card => {
        const excerpt = card.querySelector('.post-excerpt');
        if (excerpt) {
            const text = excerpt.textContent;
            const wordCount = text.split(/\s+/).length;
            const readTime = Math.ceil(wordCount / 200); // 200 words per minute
            
            // Add read time to meta (optional)
            const meta = card.querySelector('.post-meta');
            if (meta && !card.querySelector('.read-time')) {
                const readTimeSpan = document.createElement('span');
                readTimeSpan.className = 'read-time';
                readTimeSpan.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
                readTimeSpan.style.cssText = `
                    color: var(--text-secondary);
                    font-size: 0.9rem;
                    margin-left: 0.5rem;
                `;
                meta.appendChild(readTimeSpan);
            }
        }
    });
});
