/**
 * MAPS PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles map filtering, modal viewer, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mapCards = document.querySelectorAll('.map-card');
    const modal = document.getElementById('mapModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.querySelector('.modal-caption');
    const closeBtn = document.querySelector('.modal-close');
    const viewBtns = document.querySelectorAll('.map-view-btn');
    const downloadBtns = document.querySelectorAll('.map-download');
    const shareBtns = document.querySelectorAll('.map-share');
    
    // ==========================================================================
    // 2. FILTER FUNCTIONALITY
    // ==========================================================================
    /**
     * Filters maps by era (Viking, Tudor, Roman, All)
     * Features:
     * - Toggle active class on buttons
     * - Show/hide map cards with animation
     * - Maintains filter state
     */
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const era = this.getAttribute('data-era');
                
                // Filter map cards
                mapCards.forEach(card => {
                    const cardEra = card.getAttribute('data-era');
                    
                    if (era === 'all' || cardEra === era) {
                        card.classList.remove('hidden');
                        // Add animation
                        card.style.animation = 'fadeInUp 0.6s ease-out';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }
    
    // ==========================================================================
    // 3. MAP MODAL VIEWER
    // ==========================================================================
    /**
     * Opens full-size map images in a modal
     * Features:
     * - Click on map overlay to open
     * - Close with X button or clicking outside
     * - Escape key support
     * - Caption display
     */
    
    if (viewBtns.length > 0) {
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Find the parent map card
                const mapCard = this.closest('.map-card');
                const mapImage = mapCard.querySelector('img');
                const mapTitle = mapCard.querySelector('h3').textContent;
                const mapEra = mapCard.querySelector('.map-era').textContent;
                
                // Set modal content
                modalImg.src = mapImage.src;
                modalCaption.textContent = `${mapTitle} - ${mapEra}`;
                
                // Show modal
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
    }
    
    // Close modal with X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // ==========================================================================
    // 4. DOWNLOAD FUNCTIONALITY
    // ==========================================================================
    /**
     * Handles map download with tracking
     * Features:
     * - Simulated download (would link to actual files)
     * - Download tracking
     * - Success notification
     */
    
    if (downloadBtns.length > 0) {
        downloadBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const mapCard = this.closest('.map-card');
                const mapTitle = mapCard.querySelector('h3').textContent;
                
                // Simulate download (in production, this would link to actual files)
                showNotification(`Downloading ${mapTitle}...`, 'info');
                
                // In production, you would have:
                // window.location.href = this.href;
                
                // Simulate download completion
                setTimeout(() => {
                    showNotification(`${mapTitle} downloaded successfully!`, 'success');
                }, 1500);
            });
        });
    }
    
    // ==========================================================================
    // 5. SHARE FUNCTIONALITY
    // ==========================================================================
    /**
     * Allows sharing maps via social media or copy link
     * Features:
     * - Copy link to clipboard
     * - Social media sharing (simulated)
     * - Share notification
     */
    
    if (shareBtns.length > 0) {
        shareBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const mapCard = this.closest('.map-card');
                const mapTitle = mapCard.querySelector('h3').textContent;
                
                // Create temporary share options
                const shareOptions = [
                    { name: 'Copy Link', icon: 'fa-link' },
                    { name: 'Twitter', icon: 'fa-twitter' },
                    { name: 'Facebook', icon: 'fa-facebook' },
                    { name: 'Pinterest', icon: 'fa-pinterest' }
                ];
                
                // In a real implementation, you would show a share modal
                // For now, just copy a dummy link to clipboard
                navigator.clipboard.writeText(`https://eleanorhartwell.com/maps/${mapTitle.toLowerCase().replace(/\s+/g, '-')}`).then(() => {
                    showNotification('Map link copied to clipboard!', 'success');
                }).catch(() => {
                    showNotification('Sharing options coming soon!', 'info');
                });
            });
        });
    }
    
    // ==========================================================================
    // 6. ANIMATE MAP CARDS ON SCROLL
    // ==========================================================================
    /**
     * Uses Intersection Observer to animate map cards as they scroll into view
     * Features:
     * - Staggered animation
     * - Triggers when card is 20% visible
     */
    
    if (mapCards.length > 0) {
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
        
        mapCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
    
    // ==========================================================================
    // 7. HOVER EFFECTS FOR MAP CARDS
    // ==========================================================================
    /**
     * Adds additional interactive hover effects
     */
    
    mapCards.forEach(card => {
        const img = card.querySelector('img');
        const features = card.querySelectorAll('.map-features span');
        
        card.addEventListener('mouseenter', function() {
            // Pause any ongoing transitions
            if (img) {
                img.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            }
            
            // Highlight features
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.backgroundColor = 'var(--accent-primary)';
                    feature.style.color = 'white';
                    feature.style.transition = 'all 0.3s';
                }, index * 50);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset features
            features.forEach(feature => {
                feature.style.backgroundColor = '';
                feature.style.color = '';
            });
        });
    });
    
    // ==========================================================================
    // 8. NOTIFICATION SYSTEM
    // ==========================================================================
    /**
     * Displays temporary notifications to users
     * @param {string} message - The message to display
     * @param {string} type - The type of notification (success, error, info)
     */
    
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.map-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `map-notification notification-${type}`;
        
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
    // 9. ADD ANIMATION STYLES
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
    // 10. PARALLAX EFFECT FOR PAGE HEADER
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
    // 11. ACTIVE FILTER FROM URL HASH
    // ==========================================================================
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        const matchingBtn = document.querySelector(`[data-era="${hash}"]`);
        if (matchingBtn) {
            matchingBtn.click();
        }
    }
    
    // ==========================================================================
    // 12. KEYBOARD NAVIGATION FOR FILTERS
    // ==========================================================================
    
    filterBtns.forEach((btn, index) => {
        btn.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextBtn = filterBtns[index + 1];
                if (nextBtn) {
                    nextBtn.focus();
                    nextBtn.click();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevBtn = filterBtns[index - 1];
                if (prevBtn) {
                    prevBtn.focus();
                    prevBtn.click();
                }
            }
        });
    });
    
    // ==========================================================================
    // 13. TOUCH DEVICE SUPPORT
    // ==========================================================================
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        mapCards.forEach(card => {
            card.addEventListener('touchstart', function() {
                const overlay = this.querySelector('.map-overlay');
                if (overlay) {
                    overlay.style.opacity = '1';
                }
            });
            
            card.addEventListener('touchend', function() {
                const overlay = this.querySelector('.map-overlay');
                if (overlay) {
                    setTimeout(() => {
                        overlay.style.opacity = '0';
                    }, 1000);
                }
            });
        });
    }
});
