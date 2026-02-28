// Books Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== ANIMATE SERIES CARDS ON SCROLL =====
    const seriesCards = document.querySelectorAll('.series-card');
    
    if (seriesCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });
        
        seriesCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
    
    // ===== ANIMATE STANDALONE BOOKS =====
    const standaloneCards = document.querySelectorAll('.standalone-card');
    
    if (standaloneCards.length > 0) {
        const standaloneObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.3 });
        
        standaloneCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            standaloneObserver.observe(card);
        });
    }
    
    // ===== HOVER EFFECTS FOR SERIES CARDS =====
    const seriesImages = document.querySelectorAll('.series-card-image');
    
    seriesImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            const badge = this.querySelector('.series-badge');
            if (badge) {
                badge.style.transform = 'scale(1.1)';
                badge.style.transition = 'transform 0.3s';
            }
        });
        
        image.addEventListener('mouseleave', function() {
            const badge = this.querySelector('.series-badge');
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
        });
    });
    
    // ===== COUNTER ANIMATION FOR STATS =====
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetNumber = parseInt(statElement.textContent.replace(/[^0-9]/g, ''));
                    const hasPlus = statElement.textContent.includes('+');
                    
                    if (!isNaN(targetNumber) && !statElement.classList.contains('counted')) {
                        let currentNumber = 0;
                        const increment = Math.ceil(targetNumber / 30);
                        
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                statElement.textContent = targetNumber + (hasPlus ? '+' : '');
                                clearInterval(timer);
                            } else {
                                statElement.textContent = currentNumber + (hasPlus ? '+' : '');
                            }
                        }, 50);
                        
                        statElement.classList.add('counted');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        statNumbers.forEach(stat => {
            statObserver.observe(stat);
        });
    }
    
    // ===== SAMPLE BUTTON CLICK HANDLER =====
    const sampleButtons = document.querySelectorAll('.btn-outline');
    
    sampleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            // This would link to actual sample PDFs
            alert('Sample chapter would download here. In production, this would link to actual PDF files.');
        });
    });
    
    // ===== READING GUIDE CTA BUTTON =====
    const guideButton = document.querySelector('.reading-guide-cta .btn-primary');
    
    if (guideButton) {
        guideButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Reading guide PDF would download here. In production, this would link to an actual PDF file.');
        });
    }
    
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
});