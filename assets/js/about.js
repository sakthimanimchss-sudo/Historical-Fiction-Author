// About Page Specific JavaScript - Styled like home2.js
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate timeline items on scroll with fade effect
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(item);
        });
    }
    
    // Animate stats on scroll
    const stats = document.querySelectorAll('.philosophy-stats .stat');
    
    if (stats.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animate numbers counting up
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !statNumber.classList.contains('counted')) {
                        const targetNumber = parseInt(statNumber.textContent);
                        let currentNumber = 0;
                        const increment = Math.ceil(targetNumber / 30);
                        
                        const timer = setInterval(() => {
                            currentNumber += increment;
                            if (currentNumber >= targetNumber) {
                                statNumber.textContent = targetNumber + (statNumber.textContent.includes('+') ? '+' : '');
                                clearInterval(timer);
                            } else {
                                statNumber.textContent = currentNumber + (statNumber.textContent.includes('+') ? '+' : '');
                            }
                        }, 50);
                        
                        statNumber.classList.add('counted');
                    }
                }
            });
        }, { threshold: 0.5 });
        
        stats.forEach(stat => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            statObserver.observe(stat);
        });
    }
    
    // Add hover effect to inspiration cards
    const inspirationCards = document.querySelectorAll('.inspiration-card');
    
    inspirationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2) rotate(5deg)';
                icon.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
    });
    
    // Add hover effect to timeline items
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    timelineContents.forEach(content => {
        content.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 15px 35px var(--shadow-hover)';
        });
        
        content.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px var(--shadow-color)';
        });
    });
    
    // Smooth scroll for anchor links if any
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
    
    // Animate page header on load
    const pageHeader = document.querySelector('.page-header h1');
    if (pageHeader) {
        pageHeader.style.animation = 'fadeInUp 1.2s ease-out';
    }
    
    // Animate bio section on load
    const bioImage = document.querySelector('.bio-image');
    const bioContent = document.querySelector('.bio-content');
    
    if (bioImage) {
        bioImage.style.animation = 'fadeInLeft 1s ease-out';
    }
    
    if (bioContent) {
        bioContent.style.animation = 'fadeInRight 1s ease-out';
    }
});