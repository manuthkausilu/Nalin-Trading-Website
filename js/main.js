// Main JavaScript for Nalin Trading website

// Global functions for section management
function showSection(sectionId) {
    console.log('Switching to section:', sectionId);
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        
        // Clear all active states first - ENHANCED
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('nav-active');
            btn.style.transform = '';
            btn.style.animation = '';
            btn.style.removeProperty('background');
            btn.style.removeProperty('color');
            btn.style.removeProperty('box-shadow');
        });
        
        // Find target button with multiple methods - IMPROVED
        let targetButton = null;
        
        // Method 1: Direct ID lookup
        const buttonId = `${sectionId}-nav-btn`;
        targetButton = document.getElementById(buttonId);
        
        // Method 2: Onclick attribute search if ID fails
        if (!targetButton) {
            targetButton = document.querySelector(`[onclick*="showSection('${sectionId}')"]`);
        }
        
        // Method 3: Text content fallback
        if (!targetButton) {
            const navButtons = document.querySelectorAll('.nav-btn');
            navButtons.forEach(btn => {
                const btnText = btn.textContent.toLowerCase().trim();
                if ((sectionId === 'home' && (btnText.includes('home') || btnText.includes('ホーム'))) ||
                    (sectionId === 'about' && (btnText.includes('about') || btnText.includes('会社概要'))) ||
                    (sectionId === 'services' && (btnText.includes('services') || btnText.includes('サービス'))) ||
                    (sectionId === 'gallery' && (btnText.includes('portfolio') || btnText.includes('実績'))) ||
                    (sectionId === 'contact' && (btnText.includes('contact') || btnText.includes('お問い合わせ')))) {
                    targetButton = btn;
                }
            });
        }
        
        // Apply active state with force - ENHANCED
        if (targetButton && targetButton.classList.contains('nav-btn')) {
            console.log(`Applying ENHANCED active state to button for section: ${sectionId}`);
            
            // Force remove any conflicting styles
            targetButton.removeAttribute('style');
            
            // Add temporary click effect
            targetButton.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                // Force apply active class and styles
                targetButton.classList.add('nav-active');
                
                // Apply inline styles to override any conflicts
                targetButton.style.cssText = `
                    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
                    color: white !important;
                    font-weight: 700 !important;
                    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), 0 0 0 2px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                    transform: translateY(-2px) scale(1.05) !important;
                    position: relative !important;
                    z-index: 10 !important;
                `;
                
                // Add pulse animation
                targetButton.style.animation = 'activePulse 0.6s ease-out';
                setTimeout(() => {
                    targetButton.style.animation = '';
                }, 600);
                
                console.log(`Active state applied successfully to ${sectionId} button`);
            }, 100);
        } else {
            console.error(`FAILED: No navigation button found for section: ${sectionId}`);
        }
        
        // Close mobile menu if open
        const navLinks = document.getElementById('navLinks');
        if (navLinks) {
            navLinks.classList.remove('show');
        }
        
        // Scroll to top and animate
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(animateElements, 200);
    }
}

function toggleLanguage(lang) {
    console.log('Switching language to:', lang);
    
    if (lang === 'en') {
        document.querySelectorAll('.en').forEach(el => el.classList.remove('hidden'));
        document.querySelectorAll('.jp').forEach(el => el.classList.add('hidden'));
    } else {
        document.querySelectorAll('.en').forEach(el => el.classList.add('hidden'));
        document.querySelectorAll('.jp').forEach(el => el.classList.remove('hidden'));
    }
    
    // Update lang button active state
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    if (navLinks) {
        navLinks.classList.toggle('show');
    }
}

// Add smooth scroll to content function
function scrollToContent() {
    const contentSection = document.querySelector('.content-section');
    if (contentSection) {
        contentSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Enhanced animate elements with better scroll detection
function animateElements() {
    const elements = document.querySelectorAll('.animate-in, .slide-left, .slide-right');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Add CSS animation for active pulse effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes activePulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1.05); }
        }
    `;
    document.head.appendChild(style);
    
    // Ensure home section is visible by default
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        console.log('Home section activated');
    }
    
    // Force set home button as active - ENHANCED
    setTimeout(() => {
        const homeButton = document.getElementById('home-nav-btn');
        if (homeButton) {
            console.log('Force activating home button...');
            
            // Clear all nav buttons first
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('nav-active');
                btn.removeAttribute('style');
            });
            
            // Force apply active state to home button
            homeButton.classList.add('nav-active');
            homeButton.style.cssText = `
                background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%) !important;
                color: white !important;
                font-weight: 700 !important;
                box-shadow: 0 4px 16px rgba(59, 130, 246, 0.4), 0 0 0 2px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2) !important;
                transform: translateY(-2px) scale(1.05) !important;
                position: relative !important;
                z-index: 10 !important;
            `;
            
            console.log('Home button force activated');
        }
    }, 200);
    
    // Initialize animations
    setTimeout(animateElements, 100);
    
    // Add click handler for scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', scrollToContent);
        scrollIndicator.style.cursor = 'pointer';
    }
    
    // Enhanced scroll animations
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                animateElements();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    console.log('Initialization complete');
});

// EmailJS contact form handler
document.addEventListener('DOMContentLoaded', function() {
    // EmailJS form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const statusDiv = document.getElementById('emailStatus');
            statusDiv.textContent = '';
            statusDiv.style.color = '';

            // Collect form data (only name, email, subject, message)
            const formData = {
                name: contactForm.querySelector('input[placeholder="Enter your name"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                subject: contactForm.querySelector('input[placeholder="Subject"]').value,
                message: contactForm.querySelector('textarea').value
            };

            // Validate required fields
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                statusDiv.textContent = 'Please fill in all required fields.';
                statusDiv.style.color = '#dc2626';
                return;
            }

            // Send email via EmailJS
            emailjs.send('service_xa19gum', 'template_qewprog', formData)
                .then(function() {
                    statusDiv.textContent = 'Message sent successfully!';
                    statusDiv.style.color = '#16a34a';
                    contactForm.reset();
                }, function(error) {
                    statusDiv.textContent = 'Failed to send. Please try again.';
                    statusDiv.style.color = '#dc2626';
                });
        });
    }
});

// Make functions globally available
window.showSection = showSection;
window.toggleLanguage = toggleLanguage;
window.toggleMobileMenu = toggleMobileMenu;
window.animateElements = animateElements;
window.scrollToContent = scrollToContent;
window.animateElements = animateElements;
window.scrollToContent = scrollToContent;
