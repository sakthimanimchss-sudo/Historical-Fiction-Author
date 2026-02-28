// Series Pages Shared JavaScript (works for series-1, series-2, series-3)
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMATE BOOK ITEMS ON SCROLL =====
    const bookItems = document.querySelectorAll('.book-item');
    
    if (bookItems.length > 0) {
        const bookObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });
        
        bookItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            bookObserver.observe(item);
        });
    }
    
    // ===== ANIMATE HIGHLIGHTS ON SCROLL =====
    const highlights = document.querySelectorAll('.series-highlights .highlight');
    
    if (highlights.length > 0) {
        const highlightObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }
            });
        }, { threshold: 0.5 });
        
        highlights.forEach((highlight, index) => {
            highlight.style.opacity = '0';
            highlight.style.transform = 'translateX(-20px)';
            highlight.style.transition = `opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            highlightObserver.observe(highlight);
        });
    }
    
    // ===== ANIMATE CONTEXT LIST ITEMS =====
    const contextItems = document.querySelectorAll('.context-list li');
    
    if (contextItems.length > 0) {
        const contextObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.3 });
        
        contextItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            contextObserver.observe(item);
        });
    }
    
    // ===== HOVER EFFECTS FOR BOOK ITEMS =====
    bookItems.forEach(item => {
        const bookCover = item.querySelector('.book-cover img');
        const bookNumber = item.querySelector('.book-number');
        
        item.addEventListener('mouseenter', function() {
            if (bookCover) {
                bookCover.style.transform = 'scale(1.05)';
            }
            if (bookNumber) {
                bookNumber.style.color = 'var(--accent-primary)';
                bookNumber.style.opacity = '1';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (bookCover) {
                bookCover.style.transform = 'scale(1)';
            }
            if (bookNumber) {
                bookNumber.style.color = 'var(--accent-primary)';
                bookNumber.style.opacity = '0.3';
            }
        });
    });
    
    // ===== HOVER EFFECTS FOR HIGHLIGHTS =====
    highlights.forEach(highlight => {
        highlight.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s';
            }
        });
        
        highlight.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===== ANIMATE SERIES HEADER ON LOAD =====
    const seriesHeader = document.querySelector('.series-header-content');
    if (seriesHeader) {
        seriesHeader.style.animation = 'fadeInUp 1.2s ease-out';
    }
    
    const overviewImage = document.querySelector('.overview-image');
    const overviewContent = document.querySelector('.overview-content');
    
    if (overviewImage) {
        overviewImage.style.animation = 'fadeInLeft 1s ease-out';
    }
    
    if (overviewContent) {
        overviewContent.style.animation = 'fadeInRight 1s ease-out';
    }
    
    // ===== COUNTER FOR STATS IF PRESENT =====
    const metaNumbers = document.querySelectorAll('.series-meta span');
    
    if (metaNumbers.length > 0) {
        metaNumbers.forEach(meta => {
            meta.addEventListener('mouseenter', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(5deg)';
                    icon.style.transition = 'transform 0.3s';
                }
            });
            
            meta.addEventListener('mouseleave', function() {
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0)';
                }
            });
        });
    }
    
    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
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
    
    // ===== PARALLAX EFFECT FOR SERIES HEADER (optional) =====
    const seriesHeaderSection = document.querySelector('.series-header');
    
    if (seriesHeaderSection && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < seriesHeaderSection.offsetHeight) {
                const speed = 0.5;
                seriesHeaderSection.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    }
    
    // ===== ACTIVE STATE FOR BOOK LINKS (demo) =====
    const learnMoreBtns = document.querySelectorAll('.btn-link');
    
    learnMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // This is just for demo - replace with actual links
            console.log('Learn more clicked:', this.closest('.book-details').querySelector('h3').textContent);
            
            // Visual feedback
            this.style.color = 'var(--accent-secondary)';
            setTimeout(() => {
                this.style.color = 'var(--accent-primary)';
            }, 300);
        });
    });
});