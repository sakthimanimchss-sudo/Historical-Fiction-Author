/**
 * MEMBER LOGIN PAGE JAVASCRIPT
 * Eleanor Hartwell - Readers Club Login
 * Handles login form validation, password visibility toggle, modal interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // 1. INITIALIZATION & VARIABLES
    // ==========================================================================
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');
    const rememberCheckbox = document.getElementById('remember');
    const forgotPasswordLink = document.getElementById('forgotPassword');
    const forgotModal = document.getElementById('forgotModal');
    const modalClose = document.querySelector('.modal-close');
    const forgotForm = document.getElementById('forgotForm');
    const backToLogin = document.querySelector('.back-to-login');
    const socialBtns = document.querySelectorAll('.social-btn');
    const activityCards = document.querySelectorAll('.activity-card');
    const loginLogo = document.querySelector('.login-logo');
    const backToHomeLink = document.querySelector('.back-to-home a');
    
    // Track login attempts for security
    let loginAttempts = 0;
    const MAX_ATTEMPTS = 5;
    
    // ==========================================================================
    // 2. PASSWORD VISIBILITY TOGGLE
    // ==========================================================================
    /**
     * Toggles password field visibility with eye icon
     * Features:
     * - Toggle between password and text type
     * - Eye icon changes between fa-eye and fa-eye-slash
     */
    
    if (togglePasswordBtn && passwordInput) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            }
            
            // Announce for screen readers
            passwordInput.setAttribute('aria-label', type === 'password' ? 'Password hidden' : 'Password visible');
        });
    }
    
    // ==========================================================================
    // 3. FORM VALIDATION & SUBMISSION
    // ==========================================================================
    /**
     * Handles login form submission with validation
     * Features:
     * - Email format validation
     * - Password length check
     * - Remember me functionality
     * - Rate limiting for security
     */
    
    if (loginForm) {
        // Real-time email validation
        if (emailInput) {
            emailInput.addEventListener('blur', function() {
                validateEmail(this);
            });
            
            emailInput.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateEmail(this);
                }
            });
        }
        
        // Real-time password validation
        if (passwordInput) {
            passwordInput.addEventListener('blur', function() {
                validatePassword(this);
            });
            
            passwordInput.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validatePassword(this);
                }
            });
        }
        
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Check rate limiting
            if (loginAttempts >= MAX_ATTEMPTS) {
                showNotification('Too many login attempts. Please try again in 15 minutes.', 'error');
                return;
            }
            
            // Validate fields
            const isEmailValid = emailInput ? validateEmail(emailInput) : false;
            const isPasswordValid = passwordInput ? validatePassword(passwordInput) : false;
            
            if (isEmailValid && isPasswordValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
                submitBtn.disabled = true;
                
                // Simulate login (replace with actual AJAX in production)
                setTimeout(() => {
                    // Check demo credentials (for testing only)
                    const email = emailInput.value.trim();
                    const password = passwordInput.value.trim();
                    
                    if (email === 'demo@eleanorhartwell.com' && password === 'Reader2025!') {
                        // Successful login
                        showNotification('Login successful! Redirecting to member portal...', 'success');
                        
                        // Handle remember me
                        if (rememberCheckbox && rememberCheckbox.checked) {
                            localStorage.setItem('rememberedEmail', email);
                        } else {
                            localStorage.removeItem('rememberedEmail');
                        }
                        
                        // Redirect to member dashboard
                        setTimeout(() => {
                            window.location.href = 'member-dashboard.html';
                        }, 1500);
                    } else {
                        // Failed login
                        loginAttempts++;
                        const remainingAttempts = MAX_ATTEMPTS - loginAttempts;
                        
                        if (remainingAttempts > 0) {
                            showNotification(`Invalid email or password. ${remainingAttempts} attempts remaining.`, 'error');
                        } else {
                            showNotification('Account temporarily locked. Please try again later.', 'error');
                        }
                        
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                        
                        // Shake animation on error
                        loginForm.classList.add('shake');
                        setTimeout(() => {
                            loginForm.classList.remove('shake');
                        }, 500);
                    }
                }, 1500);
            } else {
                showNotification('Please enter a valid email and password.', 'error');
            }
        });
    }
    
    /**
     * Validates email format
     * @param {HTMLElement} field - Email input field
     * @returns {boolean} - True if valid
     */
    function validateEmail(field) {
        if (!field) return false;
        
        const value = field.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        field.classList.remove('error', 'success');
        clearFieldError(field);
        
        if (!value) {
            field.classList.add('error');
            showFieldError(field, 'Email is required');
            return false;
        } else if (!emailPattern.test(value)) {
            field.classList.add('error');
            showFieldError(field, 'Please enter a valid email address');
            return false;
        } else {
            field.classList.add('success');
            return true;
        }
    }
    
    /**
     * Validates password
     * @param {HTMLElement} field - Password input field
     * @returns {boolean} - True if valid
     */
    function validatePassword(field) {
        if (!field) return false;
        
        const value = field.value.trim();
        
        field.classList.remove('error', 'success');
        clearFieldError(field);
        
        if (!value) {
            field.classList.add('error');
            showFieldError(field, 'Password is required');
            return false;
        } else if (value.length < 6) {
            field.classList.add('error');
            showFieldError(field, 'Password must be at least 6 characters');
            return false;
        } else {
            field.classList.add('success');
            return true;
        }
    }
    
    /**
     * Shows error message for a field
     * @param {HTMLElement} field - The field with error
     * @param {string} message - Error message
     */
    function showFieldError(field, message) {
        clearFieldError(field);
        
        const parent = field.closest('.input-with-icon, .form-group');
        if (!parent) return;
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #f44336;
            font-size: 0.85rem;
            margin-top: 0.3rem;
            font-family: 'Cormorant Garamond', serif;
        `;
        
        parent.appendChild(errorDiv);
    }
    
    /**
     * Clears error message for a field
     * @param {HTMLElement} field - The field to clear
     */
    function clearFieldError(field) {
        if (!field) return;
        
        const parent = field.closest('.input-with-icon, .form-group');
        if (!parent) return;
        
        const existingError = parent.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    }
    
    // ==========================================================================
    // 4. REMEMBER ME FUNCTIONALITY
    // ==========================================================================
    /**
     * Loads remembered email on page load
     */
    
    function loadRememberedEmail() {
        const rememberedEmail = localStorage.getItem('rememberedEmail');
        if (rememberedEmail && emailInput) {
            emailInput.value = rememberedEmail;
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
            
            // Trigger validation to show success state
            validateEmail(emailInput);
        }
    }
    
    loadRememberedEmail();
    
    // ==========================================================================
    // 5. FORGOT PASSWORD MODAL
    // ==========================================================================
    /**
     * Handles forgot password modal
     * Features:
     * - Open/close modal
     * - Form validation
     * - Email submission
     */
    
    if (forgotPasswordLink && forgotModal) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            openModal(forgotModal);
        });
    }
    
    if (modalClose && forgotModal) {
        modalClose.addEventListener('click', function() {
            closeModal(forgotModal);
        });
    }
    
    if (backToLogin && forgotModal) {
        backToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(forgotModal);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === forgotModal) {
            closeModal(forgotModal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && forgotModal && forgotModal.classList.contains('show')) {
            closeModal(forgotModal);
        }
    });
    
    /**
     * Opens modal
     * @param {HTMLElement} modal - Modal element
     */
    function openModal(modal) {
        if (!modal) return;
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Closes modal
     * @param {HTMLElement} modal - Modal element
     */
    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    // Forgot password form submission
    if (forgotForm) {
        forgotForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value.trim();
            
            if (email && isValidEmail(email)) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate sending reset email
                setTimeout(() => {
                    showNotification('Password reset link sent to your email!', 'success');
                    closeModal(forgotModal);
                    
                    // Reset form
                    emailInput.value = '';
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
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
    
    // ==========================================================================
    // 6. SOCIAL LOGIN BUTTONS
    // ==========================================================================
    /**
     * Handles social login interactions
     */
    
    if (socialBtns.length > 0) {
        socialBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                
                const platform = this.classList.contains('google') ? 'Google' :
                                 this.classList.contains('facebook') ? 'Facebook' :
                                 this.classList.contains('twitter') ? 'Twitter' : 'Goodreads';
                
                showNotification(`Sign in with ${platform} coming soon!`, 'info');
                
                // Animate button
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            });
        });
    }
    
    // ==========================================================================
    // 7. ACTIVITY CARD INTERACTIONS
    // ==========================================================================
    /**
     * Adds hover effects and click handlers to activity cards
     */
    
    if (activityCards.length > 0) {
        activityCards.forEach(card => {
            card.addEventListener('click', function() {
                const text = this.querySelector('.activity-text')?.textContent || 'Activity';
                showNotification(`Activity: ${text.substring(0, 50)}...`, 'info');
            });
            
            // Keyboard accessibility
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // ==========================================================================
    // 8. LOGO AND BACK TO HOME LINKS
    // ==========================================================================
    /**
     * Ensures logo and back to home links work properly
     */
    
    if (loginLogo) {
        loginLogo.addEventListener('click', function(e) {
            // Link is handled by href attribute, but we can add tracking if needed
            console.log('Logo clicked - navigating to home');
        });
    }
    
    if (backToHomeLink) {
        backToHomeLink.addEventListener('click', function(e) {
            console.log('Back to home clicked - navigating to index');
        });
    }
    
    // ==========================================================================
    // 9. NOTIFICATION SYSTEM
    // ==========================================================================
    
    /**
     * Shows a temporary notification
     * @param {string} message - Message to display
     * @param {string} type - Type of notification (success, error, info)
     */
    function showNotification(message, type) {
        // Remove any existing notifications
        const existingNotification = document.querySelector('.login-notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `login-notification notification-${type}`;
        
        // Set icon based on type
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
            <button class="notification-close" aria-label="Close notification"><i class="fas fa-times"></i></button>
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
        if (closeBtn) {
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
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            });
        }
        
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
    // 10. ADD ANIMATION STYLES
    // ==========================================================================
    
    // Check if styles already exist to avoid duplicates
    if (!document.getElementById('login-animation-styles')) {
        const style = document.createElement('style');
        style.id = 'login-animation-styles';
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
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .shake {
                animation: shake 0.5s ease;
            }
            
            .login-form input.error {
                border-color: #f44336 !important;
                background-color: rgba(244, 67, 54, 0.05);
            }
            
            .login-form input.success {
                border-color: #4CAF50 !important;
                background-color: rgba(76, 175, 80, 0.05);
            }
            
            .field-error {
                color: #f44336;
                font-size: 0.85rem;
                margin-top: 0.3rem;
                font-family: 'Cormorant Garamond', serif;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ==========================================================================
    // 11. PARALLAX EFFECT FOR LOGIN HERO
    // ==========================================================================
    
    const loginHero = document.querySelector('.login-hero');
    
    if (loginHero && window.innerWidth > 768) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < loginHero.offsetHeight) {
                const speed = 0.3;
                loginHero.style.backgroundPosition = `center ${scrollPosition * speed}px`;
            }
        });
    }
    
    // ==========================================================================
    // 12. TOUCH DEVICE SUPPORT
    // ==========================================================================
    
    function isTouchDevice() {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    }
    
    if (isTouchDevice()) {
        // Simplify hover effects for touch devices
        const touchElements = [...activityCards];
        touchElements.forEach(el => {
            el.addEventListener('touchstart', function() {
                this.style.transform = 'translateY(-3px)';
            }, { passive: true });
            
            el.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }, { passive: true });
        });
    }
    
    // ==========================================================================
    // 13. KEYBOARD NAVIGATION FOR ACTIVITY CARDS
    // ==========================================================================
    
    // Already handled in activity cards section
    
    // ==========================================================================
    // 14. INITIALIZE
    // ==========================================================================
    
    console.log('Member login page initialized');
    
    // Pre-focus email field for better UX
    if (emailInput && !emailInput.value) {
        setTimeout(() => {
            emailInput.focus();
        }, 500);
    }
});

