document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active section in navigation
    const navLinks = document.querySelectorAll('#unit-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                document.querySelector(`a[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`a[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    highlightNavigation(); // Call once to set initial state

    // Mostrar/ocultar botón de volver arriba
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 500) {
            backToTopButton.style.opacity = '1';
            backToTopButton.style.pointerEvents = 'all';
        } else {
            backToTopButton.style.opacity = '0';
            backToTopButton.style.pointerEvents = 'none';
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton(); // Call once to set initial state

    // Animación para secciones al hacer scroll
    const contentCards = document.querySelectorAll('.content-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    contentCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Estilo para tarjetas animadas cuando son visibles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .content-card.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Interactividad para los elementos
    document.querySelectorAll('.user-type, .tool-card, .policy-option, .practice-item, .group-type, .command-item, .file-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Terminal console typing animation (simplified for this version)
    const terminalBodies = document.querySelectorAll('.terminal-body pre code');
    
    terminalBodies.forEach(terminal => {
        const originalText = terminal.textContent;
        terminal.textContent = '';
        let charIndex = 0;
        
        function typeText() {
            if (charIndex < originalText.length) {
                terminal.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeText, 15 + Math.random() * 10);
            }
        }
        
        // Start typing animation when terminal is in viewport
        const terminalObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeText, 500);
                    terminalObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        terminalObserver.observe(terminal);
    });
});