/**
 * CONTACT PAGE JAVASCRIPT
 * Eleanor Hartwell - Historical Fiction Author
 * Handles form validation, submission, and interactive features
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const contactForm = document.getElementById('contactForm');
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
    const privacyCheckbox = document.getElementById('privacy');
    const newsletterCheckbox = document.getElementById('newsletter');
    const infoCards = document.querySelectorAll('.info-card');
    const locationCards = document.querySelectorAll('.location-card');
    const faqItems = document.querySelectorAll('.faq-item');
    const socialLinks = document.querySelectorAll('.social-icons a');
    const mapWrapper = document.querySelector('.map-wrapper');
    const mapImage = document.querySelector('.map-wrapper img');
    const mapMarkers = document.querySelectorAll('.map-marker');
    const eventLocations = document.querySelectorAll('.location-card');
    
    // ==========================================================================
    // 2. INTERACTIVE MAP FUNCTIONALITY
    // ==========================================================================
    /**
     * Creates an interactive map with hover effects and location details
     * Features:
     * - Clickable markers showing event information
     * - Hover effects on map regions
     * - Tooltips with event details
     * - Mobile-responsive touch support
     */
    
    if (mapWrapper && mapImage) {
        // Create canvas overlay for interactive zones
        const mapCanvas = document.createElement('canvas');
        mapCanvas.className = 'map-canvas';
        mapCanvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 5;
        `;
        mapWrapper.style.position = 'relative';
        mapWrapper.appendChild(mapCanvas);
        
        // Define interactive zones (coordinates relative to image)
        const mapZones = [
            {
                id: 'oxford',
                name: 'Oxford Literary Festival',
                date: 'March 15-20, 2025',
                description: 'Bodleian Library, Oxford',
                coordinates: { x: 0.35, y: 0.45 }, // 35% from left, 45% from top
                icon: '📚',
                color: '#9ec9c9'
            },
            {
                id: 'london',
                name: 'London Book Fair',
                date: 'April 8-10, 2025',
                description: 'Olympia London',
                coordinates: { x: 0.32, y: 0.55 },
                icon: '📖',
                color: '#9ec9c9'
            },
            {
                id: 'edinburgh',
                name: 'Edinburgh International Book Festival',
                date: 'August 12-18, 2025',
                description: 'Edinburgh College of Art',
                coordinates: { x: 0.25, y: 0.25 },
                icon: '🏴',
                color: '#9ec9c9'
            },
            {
                id: 'york',
                name: 'York Literature Festival',
                date: 'October 5-8, 2025',
                description: 'York Minster Library',
                coordinates: { x: 0.38, y: 0.38 },
                icon: '🏰',
                color: '#9ec9c9'
            },
            {
    id: 'bath',
    name: "Bath Children's Literature Festival",
    date: 'September 22–24, 2025',
    description: 'Held at The Assembly Rooms, Bath, England.',
    coordinates: { x: 0.45, y: 0.58 },
    icon: '🏛️',
    color: '#9ec9c9'
}
        ];
        
        // Create marker elements
        mapZones.forEach(zone => {
            const marker = document.createElement('div');
            marker.className = `map-marker map-marker-${zone.id}`;
            marker.setAttribute('data-location', zone.id);
            marker.innerHTML = `
                <div class="marker-pulse"></div>
                <div class="marker-icon">${zone.icon}</div>
                <div class="marker-tooltip">
                    <h4>${zone.name}</h4>
                    <p class="marker-date">${zone.date}</p>
                    <p class="marker-desc">${zone.description}</p>
                </div>
            `;
            
            // Position marker based on coordinates
            marker.style.cssText = `
                position: absolute;
                left: ${zone.coordinates.x * 100}%;
                top: ${zone.coordinates.y * 100}%;
                transform: translate(-50%, -50%);
                z-index: 10;
                cursor: pointer;
            `;
            
            // Style marker components
            const style = document.createElement('style');
            style.textContent = `
                .map-marker-${zone.id} .marker-pulse {
                    position: absolute;
                    width: 30px;
                    height: 30px;
                    background: ${zone.color}40;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                }
                
                .map-marker-${zone.id} .marker-icon {
                    position: relative;
                    width: 40px;
                    height: 40px;
                    background: ${zone.color};
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.2rem;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
                    transition: all 0.3s;
                    z-index: 2;
                }
                
                .map-marker-${zone.id}:hover .marker-icon {
                    transform: scale(1.2);
                    background: #2c5a5a;
                }
                
                .map-marker-${zone.id} .marker-tooltip {
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: white;
                    color: #333;
                    padding: 1rem;
                    border-radius: 8px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                    width: 200px;
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s;
                    pointer-events: none;
                    margin-bottom: 15px;
                    border: 1px solid ${zone.color};
                }
                
                .map-marker-${zone.id}:hover .marker-tooltip {
                    opacity: 1;
                    visibility: visible;
                    transform: translateX(-50%) translateY(-10px);
                }
                
                .map-marker-${zone.id} .marker-tooltip h4 {
                    font-family: 'Cinzel', serif;
                    font-size: 1rem;
                    color: #2c5a5a;
                    margin-bottom: 0.3rem;
                }
                
                .map-marker-${zone.id} .marker-tooltip .marker-date {
                    font-size: 0.85rem;
                    color: #9ec9c9;
                    margin-bottom: 0.3rem;
                    font-weight: 600;
                }
                
                .map-marker-${zone.id} .marker-tooltip .marker-desc {
                    font-size: 0.85rem;
                    color: #666;
                    margin: 0;
                }
                
                @keyframes pulse {
                    0% {
                        transform: translate(-50%, -50%) scale(0.8);
                        opacity: 0.8;
                    }
                    70% {
                        transform: translate(-50%, -50%) scale(1.5);
                        opacity: 0;
                    }
                    100% {
                        transform: translate(-50%, -50%) scale(0.8);
                        opacity: 0;
                    }
                }
            `;
            
            document.head.appendChild(style);
            mapWrapper.appendChild(marker);
            
            // Add click event to marker
            marker.addEventListener('click', function(e) {
                e.stopPropagation();
                const location = this.getAttribute('data-location');
                highlightLocationCard(location);
                showNotification(`${zone.name}: ${zone.date}`, 'info', 'calendar-alt');
                
                // Animate marker
                const icon = this.querySelector('.marker-icon');
                icon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 300);
            });
            
            // Add hover effect to sync with location cards
            marker.addEventListener('mouseenter', function() {
                const locationId = this.getAttribute('data-location');
                highlightLocationCard(locationId, true);
            });
            
            marker.addEventListener('mouseleave', function() {
                const locationId = this.getAttribute('data-location');
                highlightLocationCard(locationId, false);
            });
        });
        
        // Draw canvas overlay (decorative grid)
        function drawMapCanvas() {
            const canvas = mapCanvas;
            const ctx = canvas.getContext('2d');
            const rect = mapWrapper.getBoundingClientRect();
            
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Draw subtle grid lines
            ctx.strokeStyle = '#9ec9c9';
            ctx.lineWidth = 0.5;
            ctx.globalAlpha = 0.2;
            
            // Vertical lines
            for (let i = 0; i <= 10; i++) {
                const x = (i / 10) * canvas.width;
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            
            // Horizontal lines
            for (let i = 0; i <= 8; i++) {
                const y = (i / 8) * canvas.height;
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }
            
            // Draw compass rose
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = '#9ec9c9';
            ctx.font = 'bold 20px Arial';
            ctx.fillText('N', canvas.width - 40, 40);
            
            // Draw scale
            ctx.beginPath();
            ctx.moveTo(canvas.width - 100, canvas.height - 30);
            ctx.lineTo(canvas.width - 20, canvas.height - 30);
            ctx.strokeStyle = '#9ec9c9';
            ctx.lineWidth = 2;
            ctx.globalAlpha = 0.5;
            ctx.stroke();
            
            ctx.fillStyle = '#9ec9c9';
            ctx.font = '12px Cormorant Garamond';
            ctx.fillText('100 miles', canvas.width - 80, canvas.height - 40);
        }
        
        // Draw canvas on load and resize
        drawMapCanvas();
        window.addEventListener('resize', drawMapCanvas);
        
        // Add zoom controls
        const zoomControls = document.createElement('div');
        zoomControls.className = 'map-zoom-controls';
        zoomControls.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20px;
            display: flex;
            gap: 0.5rem;
            z-index: 20;
        `;
        
        const zoomInBtn = document.createElement('button');
        zoomInBtn.innerHTML = '<i class="fas fa-plus"></i>';
        zoomInBtn.style.cssText = `
            width: 40px;
            height: 40px;
            background: white;
            border: none;
            border-radius: 50%;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            cursor: pointer;
            font-size: 1rem;
            color: #2c5a5a;
            transition: all 0.3s;
        `;
        
        const zoomOutBtn = document.createElement('button');
        zoomOutBtn.innerHTML = '<i class="fas fa-minus"></i>';
        zoomOutBtn.style.cssText = zoomInBtn.style.cssText;
        
        const resetZoomBtn = document.createElement('button');
        resetZoomBtn.innerHTML = '<i class="fas fa-compress-alt"></i>';
        resetZoomBtn.style.cssText = zoomInBtn.style.cssText;
        
        let currentZoom = 1;
        const maxZoom = 2;
        const minZoom = 0.8;
        
        zoomInBtn.addEventListener('click', () => {
            if (currentZoom < maxZoom) {
                currentZoom += 0.2;
                mapImage.style.transform = `scale(${currentZoom})`;
                mapImage.style.transition = 'transform 0.3s';
                showNotification('Zooming in...', 'info', 'search-plus');
            }
        });
        
        zoomOutBtn.addEventListener('click', () => {
            if (currentZoom > minZoom) {
                currentZoom -= 0.2;
                mapImage.style.transform = `scale(${currentZoom})`;
                mapImage.style.transition = 'transform 0.3s';
                showNotification('Zooming out...', 'info', 'search-minus');
            }
        });
        
        resetZoomBtn.addEventListener('click', () => {
            currentZoom = 1;
            mapImage.style.transform = 'scale(1)';
            showNotification('Map reset', 'info', 'sync-alt');
        });
        
        zoomControls.appendChild(zoomInBtn);
        zoomControls.appendChild(zoomOutBtn);
        zoomControls.appendChild(resetZoomBtn);
        mapWrapper.appendChild(zoomControls);
        
        // Add hover effects for zoom buttons
        [zoomInBtn, zoomOutBtn, resetZoomBtn].forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.background = '#9ec9c9';
                this.style.color = 'white';
                this.style.transform = 'scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.background = 'white';
                this.style.color = '#2c5a5a';
                this.style.transform = 'scale(1)';
            });
        });
    }
    
    /**
     * Highlights corresponding location card when hovering over map marker
     * @param {string} locationId - ID of the location
     * @param {boolean} highlight - Whether to highlight or remove highlight
     */
    function highlightLocationCard(locationId, highlight = true) {
        const locationMap = {
            'oxford': 0,
            'london': 1,
            'edinburgh': 2,
            'york': 3,
            'bath': 4
        };
        
        const index = locationMap[locationId];
        if (index !== undefined && eventLocations[index]) {
            const card = eventLocations[index];
            
            if (highlight) {
                card.style.transform = 'translateY(-5px) scale(1.05)';
                card.style.borderColor = '#9ec9c9';
                card.style.boxShadow = '0 20px 30px rgba(158, 201, 201, 0.3)';
            } else {
                card.style.transform = '';
                card.style.borderColor = '';
                card.style.boxShadow = '';
            }
        }
    }
    
    // ==========================================================================
    // 3. FORM VALIDATION & SUBMISSION
    // ==========================================================================
    /**
     * Handles contact form submission with validation
     * Features:
     * - Real-time validation
     * - Privacy policy agreement required
     * - Success/error notifications
     * - Form reset after submission
     */
    
    if (contactForm) {
        // Real-time validation
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            formInputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            // Check privacy policy agreement
            if (!privacyCheckbox.checked) {
                isValid = false;
                showFieldError(privacyCheckbox, 'You must agree to the privacy policy');
            } else {
                clearFieldError(privacyCheckbox);
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual AJAX in production)
                setTimeout(() => {
                    // Success
                    showNotification('Thank you for your message! I\'ll respond within 3-5 business days.', 'success', 'check-circle');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Clear all error states
                    formInputs.forEach(input => {
                        input.classList.remove('error', 'success');
                    });
                    
                    // Track form submission (analytics)
                    trackFormSubmission();
                    
                }, 1500);
            } else {
                showNotification('Please fill in all required fields correctly.', 'error', 'exclamation-circle');
            }
        });
    }
    
    /**
     * Validates individual form field
     * @param {HTMLElement} field - The field to validate
     * @returns {boolean} - True if valid
     */
    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error/success classes
        field.classList.remove('error', 'success');
        
        // Check if field is required
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        else if (field.type === 'email' && value) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Name validation (minimum length)
        else if ((field.id === 'first-name' || field.id === 'last-name') && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
        
        // Message validation (minimum length)
        else if (field.id === 'message' && value.length < 20) {
            isValid = false;
            errorMessage = 'Message must be at least 20 characters';
        }
        
        // Apply validation styles
        if (value) {
            if (isValid) {
                field.classList.add('success');
                clearFieldError(field);
            } else {
                field.classList.add('error');
                showFieldError(field, errorMessage);
            }
        }
        
        return isValid;
    }
    
    /**
     * Shows error message for a field
     * @param {HTMLElement} field - The field with error
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        // Remove existing error message
        clearFieldError(field);
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.85rem;
            margin-top: 0.3rem;
            font-family: 'Cormorant Garamond', serif;
        `;
        
        field.parentNode.appendChild(errorDiv);
    }
    
    /**
     * Clears error message for a field
     * @param {HTMLElement} field - The field to clear
     */
    function clearFieldError(field) {
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    /**
     * Tracks form submission (analytics placeholder)
     */
    function trackFormSubmission() {
        console.log('Contact form submitted');
        // In production, send to analytics
    }
    
    // ==========================================================================
    // 4. INFO CARD INTERACTIONS
    // ==========================================================================
    /**
     * Adds hover effects and click handling to info cards
     */
    
    infoCards.forEach(card => {
        const icon = card.querySelector('i');
        const link = card.querySelector('a');
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.3s';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
            }
        });
        
        if (link) {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
    
    // ==========================================================================
    // 5. LOCATION CARD INTERACTIONS
    // ==========================================================================
    /**
     * Handles event location card interactions
     */
    
    locationCards.forEach((card, index) => {
        const icon = card.querySelector('i');
        const locationId = ['oxford', 'london', 'edinburgh', 'york', 'bath'][index];
        
        card.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s';
            }
            
            // Highlight corresponding map marker
            const marker = document.querySelector(`.map-marker-${locationId}`);
            if (marker) {
                const markerIcon = marker.querySelector('.marker-icon');
                markerIcon.style.transform = 'scale(1.2)';
                markerIcon.style.background = '#2c5a5a';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            
            // Remove highlight from map marker
            const marker = document.querySelector(`.map-marker-${locationId}`);
            if (marker) {
                const markerIcon = marker.querySelector('.marker-icon');
                markerIcon.style.transform = '';
                markerIcon.style.background = '';
            }
        });
        
        card.addEventListener('click', function() {
            const eventName = this.querySelector('h4').textContent;
            const eventDate = this.querySelector('p').textContent;
            showNotification(`${eventName}: ${eventDate}`, 'info', 'calendar-alt');
            
            // Scroll to map
            mapWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Highlight map marker
            const marker = document.querySelector(`.map-marker-${locationId}`);
            if (marker) {
                const icon = marker.querySelector('.marker-icon');
                icon.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    icon.style.transform = '';
                }, 500);
            }
        });
    });
    
    // ==========================================================================
    // 6. FAQ ITEM INTERACTIONS
    // ==========================================================================
    /**
     * Adds hover effects to FAQ items
     */
    
    faqItems.forEach(item => {
        const icon = item.querySelector('i');
        
        item.addEventListener('mouseenter', function() {
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.backgroundColor = '#9ec9c9';
                icon.style.color = 'white';
                icon.style.transition = 'all 0.3s';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0)';
                icon.style.backgroundColor = '';
                icon.style.color = '#9ec9c9';
            }
        });
    });
    
    // ==========================================================================
    // 7. SOCIAL LINKS INTERACTIONS
    // ==========================================================================
    /**
     * Handles social media link interactions
     */
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('aria-label');
            showNotification(`Connecting to ${platform}...`, 'info', 'external-link-alt');
            
            // In production, this would open the actual link
            setTimeout(() => {
                window.open('#', '_blank');
            }, 500);
        });
    });
    
    // ==========================================================================
    // 8. NOTIFICATION SYSTEM
    // ==========================================================================
    
    /**
     * Shows a temporary notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     * @param {string} icon - FontAwesome icon name
     */
    function showNotification(message, type, icon = 'info-circle') {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.contact-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `contact-notification notification-${type}`;
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
            <button class="notification-close"><i class="fas fa-times"></i></button>
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
            gap: 1rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            z-index: 10000;
            font-family: 'Cormorant Garamond', serif;
            font-size: 1rem;
            animation: slideInRight 0.3s ease;
            border-left: 4px solid white;
            max-width: 400px;
        `;
        
        // Style the close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: transparent;
            border: none;
            color: white;
            cursor: pointer;
            font-size: 1.1rem;
            opacity: 0.8;
            transition: opacity 0.3s;
            margin-left: auto;
            padding: 0 0 0 1rem;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.8';
        });
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        document.body.appendChild(notification);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
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
        
        .contact-form input.error,
        .contact-form select.error,
        .contact-form textarea.error {
            border-color: #f44336;
            background-color: rgba(244, 67, 54, 0.05);
        }
        
        .contact-form input.success,
        .contact-form select.success,
        .contact-form textarea.success {
            border-color: #4CAF50;
            background-color: rgba(76, 175, 80, 0.05);
        }
        
        .contact-form input:focus.error,
        .contact-form select:focus.error,
        .contact-form textarea:focus.error {
            box-shadow: 0 0 0 4px rgba(244, 67, 54, 0.1);
        }
        
        .contact-form input:focus.success,
        .contact-form select:focus.success,
        .contact-form textarea:focus.success {
            box-shadow: 0 0 0 4px rgba(76, 175, 80, 0.1);
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
    // 11. TOUCH DEVICE SUPPORT
    // ==========================================================================
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        const touchElements = [...infoCards, ...locationCards, ...faqItems];
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-3px)';
            });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
        
        // Adjust map markers for touch
        const markers = document.querySelectorAll('.map-marker');
        markers.forEach(marker => {
            marker.addEventListener('touchstart', function(e) {
                e.preventDefault();
                const tooltip = this.querySelector('.marker-tooltip');
                if (tooltip) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                }
            });
            
            marker.addEventListener('touchend', function() {
                const tooltip = this.querySelector('.marker-tooltip');
                if (tooltip) {
                    setTimeout(() => {
                        tooltip.style.opacity = '';
                        tooltip.style.visibility = '';
                    }, 2000);
                }
            });
        });
    }
    
    // ==========================================================================
    // 12. KEYBOARD NAVIGATION
    // ==========================================================================
    /**
     * Allows keyboard navigation through contact options
     */
    
    const focusableElements = [...infoCards, ...locationCards, ...faqItems];
    
    focusableElements.forEach((element, index) => {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
            
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const next = focusableElements[index + 1];
                if (next) next.focus();
            }
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prev = focusableElements[index - 1];
                if (prev) prev.focus();
            }
        });
    });
    
    // ==========================================================================
    // 13. NEWSLETTER CHECKBOX TRACKING
    // ==========================================================================
    
    if (newsletterCheckbox) {
        newsletterCheckbox.addEventListener('change', function() {
            if (this.checked) {
                console.log('Newsletter signup requested');
                // In production, this could trigger analytics
            }
        });
    }
    
    // ==========================================================================
    // 14. INITIALIZE
    // ==========================================================================
    
    console.log('Contact page initialized with interactive map');
});

