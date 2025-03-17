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
            
            .back-to-top {
                opacity: 0;
                transition: all 0.3s ease;
                pointer-events: none;
            }
        </style>
    `);

    // Interacción con los elementos de las 4P
    const pCircles = document.querySelectorAll('.p-circle');
    pCircles.forEach(circle => {
        circle.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const collapseElement = bootstrap.Collapse.getOrCreateInstance(document.getElementById(targetId));
            collapseElement.toggle();
        });
    });

    // Animación de las líneas de conexión en el diagrama 4P
    const pLines = document.querySelectorAll('.p-line');
    
    function animatePLines() {
        pLines.forEach((line, index) => {
            setTimeout(() => {
                const from = line.getAttribute('x1');
                const to = line.getAttribute('x2');
                const isVertical = from === to;
                
                if (isVertical) {
                    const y1 = line.getAttribute('y1');
                    const y2 = line.getAttribute('y2');
                    line.setAttribute('y2', y1);
                    setTimeout(() => {
                        line.style.transition = `all 0.8s ease`;
                        line.setAttribute('y2', y2);
                    }, 100);
                } else {
                    const x1 = line.getAttribute('x1');
                    const x2 = line.getAttribute('x2');
                    line.setAttribute('x2', x1);
                    setTimeout(() => {
                        line.style.transition = `all 0.8s ease`;
                        line.setAttribute('x2', x2);
                    }, 100);
                }
            }, index * 300);
        });
    }
    
    // Observe cuando el diagrama 4P está visible
    const pDiagram = document.querySelector('.p-diagram');
    if (pDiagram) {
        const diagramObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animatePLines();
                diagramObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        diagramObserver.observe(pDiagram);
    }

    // Tabs para cronogramas
    const scheduleTabs = document.querySelectorAll('.schedule-type');
    scheduleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            scheduleTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animación para los elementos de proceso
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length) {
        const stepsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                processSteps.forEach((step, index) => {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 200);
                });
                stepsObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.2 });
        
        processSteps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'all 0.5s ease';
        });
        
        stepsObserver.observe(processSteps[0].parentElement);
    }

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