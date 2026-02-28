// Research Overview Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== TAB FUNCTIONALITY FOR SERIES RESEARCH =====
    const tabBtns = document.querySelectorAll('.tab-btn');
    const researchContents = document.querySelectorAll('.series-research-content');
    
    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all tabs and contents
                tabBtns.forEach(b => b.classList.remove('active'));
                researchContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Show corresponding content
                const series = this.getAttribute('data-series');
                const targetContent = document.getElementById(`${series}-research`);
                if (targetContent) {
                    targetContent.classList.add('active');
                    targetContent.style.animation = 'fadeIn 0.6s ease-out';
                }
            });
        });
    }
    
    // ===== ANIMATE STAT CARDS ON SCROLL =====
    const statCards = document.querySelectorAll('.stat-card');
    
    if (statCards.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        
                        // Animate numbers counting up
                        const statNumber = entry.target.querySelector('.stat-number');
                        if (statNumber && !statNumber.classList.contains('counted')) {
                            const text = statNumber.textContent;
                            const targetNumber = parseInt(text.replace(/[^0-9]/g, ''));
                            const hasPlus = text.includes('+');
                            
                            if (!isNaN(targetNumber)) {
                                let currentNumber = 0;
                                const increment = Math.ceil(targetNumber / 30);
                                
                                const timer = setInterval(() => {
                                    currentNumber += increment;
                                    if (currentNumber >= targetNumber) {
                                        statNumber.textContent = targetNumber + (hasPlus ? '+' : '');
                                        clearInterval(timer);
                                    } else {
                                        statNumber.textContent = currentNumber + (hasPlus ? '+' : '');
                                    }
                                }, 50);
                                
                                statNumber.classList.add('counted');
                            }
                        }
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        statCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            statObserver.observe(card);
        });
    }
    
    // ===== ANIMATE CATEGORY CARDS ON SCROLL =====
    const categoryCards = document.querySelectorAll('.category-card');
    
    if (categoryCards.length > 0) {
        const categoryObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });
        
        categoryCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            categoryObserver.observe(card);
        });
    }
    
    // ===== ANIMATE PROCESS STEPS ON SCROLL =====
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0) {
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.3 });
        
        processSteps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = index % 2 === 0 ? 'translateX(-30px)' : 'translateX(30px)';
            step.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
            stepObserver.observe(step);
        });
    }
    
    // ===== ANIMATE BOOK ITEMS ON SCROLL =====
    const bookItems = document.querySelectorAll('.book-item');
    
    if (bookItems.length > 0) {
        const bookObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.3 });
        
        bookItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`;
            bookObserver.observe(item);
        });
    }
    
    // ===== HOVER EFFECTS FOR CATEGORY CARDS =====
    categoryCards.forEach(card => {
        const icon = card.querySelector('.category-icon i');
        const link = card.querySelector('.category-link');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        if (link) {
            link.addEventListener('mouseenter', function() {
                this.style.gap = '1rem';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.gap = '0.5rem';
            });
        }
    });
    
    // ===== HOVER EFFECTS FOR SHOWCASE IMAGES =====
    const showcaseImages = document.querySelectorAll('.showcase-image');
    
    showcaseImages.forEach(image => {
        const img = image.querySelector('img');
        
        image.addEventListener('mouseenter', function() {
            if (img) {
                img.style.transform = 'scale(1.05)';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===== NEWSLETTER FORM SUBMISSION =====
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show success message
                showNotification('Thank you for subscribing to research updates!', 'success');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address.', 'error');
            }
        });
    }
    
    // ===== EMAIL VALIDATION HELPER =====
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // ===== NOTIFICATION SYSTEM =====
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.research-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `research-notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 50px;
            display: flex;
            align-items: center;
            gap: 0.8rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 9999;
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
    
    // ===== ADD ANIMATION STYLES =====
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
    
    // ===== PARALLAX EFFECT FOR PAGE HEADER =====
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
    
    // ===== SMOOTH SCROLL FOR CATEGORY LINKS =====
    const categoryLinks = document.querySelectorAll('.category-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only prevent default if it's an anchor link
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ===== ACTIVE TAB ON PAGE LOAD (if hash in URL) =====
    const hash = window.location.hash;
    if (hash) {
        const tabId = hash.replace('#', '');
        const matchingTab = document.querySelector(`[data-series="${tabId}"]`);
        if (matchingTab) {
            matchingTab.click();
        }
    }
    
    // ===== TOOLTIP INITIALIZATION FOR STAT CARDS =====
    statCards.forEach(card => {
        const icon = card.querySelector('i');
        if (icon) {
            icon.setAttribute('title', card.querySelector('.stat-label').textContent);
        }
    });
    
    // ===== LAZY LOADING FOR IMAGES =====
    const images = document.querySelectorAll('.showcase-image img, .intro-image img, .preview-image img');
    
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
});