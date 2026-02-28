/**
 * TIMELINES PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles era selector, timeline animations, hover effects, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const eraBtns = document.querySelectorAll('.era-btn');
    const timelineSections = {
        viking: document.getElementById('viking-timeline'),
        tudor: document.getElementById('tudor-timeline'),
        roman: document.getElementById('roman-timeline')
    };
    const timelineItems = document.querySelectorAll('.timeline-item');
    const pageHeader = document.querySelector('.page-header');
    const tags = document.querySelectorAll('.timeline-tag');
    
    // ==========================================================================
    // 2. ERA SELECTOR FUNCTIONALITY
    // ==========================================================================
    /**
     * Handles clicking on era buttons to switch between timeline sections
     * Features:
     * - Toggles active class on buttons
     * - Shows/hides corresponding timeline sections
     * - Resets animations for newly visible section
     */
    
    if (eraBtns.length > 0) {
        eraBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                eraBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Hide all timeline sections
                Object.values(timelineSections).forEach(section => {
                    if (section) {
                        section.classList.remove('active');
                    }
                });
                
                // Show selected timeline
                const era = this.getAttribute('data-era');
                if (timelineSections[era]) {
                    timelineSections[era].classList.add('active');
                    
                    // Reset animations for timeline items in the new section
                    resetTimelineAnimations(timelineSections[era]);
                }
                
                // Update URL hash for direct linking (without page jump)
                history.pushState(null, null, `#${era}`);
            });
        });
    }
    
    /**
     * Resets and triggers animations for timeline items in a section
     * @param {HTMLElement} section - The timeline section element
     */
    function resetTimelineAnimations(section) {
        const items = section.querySelectorAll('.timeline-item');
        items.forEach((item, index) => {
            item.classList.remove('visible');
            setTimeout(() => {
                item.classList.add('visible');
            }, index * 150);
        });
    }
    
    // ==========================================================================
    // 3. SCROLL ANIMATIONS FOR TIMELINE ITEMS
    // ==========================================================================
    /**
     * Uses Intersection Observer to animate timeline items as they scroll into view
     * Features:
     * - Staggered animation based on item index
     * - Triggers when item is 30% visible
     */
    
    if (timelineItems.length > 0) {
        const itemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Get all timeline items to calculate staggered delay
                    const allItems = Array.from(document.querySelectorAll('.timeline-item'));
                    const index = allItems.indexOf(entry.target);
                    
                    setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, index * 150);
                    
                    // Unobserve after animation to improve performance
                    itemObserver.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px' // Triggers slightly before element enters viewport
        });
        
        timelineItems.forEach(item => {
            itemObserver.observe(item);
        });
    }
    
    // ==========================================================================
    // 4. HOVER EFFECTS FOR TIMELINE ITEMS
    // ==========================================================================
    /**
     * Adds interactive hover effects to timeline cards and year badges
     * Features:
     * - Card scaling and border color change
     * - Year badge scaling
     * - Responsive behavior (different on mobile)
     */
    
    timelineItems.forEach(item => {
        const content = item.querySelector('.timeline-content');
        const year = item.querySelector('.timeline-year');
        
        item.addEventListener('mouseenter', function() {
            if (content) {
                content.style.transform = 'scale(1.02)';
                content.style.borderColor = 'var(--accent-primary)';
                content.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            if (year) {
                // Different transform based on screen size
                if (window.innerWidth > 1024) {
                    year.style.transform = 'translateX(-50%) scale(1.1)';
                } else {
                    year.style.transform = 'scale(1.1)';
                }
                year.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (content) {
                content.style.transform = 'scale(1)';
                content.style.borderColor = 'var(--border-color)';
            }
            if (year) {
                if (window.innerWidth > 1024) {
                    year.style.transform = 'translateX(-50%) scale(1)';
                } else {
                    year.style.transform = 'scale(1)';
                }
            }
        });
    });
    
    // ==========================================================================
    // 5. TAG HOVER EFFECTS
    // ==========================================================================
    /**
     * Adds hover effects to timeline category tags
     * Features:
     * - Background color change
     * - Text color inversion
     */
    
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'var(--accent-primary)';
            this.style.color = 'white';
            this.style.transition = 'all 0.3s ease';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 8px var(--shadow-color)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'var(--bg-secondary)';
            this.style.color = 'var(--accent-primary)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // ==========================================================================
    // 6. URL HASH HANDLING
    // ==========================================================================
    /**
     * Checks URL hash on page load and activates corresponding era
     * Features:
     * - Direct linking to specific timeline sections
     * - Smooth activation
     */
    
    function handleUrlHash() {
        const hash = window.location.hash.substring(1); // Remove the # symbol
        if (hash) {
            const matchingBtn = document.querySelector(`[data-era="${hash}"]`);
            if (matchingBtn) {
                matchingBtn.click();
                
                // Scroll to the timeline section with offset for header
                setTimeout(() => {
                    const targetSection = document.getElementById(`${hash}-timeline`);
                    if (targetSection) {
                        const headerOffset = 100;
                        const elementPosition = targetSection.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                }, 300);
            }
        }
    }
    
    handleUrlHash();
    
    // ==========================================================================
    // 7. PARALLAX EFFECT FOR PAGE HEADER
    // ==========================================================================
    /**
     * Creates a subtle parallax scrolling effect on the page header
     * Features:
     * - Only active on desktop (width > 768px)
     * - Smooth background position shift based on scroll
     */
    
    if (pageHeader && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const headerHeight = pageHeader.offsetHeight;
            
            if (scrollPosition < headerHeight) {
                const speed = 0.3;
                pageHeader.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    }
    
    // ==========================================================================
    // 8. SMOOTH SCROLL FOR ERA BUTTONS
    // ==========================================================================
    /**
     * Adds smooth scrolling when era buttons are clicked
     * Features:
     * - Scrolls to the selected timeline section
     * - Accounts for fixed header height
     */
    
    eraBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const era = this.getAttribute('data-era');
            const targetSection = document.getElementById(`${era}-timeline`);
            
            if (targetSection) {
                setTimeout(() => {
                    const headerOffset = 100;
                    const elementPosition = targetSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 200);
            }
        });
    });
    
    // ==========================================================================
    // 9. INITIAL ANIMATION FOR ACTIVE TIMELINE
    // ==========================================================================
    /**
     * Triggers animations for timeline items in the initially active section
     * Features:
     * - Staggered fade-in animation
     * - Runs on page load
     */
    
    function initializeActiveTimeline() {
        const activeSection = document.querySelector('.timeline-section.active');
        if (activeSection) {
            const items = activeSection.querySelectorAll('.timeline-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            });
        }
    }
    
    initializeActiveTimeline();
    
    // ==========================================================================
    // 10. KEYBOARD NAVIGATION FOR ERA BUTTONS
    // ==========================================================================
    /**
     * Enables keyboard navigation between era buttons
     * Features:
     * - Left/Right arrow keys to navigate
     * - Focus management
     * - Prevents default arrow key behavior
     */
    
    eraBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextBtn = eraBtns[index + 1];
                if (nextBtn) {
                    nextBtn.focus();
                    nextBtn.click();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevBtn = eraBtns[index - 1];
                if (prevBtn) {
                    prevBtn.focus();
                    prevBtn.click();
                }
            } else if (e.key === 'Home') {
                e.preventDefault();
                const firstBtn = eraBtns[0];
                firstBtn.focus();
                firstBtn.click();
            } else if (e.key === 'End') {
                e.preventDefault();
                const lastBtn = eraBtns[eraBtns.length - 1];
                lastBtn.focus();
                lastBtn.click();
            }
        });
    });
    
    // ==========================================================================
    // 11. RESPONSIVE BEHAVIOR
    // ==========================================================================
    /**
     * Adjusts behavior based on screen size
     * Features:
     * - Disables certain effects on mobile
     * - Re-initializes on resize
     */
    
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Re-check hover effect transforms
            if (window.innerWidth <= 1024) {
                timelineItems.forEach(item => {
                    const year = item.querySelector('.timeline-year');
                    if (year && item.matches(':hover')) {
                        year.style.transform = 'scale(1.1)';
                    }
                });
            }
        }, 250);
    });
    
    // ==========================================================================
    // 12. TOUCH DEVICE SUPPORT
    // ==========================================================================
    /**
     * Ensures hover effects work appropriately on touch devices
     * Features:
     * - Detects touch capability
     * - Simplifies interactions for mobile
     */
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        timelineItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                const content = this.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = 'scale(1.02)';
                    content.style.borderColor = 'var(--accent-primary)';
                }
            });
            
            item.addEventListener('touchend', function() {
                const content = this.querySelector('.timeline-content');
                if (content) {
                    content.style.transform = 'scale(1)';
                    content.style.borderColor = 'var(--border-color)';
                }
            });
        });
    }
    
    // ==========================================================================
    // 13. LAZY LOADING FOR TIMELINE IMAGES (if any)
    // ==========================================================================
    /**
     * Implements lazy loading for any images within timeline content
     * Features:
     * - Improves page load performance
     * - Loads images only when they come into viewport
     */
    
    const timelineImages = document.querySelectorAll('.timeline-content img');
    
    if (timelineImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        timelineImages.forEach(img => {
            img.dataset.src = img.src;
            img.src = ''; // Clear src initially
            imageObserver.observe(img);
        });
    }
    
    // ==========================================================================
    // 14. ERROR HANDLING
    // ==========================================================================
    /**
     * Global error handler for timeline interactions
     */
    
    window.addEventListener('error', function(e) {
        console.error('Timeline page error:', e.message);
        // Could implement user-friendly error notification here
    });
    
    // ==========================================================================
    // 15. PERFORMANCE OPTIMIZATION
    // ==========================================================================
    /**
     * Cleans up observers and event listeners when page is hidden
     * Improves performance for multi-page applications
     */
    
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            // Pause any animations or observers when page is hidden
            // Re-activate when page becomes visible again
        }
    });
});

