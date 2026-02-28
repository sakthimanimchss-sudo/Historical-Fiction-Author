// Real Figures Page Specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== FILTER FUNCTIONALITY =====
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sections = {
        saxon: document.getElementById('saxon-figures'),
        tudor: document.getElementById('tudor-figures'),
        roman: document.getElementById('roman-figures')
    };
    
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                const era = this.getAttribute('data-era');
                
                // Show/hide sections based on filter
                if (era === 'all') {
                    Object.values(sections).forEach(section => {
                        if (section) {
                            section.style.display = 'block';
                            setTimeout(() => {
                                section.style.opacity = '1';
                                section.style.transform = 'translateY(0)';
                            }, 100);
                        }
                    });
                } else {
                    // Hide all sections first
                    Object.values(sections).forEach(section => {
                        if (section) {
                            section.style.opacity = '0';
                            section.style.transform = 'translateY(20px)';
                            setTimeout(() => {
                                section.style.display = 'none';
                            }, 300);
                        }
                    });
                    
                    // Show selected section
                    setTimeout(() => {
                        if (sections[era]) {
                            sections[era].style.display = 'block';
                            setTimeout(() => {
                                sections[era].style.opacity = '1';
                                sections[era].style.transform = 'translateY(0)';
                            }, 50);
                        }
                    }, 300);
                }
            });
        });
    }
    
    // ===== ANIMATE FIGURE CARDS ON SCROLL =====
    const figureCards = document.querySelectorAll('.figure-card');
    
    if (figureCards.length > 0) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay based on index
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.2 });
        
        figureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
            cardObserver.observe(card);
        });
    }
    
    // ===== HOVER EFFECTS FOR FIGURE CARDS =====
    figureCards.forEach(card => {
        const image = card.querySelector('.figure-image img');
        const link = card.querySelector('.figure-appears a');
        
        card.addEventListener('mouseenter', function() {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
        
        if (link) {
            link.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'var(--accent-primary)';
                this.style.color = 'white';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.color = '';
            });
        }
    });
    
    // ===== SMOOTH SCROLL FOR FILTER BUTTONS =====
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const era = this.getAttribute('data-era');
            if (era !== 'all') {
                const targetSection = document.getElementById(`${era}-figures`);
                if (targetSection) {
                    setTimeout(() => {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 350);
                }
            }
        });
    });
    
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
    
    // ===== CTA BUTTON CLICK HANDLER =====
    const ctaButton = document.querySelector('.figures-cta .btn-primary');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'sources.html';
        });
    }
});