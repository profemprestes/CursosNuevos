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

    // Terminal typing animation
    const terminalPrompt = document.querySelector('.terminal-prompt');
    const terminalCommands = [
        'ls -la',
        'cd /etc',
        'cat /etc/passwd',
        'sudo apt update',
        'mkdir proyecto_linux',
        'chmod 755 script.sh',
        './script.sh'
    ];

    let currentCommandIndex = 0;
    let isTyping = true;
    let charIndex = 0;
    let currentCommand = '';

    function typeCommand() {
        if (!terminalPrompt) return;
        
        if (isTyping) {
            if (charIndex < terminalCommands[currentCommandIndex].length) {
                currentCommand += terminalCommands[currentCommandIndex][charIndex];
                terminalPrompt.innerHTML = `usuario@linux:~$ ${currentCommand}<span class="terminal-cursor">_</span>`;
                charIndex++;
                setTimeout(typeCommand, 100 + Math.random() * 100);
            } else {
                isTyping = false;
                setTimeout(typeCommand, 2000);
            }
        } else {
            currentCommand = '';
            charIndex = 0;
            currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
            isTyping = true;
            terminalPrompt.innerHTML = `usuario@linux:~$ <span class="terminal-cursor">_</span>`;
            setTimeout(typeCommand, 500);
        }
    }

    typeCommand();

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

    document.addEventListener('DOMContentLoaded', () => {
        contentCards.forEach(card => {
            observer.observe(card);
        });
    });

    // Estilo para tarjetas animadas cuando son visibles
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .content-card.animated {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .back-to-top {
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }
        </style>
    `);

    // Interactividad para los elementos de method-item
    document.querySelectorAll('.method-item, .practice-item, .config-card').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Animación para el encabezado y el botón en el hero
    const heroHeader = document.querySelector('.unit-header h1');
    const heroButton = document.querySelector('.animated-btn');

    // Función para animar el encabezado y el botón
    function animateHero() {
        heroHeader.style.opacity = '1';
        heroHeader.style.transform = 'translateY(0)';
        heroButton.style.opacity = '1';
    }

    // Inicializar la opacidad y la posición
    heroHeader.style.opacity = '0';
    heroHeader.style.transform = 'translateY(-20px)';
    heroButton.style.opacity = '0';

    // Llamar a la función de animación después de un breve retraso
    setTimeout(animateHero, 500); // Esperar medio segundo antes de animar
});