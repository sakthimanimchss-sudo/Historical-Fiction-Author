/**
 * Eleanor Hartwell - Historical Fiction Author Website
 * Enhanced JavaScript with animations, scroll effects, and improved UX
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ===== THEME TOGGLE WITH SYSTEM PREFERENCE DETECTION =====
    const themeToggle = document.getElementById('themeToggle');
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    const htmlElement = document.documentElement;

    // Check system preference
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else {
        // Use system preference if no saved theme
        const systemTheme = prefersDarkScheme.matches ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', systemTheme);
        localStorage.setItem('theme', systemTheme);
    }

    // Theme toggle function
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    // Add theme toggle listeners
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // ===== RTL TOGGLE =====
    const rtlToggle = document.getElementById('rtlToggle');
    const mobileRtlToggle = document.getElementById('mobileRtlToggle');

    function toggleRTL() {
        const currentDir = htmlElement.getAttribute('dir') || 'ltr';
        const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', newDir);
        localStorage.setItem('dir', newDir);
    }

    // Initialize RTL
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        htmlElement.setAttribute('dir', savedDir);
    }

    // Add RTL toggle listeners
    if (rtlToggle) {
        rtlToggle.addEventListener('click', toggleRTL);
    }
    if (mobileRtlToggle) {
        mobileRtlToggle.addEventListener('click', toggleRTL);
    }

    // ===== MOBILE MENU WITH ANIMATIONS =====
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mobileNav = document.getElementById('mobileNav');
    const body = document.body;

    if (hamburgerMenu && mobileNav) {
        // Toggle menu
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            body.classList.toggle('menu-open');
            body.style.overflow = body.classList.contains('menu-open') ? 'hidden' : '';
            
            // Announce menu state for accessibility
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });

        // Mobile dropdown handling
        document.querySelectorAll('.mobile-nav .dropdown-toggle').forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.closest('.dropdown');
                dropdown.classList.toggle('active');
            });
        });

        // Close menu when clicking links
        mobileNav.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });

        // Close on outside click
        document.addEventListener('click', function(e) {
            if (body.classList.contains('menu-open')) {
                if (!mobileNav.contains(e.target) && !hamburgerMenu.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && body.classList.contains('menu-open')) {
                closeMobileMenu();
            }
        });

function closeMobileMenu() {
    if (!hamburgerMenu || !mobileNav) return;

    hamburgerMenu.classList.remove('active');
    mobileNav.classList.remove('active');
    body.classList.remove('menu-open');
    body.style.overflow = '';

    mobileNav.querySelectorAll('.dropdown').forEach(dropdown => {
        dropdown.classList.remove('active');
    });
}
    }

    // ===== SCROLL ANIMATIONS =====
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const animation = element.dataset.animation || 'fadeInUp';
                    element.classList.add(animation);
                    
                    // Unobserve after animation
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        animateElements.forEach(element => observer.observe(element));
    }

    // ===== NEWSLETTER FORM =====
    const newsletterForms = document.querySelectorAll('.signup-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            // Simple validation
            if (!isValidEmail(email)) {
                alert('Please enter a valid email address');
                emailInput.focus();
                return;
            }
            
            // Success message
            alert('Thank you for subscribing! Please check your email to confirm.');
            this.reset();
        });
    });

    // Email validation helper
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // ===== ACTIVE NAVIGATION HIGHLIGHTING =====
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        document.querySelectorAll('.nav-menu a, .mobile-nav-menu a').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    setActiveNavLink();

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 767) {
                // Close mobile menu on resize to desktop
                if (hamburgerMenu && mobileNav && mobileNav.classList.contains('active')) {
                    closeMobileMenu();
                }
            }
        }, 250);
    });

    // ===== INITIALIZATION =====
    console.log('Eleanor Hartwell website initialized');
});


/**
 * UNIVERSAL ACTIVE MENU HANDLER
 * Works for all pages, dropdowns, submenus, local & live servers
 */

document.addEventListener("DOMContentLoaded", function () {

    // ================================
    // GET CURRENT PAGE SAFELY
    // ================================
    const currentURL = window.location.href;
    let currentPage = currentURL.split("/").pop().split("?")[0];

    if (currentPage === "" || currentPage === "/") {
        currentPage = "index.html";
    }

    console.log("Current Page:", currentPage);

    // ================================
    // REMOVE OLD ACTIVE CLASSES
    // ================================
    document.querySelectorAll("nav a").forEach(link => {
        link.classList.remove("active");
    });

    document.querySelectorAll(".dropdown, .dropdown-submenu").forEach(item => {
        item.classList.remove("has-active-child");
    });

    // ================================
    // ACTIVATE MATCHING LINKS
    // ================================
    document.querySelectorAll("nav a").forEach(link => {

        const href = link.getAttribute("href");
        if (!href || href === "#") return;

        let cleanHref = href.split("/").pop();

        if (cleanHref === currentPage) {

            // Activate link
            link.classList.add("active");

            // Activate parent dropdown
            const dropdownParent = link.closest(".dropdown, .dropdown-submenu");
            if (dropdownParent) {
                dropdownParent.classList.add("has-active-child");

                const mainParent = dropdownParent.closest(".dropdown");
                if (mainParent) {
                    mainParent.classList.add("has-active-child");
                }
            }
        }
    });

    // ================================
    // SPECIAL SECTION MATCHING
    // ================================

    // Research subpages
    if (currentURL.includes("/research/")) {
        activateParent("research.html");
    }

    // Articles subpages
    if (currentURL.includes("/articles/")) {
        activateParent("articles.html");
    }

    // Series pages
    if (currentURL.includes("/series/")) {
        activateParent("books.html");
    }

    function activateParent(fileName) {
        document.querySelectorAll(`nav a[href="${fileName}"]`).forEach(link => {
            link.classList.add("active");

            const dropdownParent = link.closest(".dropdown");
            if (dropdownParent) {
                dropdownParent.classList.add("has-active-child");
            }
        });
    }

    console.log("Active menu applied successfully");
});
