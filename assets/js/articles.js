/**
 * ARTICLES PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles filtering, saving, load more functionality, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const topicFilter = document.getElementById('topic-filter');
    const eraFilter = document.getElementById('era-filter');
    const sortBy = document.getElementById('sort-by');
    const articleCards = document.querySelectorAll('.article-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const saveBtns = document.querySelectorAll('.card-save');
    const topicTags = document.querySelectorAll('.topic-tag');
    const newsletterForm = document.querySelector('.newsletter-form');
    const featuredArticle = document.querySelector('.featured-wrapper');
    
    // Track saved articles
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    
    // Track displayed articles for load more
    let visibleCount = 6;
    const totalArticles = articleCards.length;
    
    // ==========================================================================
    // 2. FILTER FUNCTIONALITY
    // ==========================================================================
    /**
     * Filters articles by topic and era
     * Features:
     * - Multiple filter criteria
     * - Smooth hide/show animations
     * - Updates visible count
     */
    
    function filterArticles() {
        const selectedTopic = topicFilter ? topicFilter.value : 'all';
        const selectedEra = eraFilter ? eraFilter.value : 'all';
        
        let visibleIndex = 0;
        
        articleCards.forEach(card => {
            const cardTopic = card.getAttribute('data-topic');
            const cardEra = card.getAttribute('data-era');
            
            const topicMatch = selectedTopic === 'all' || cardTopic === selectedTopic;
            const eraMatch = selectedEra === 'all' || cardEra === selectedEra;
            
            if (topicMatch && eraMatch && visibleIndex < visibleCount) {
                card.classList.remove('hidden', 'filtered-out');
                card.style.display = 'flex';
                visibleIndex++;
            } else if (topicMatch && eraMatch) {
                card.classList.add('hidden');
                card.classList.remove('filtered-out');
                card.style.display = 'none';
            } else {
                card.classList.add('filtered-out');
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
        
        // Update load more button visibility
        updateLoadMoreButton();
        
        // Show filter notification
        showFilterNotification(selectedTopic, selectedEra);
    }
    
    /**
     * Updates load more button based on visible articles
     */
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;
        
        const visibleArticles = document.querySelectorAll('.article-card:not(.hidden):not(.filtered-out)').length;
        
        if (visibleArticles >= totalArticles || visibleArticles >= visibleCount) {
            loadMoreBtn.style.display = visibleArticles < totalArticles ? 'inline-flex' : 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    /**
     * Shows notification when filters change
     * @param {string} topic - Selected topic
     * @param {string} era - Selected era
     */
    function showFilterNotification(topic, era) {
        const topicNames = {
            'all': 'All Topics',
            'research': 'Research Methods',
            'history': 'Historical Analysis',
            'writing': 'Writing Craft',
            'sources': 'Primary Sources',
            'interviews': 'Interviews'
        };
        
        const eraNames = {
            'all': 'All Eras',
            'viking': 'Viking Age',
            'tudor': 'Tudor Era',
            'roman': 'Roman Britain',
            'medieval': 'Medieval'
        };
        
        const visibleCount = document.querySelectorAll('.article-card:not(.hidden):not(.filtered-out)').length;
        
        showNotification(`Showing ${visibleCount} articles - ${topicNames[topic]}, ${eraNames[era]}`, 'info');
    }
    
    // Add filter event listeners
    if (topicFilter) topicFilter.addEventListener('change', filterArticles);
    if (eraFilter) eraFilter.addEventListener('change', filterArticles);
    if (sortBy) sortBy.addEventListener('change', sortArticles);
    
    // ==========================================================================
    // 3. SORT FUNCTIONALITY
    // ==========================================================================
    /**
     * Sorts articles by selected criteria
     * @param {Event} e - Change event
     */
    function sortArticles(e) {
        const sortValue = e.target.value;
        const articlesArray = Array.from(articleCards);
        const container = document.querySelector('.articles-grid');
        
        // Remove all cards
        articlesArray.forEach(card => card.remove());
        
        // Sort based on criteria
        switch(sortValue) {
            case 'newest':
                articlesArray.sort((a, b) => {
                    const dateA = new Date(a.querySelector('.card-meta span:first-child').textContent);
                    const dateB = new Date(b.querySelector('.card-meta span:first-child').textContent);
                    return dateB - dateA;
                });
                break;
            case 'oldest':
                articlesArray.sort((a, b) => {
                    const dateA = new Date(a.querySelector('.card-meta span:first-child').textContent);
                    const dateB = new Date(b.querySelector('.card-meta span:first-child').textContent);
                    return dateA - dateB;
                });
                break;
            case 'title':
                articlesArray.sort((a, b) => {
                    const titleA = a.querySelector('h3').textContent;
                    const titleB = b.querySelector('h3').textContent;
                    return titleA.localeCompare(titleB);
                });
                break;
            case 'popular':
                // This would typically come from a backend
                // For demo, shuffle a bit
                articlesArray.sort(() => Math.random() - 0.5);
                break;
        }
        
        // Reappend in order
        articlesArray.forEach(card => container.appendChild(card));
        
        // Reset animations
        articlesArray.forEach((card, index) => {
            card.style.animation = 'none';
            card.offsetHeight; // Trigger reflow
            card.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
        });
        
        showNotification('Articles sorted', 'info');
    }
    
    // ==========================================================================
    // 4. LOAD MORE FUNCTIONALITY
    // ==========================================================================
    /**
     * Loads more articles when button is clicked
     */
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            this.classList.add('loading');
            this.disabled = true;
            
            // Simulate loading delay
            setTimeout(() => {
                visibleCount += 3;
                
                let shownCount = 0;
                articleCards.forEach(card => {
                    if (shownCount < visibleCount && !card.classList.contains('filtered-out')) {
                        card.classList.remove('hidden');
                        card.style.display = 'flex';
                        shownCount++;
                    }
                });
                
                // Update button state
                this.classList.remove('loading');
                this.disabled = false;
                
                // Hide button if all articles are visible
                const visibleArticles = document.querySelectorAll('.article-card:not(.hidden):not(.filtered-out)').length;
                if (visibleArticles >= totalArticles) {
                    this.style.display = 'none';
                    showNotification('All articles loaded', 'success');
                } else {
                    showNotification(`Loaded ${Math.min(3, totalArticles - visibleArticles + 3)} more articles`, 'success');
                }
            }, 1000);
        });
    }
    
    // ==========================================================================
    // 5. SAVE ARTICLE FUNCTIONALITY
    // ==========================================================================
    /**
     * Handles saving/unsaving articles
     * Features:
     * - Local storage persistence
     * - Visual feedback
     * - Notification
     */
    
    if (saveBtns.length > 0) {
        // Initialize saved state
        savedArticles.forEach(id => {
            const saveBtn = document.querySelector(`[data-article-id="${id}"] .card-save`);
            if (saveBtn) {
                saveBtn.classList.add('saved');
                saveBtn.innerHTML = '<i class="fas fa-bookmark"></i>';
            }
        });
        
        saveBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const articleCard = this.closest('.article-card');
                const articleId = articleCard.getAttribute('data-article-id') || 
                                 articleCard.querySelector('h3').textContent.replace(/\s+/g, '-').toLowerCase();
                
                if (this.classList.contains('saved')) {
                    // Unsave
                    this.classList.remove('saved');
                    this.innerHTML = '<i class="far fa-bookmark"></i>';
                    savedArticles = savedArticles.filter(id => id !== articleId);
                    showNotification('Article removed from saved', 'info');
                } else {
                    // Save
                    this.classList.add('saved');
                    this.innerHTML = '<i class="fas fa-bookmark"></i>';
                    savedArticles.push(articleId);
                    showNotification('Article saved! View in your profile', 'success');
                }
                
                // Save to localStorage
                localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
                
                // Animate
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
    }
    
    // ==========================================================================
    // 6. TOPIC TAG FILTERING
    // ==========================================================================
    /**
     * Allows clicking on topic tags to filter
     */
    if (topicTags.length > 0) {
        topicTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                
                const topic = this.getAttribute('data-topic');
                
                if (topicFilter) {
                    topicFilter.value = topic;
                    filterArticles();
                    
                    // Scroll to articles grid
                    document.querySelector('.articles-grid-section').scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ==========================================================================
    // 7. NEWSLETTER FORM SUBMISSION
    // ==========================================================================
    /**
     * Handles newsletter signup
     */
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing to articles!', 'success');
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
        console.log('Article newsletter signup:', email);
    }
    
    // ==========================================================================
    // 8. ANIMATE ARTICLES ON SCROLL
    // ==========================================================================
    /**
     * Uses Intersection Observer to animate articles as they scroll into view
     */
    
    if (articleCards.length > 0) {
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
        
        articleCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
    
    // ==========================================================================
    // 9. FEATURED ARTICLE ANIMATION
    // ==========================================================================
    
    if (featuredArticle) {
        const featuredObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    featuredObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        featuredArticle.style.opacity = '0';
        featuredArticle.style.transform = 'translateY(30px)';
        featuredArticle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        featuredObserver.observe(featuredArticle);
    }
    
    // ==========================================================================
    // 10. NOTIFICATION SYSTEM
    // ==========================================================================
    
    /**
     * Displays temporary notifications to users
     * @param {string} message - The message to display
     * @param {string} type - The type of notification (success, error, info)
     */
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.articles-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `articles-notification notification-${type}`;
        
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
    // 11. ADD ANIMATION STYLES
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
    // 12. PARALLAX EFFECT FOR PAGE HEADER
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
    // 13. ACTIVE FILTER FROM URL HASH
    // ==========================================================================
    
    const hash = window.location.hash.substring(1);
    if (hash) {
        if (topicFilter) {
            topicFilter.value = hash;
            filterArticles();
        }
    }
    
    // ==========================================================================
    // 14. KEYBOARD NAVIGATION FOR FILTERS
    // ==========================================================================
    
    const filterSelects = document.querySelectorAll('.filter-select');
    
    filterSelects.forEach((select, index) => {
        select.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                // Open dropdown
                this.size = 5;
                e.preventDefault();
            }
        });
        
        select.addEventListener('blur', function() {
            this.size = 1;
        });
    });
    
    // ==========================================================================
    // 15. TOUCH DEVICE SUPPORT
    // ==========================================================================
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        articleCards.forEach(card => {
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
    // 16. READ TIME CALCULATOR
    // ==========================================================================
    /**
     * Calculates and displays estimated read time for articles
     */
    function calculateReadTimes() {
        articleCards.forEach(card => {
            const excerpt = card.querySelector('.card-excerpt');
            if (excerpt) {
                const text = excerpt.textContent;
                const wordCount = text.split(/\s+/).length;
                const readTime = Math.ceil(wordCount / 200); // 200 words per minute
                
                // Update or add read time
                const meta = card.querySelector('.card-meta');
                const existingTime = card.querySelector('.read-time');
                
                if (!existingTime) {
                    const timeSpan = document.createElement('span');
                    timeSpan.className = 'read-time';
                    timeSpan.innerHTML = `<i class="far fa-clock"></i> ${readTime} min read`;
                    meta.appendChild(timeSpan);
                }
            }
        });
    }
    
    calculateReadTimes();
    
    // ==========================================================================
    // 17. INITIAL FILTER STATE
    // ==========================================================================
    
    // Set initial visible count
    filterArticles();
    
    // ==========================================================================
    // 18. ARTICLE VIEW TRACKING (Analytics)
    // ==========================================================================
    /**
     * Tracks article views for popularity sorting
     */
    function trackArticleView(articleId) {
        let views = JSON.parse(localStorage.getItem('articleViews')) || {};
        views[articleId] = (views[articleId] || 0) + 1;
        localStorage.setItem('articleViews', JSON.stringify(views));
    }
    
    // Track view when article card is clicked
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't track if clicking on save button
            if (e.target.closest('.card-save')) return;
            
            const articleId = this.getAttribute('data-article-id') || 
                             this.querySelector('h3').textContent.replace(/\s+/g, '-').toLowerCase();
            trackArticleView(articleId);
        });
    });
});

