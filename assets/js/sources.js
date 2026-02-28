/**
 * SOURCES PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles citation modal, format tabs, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const citeBtns = document.querySelectorAll('.source-cite');
    const citeModal = document.getElementById('citeModal');
    const modalClose = document.querySelector('.cite-modal .modal-close');
    const copyBtns = document.querySelectorAll('.copy-btn');
    const guideTabs = document.querySelectorAll('.guide-tab');
    const categoryLinks = document.querySelectorAll('.category-link');
    
    // Citation data for different sources
    const citationData = {
        'ASC': {
            title: 'Anglo-Saxon Chronicle',
            author: 'Unknown (various scribes)',
            year: 'c. 890-1154',
            publisher: 'British Library',
            mla: 'The Anglo-Saxon Chronicle. Translated by Michael Swanton, Yale University Press, 2000.',
            apa: 'Swanton, M. (Trans.). (2000). The Anglo-Saxon Chronicle. Yale University Press.',
            chicago: 'The Anglo-Saxon Chronicle. Translated by Michael Swanton. New Haven: Yale University Press, 2000.'
        },
'Egil': {
    title: "Egil's Saga",
    author: 'Unknown',
    year: 'c. 1240',
    publisher: 'Penguin Classics',
    mla: "Egil's Saga. Translated by Bernard Scudder, Penguin Classics, 2004.",
    apa: 'Scudder, B. (Trans.). (2004). Egil\'s Saga. Penguin Classics.',
    chicago: "Egil's Saga. Translated by Bernard Scudder. London: Penguin Classics, 2004."
},

'Asser': {
    title: "Asser's Life of King Alfred",
    author: 'Asser',
    year: '893',
    publisher: 'Penguin Classics',
    mla: "Asser. Asser's Life of King Alfred. Translated by Simon Keynes and Michael Lapidge, Penguin Classics, 1983.",
    apa: 'Keynes, S., & Lapidge, M. (Trans.). (1983). Asser\'s Life of King Alfred. Penguin Classics.',
    chicago: "Asser. Asser's Life of King Alfred. Translated by Simon Keynes and Michael Lapidge. London: Penguin Classics, 1983."
},
        'SP': {
            title: 'State Papers of Henry VIII',
            author: 'Various',
            year: '1509-1547',
            publisher: 'The National Archives',
            mla: 'State Papers of Henry VIII. The National Archives, SP 1/1-246.',
            apa: 'State Papers of Henry VIII. (1509-1547). The National Archives.',
            chicago: 'State Papers of Henry VIII. Kew: The National Archives, SP 1/1-246.'
        },
        'LP': {
            title: 'Letters and Papers, Foreign and Domestic',
            author: 'J.S. Brewer et al.',
            year: '1862-1932',
            publisher: 'British History Online',
            mla: 'Brewer, J.S., et al., editors. Letters and Papers, Foreign and Domestic, Henry VIII. British History Online.',
            apa: 'Brewer, J.S., et al. (Eds.). (1862-1932). Letters and Papers, Foreign and Domestic, Henry VIII. British History Online.',
            chicago: 'Brewer, J.S., et al., eds. Letters and Papers, Foreign and Domestic, Henry VIII. London: British History Online.'
        },
        'CSP Spanish': {
            title: 'Calendar of State Papers, Spanish',
            author: 'G.A. Bergenroth et al.',
            year: '1862-1954',
            publisher: 'British History Online',
            mla: 'Bergenroth, G.A., et al., editors. Calendar of State Papers, Spanish. British History Online.',
            apa: 'Bergenroth, G.A., et al. (Eds.). (1862-1954). Calendar of State Papers, Spanish. British History Online.',
            chicago: 'Bergenroth, G.A., et al., eds. Calendar of State Papers, Spanish. London: British History Online.'
        },
        'Tacitus': {
            title: 'Tacitus: Agricola',
            author: 'Tacitus',
            year: '98 AD',
            publisher: 'Oxford University Press',
            mla: 'Tacitus. Agricola. Translated by Anthony Birley, Oxford University Press, 1999.',
            apa: 'Birley, A. (Trans.). (1999). Agricola. Oxford University Press.',
            chicago: 'Tacitus. Agricola. Translated by Anthony Birley. Oxford: Oxford University Press, 1999.'
        },
        'Vindolanda': {
            title: 'Vindolanda Tablets',
            author: 'Various',
            year: 'c. 90-120 AD',
            publisher: 'British Museum',
            mla: 'The Vindolanda Tablets. British Museum, inv. nos. 85-118.',
            apa: 'Vindolanda Tablets. (c. 90-120 AD). British Museum.',
            chicago: 'Vindolanda Tablets. London: British Museum.'
        },
        'Antonine': {
            title: 'Antonine Itinerary',
            author: 'Unknown',
            year: '3rd century AD',
            publisher: 'Various manuscripts',
            mla: 'The Antonine Itinerary. Translated by A.L.F. Rivet, Cambridge University Press, 1970.',
            apa: 'Rivet, A.L.F. (Trans.). (1970). The Antonine Itinerary. Cambridge University Press.',
            chicago: 'The Antonine Itinerary. Translated by A.L.F. Rivet. Cambridge: Cambridge University Press, 1970.'
        }
    };
    
    // ==========================================================================
    // 2. SMOOTH SCROLL FOR CATEGORY LINKS
    // ==========================================================================
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 100;
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ==========================================================================
    // 3. CITATION MODAL FUNCTIONALITY
    // ==========================================================================
    
    if (citeBtns.length > 0) {
        citeBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const sourceId = this.getAttribute('data-source');
                const citation = citationData[sourceId];
                
                if (citation) {
                    document.getElementById('mla-cite').textContent = citation.mla;
                    document.getElementById('apa-cite').textContent = citation.apa;
                    document.getElementById('chicago-cite').textContent = citation.chicago;
                    
                    citeModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }
    
    // Close modal with X button
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Close modal when clicking outside
    citeModal.addEventListener('click', function(e) {
        if (e.target === citeModal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && citeModal.classList.contains('show')) {
            closeModal();
        }
    });
    
    function closeModal() {
        citeModal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // ==========================================================================
    // 4. COPY CITATION TO CLIPBOARD
    // ==========================================================================
    
    copyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const format = this.getAttribute('data-cite');
            const textElement = document.getElementById(`${format}-cite`);
            const text = textElement.textContent;
            
            navigator.clipboard.writeText(text).then(() => {
                // Show success feedback
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 2000);
            }).catch(() => {
                alert('Failed to copy. Please try again.');
            });
        });
    });
    
    // ==========================================================================
    // 5. CITATION GUIDE TABS
    // ==========================================================================
    
    guideTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs and examples
            guideTabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.guide-example').forEach(ex => ex.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding example
            const format = this.getAttribute('data-format');
            document.getElementById(`${format}-example`).classList.add('active');
        });
    });
    
    // ==========================================================================
    // 6. ANIMATE ELEMENTS ON SCROLL
    // ==========================================================================
    
    const animatedElements = document.querySelectorAll('.source-card, .list-item, .archive-card, .bib-preview, .guide-content');
    
    if (animatedElements.length > 0) {
        const elementObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { 
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animatedElements.forEach(element => {
            elementObserver.observe(element);
        });
    }
    
    // ==========================================================================
    // 7. PARALLAX EFFECT FOR PAGE HEADER
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
    // 8. ACTIVE CATEGORY HIGHLIGHT ON SCROLL
    // ==========================================================================
    
    const sections = document.querySelectorAll('.sources-section');
    
    if (sections.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPosition = window.scrollY + 150;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    current = section.getAttribute('id');
                }
            });
            
            categoryLinks.forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href').substring(1);
                
                if (href === current) {
                    link.classList.add('active');
                }
            });
        });
    }
    
    // ==========================================================================
    // 9. DOWNLOAD BUTTON HANDLER
    // ==========================================================================
    
    const downloadBtns = document.querySelectorAll('.btn-primary[href="#"]');
    
    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('PDF download will be available soon!', 'info');
        });
    });
    
    // ==========================================================================
    // 10. NOTIFICATION SYSTEM
    // ==========================================================================
    
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.source-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `source-notification notification-${type}`;
        
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
            z-index: 10001;
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
        
        .category-link.active {
            color: var(--accent-primary);
        }
        
        .category-link.active:after {
            width: 80%;
        }
    `;
    document.head.appendChild(style);
    
    // ==========================================================================
    // 12. KEYBOARD NAVIGATION FOR TABS
    // ==========================================================================
    
    guideTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextTab = guideTabs[index + 1];
                if (nextTab) {
                    nextTab.focus();
                    nextTab.click();
                }
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevTab = guideTabs[index - 1];
                if (prevTab) {
                    prevTab.focus();
                    prevTab.click();
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
        const cards = document.querySelectorAll('.source-card, .list-item, .archive-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = 'translateY(0)';
                }, 300);
            });
        });
    }
});

