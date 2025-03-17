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

    // Interactividad para elementos
    const interactiveElements = [
        '.component-item', 
        '.benefit-item', 
        '.element-item', 
        '.concept-item',
        '.diagram-type',
        '.basic-element',
        '.relationship-type',
        '.message-type',
        '.pattern-card'
    ];

    interactiveElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = item.classList.contains('benefit-item') || 
                                       item.classList.contains('relationship-type') ? 
                                       'translateX(5px)' : 'translateY(-5px)';
                this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    });

    // Resaltar diagramas al hacer click
    document.querySelectorAll('.diagram-container svg, .navigation-diagram-container svg, .usecase-diagram-container svg, .class-structure svg, .sequence-diagram-container svg, .activity-diagram-container svg').forEach(diagram => {
        diagram.addEventListener('click', function() {
            // Eliminar highlight de todos los diagramas
            document.querySelectorAll('.diagram-highlight').forEach(el => {
                el.classList.remove('diagram-highlight');
            });
            
            // Agregar highlight al diagrama clickeado
            this.parentElement.classList.add('diagram-highlight');
            
            // Agregar el estilo para el highlight
            if (!document.querySelector('#diagram-highlight-style')) {
                const style = document.createElement('style');
                style.id = 'diagram-highlight-style';
                style.textContent = `
                    .diagram-highlight {
                        position: relative;
                        box-shadow: 0 0 15px rgba(79, 134, 198, 0.5);
                        transform: scale(1.02);
                        transition: all 0.3s ease;
                    }
                    
                    .diagram-highlight::after {
                        content: "Diagrama seleccionado";
                        position: absolute;
                        top: 10px;
                        right: 10px;
                        background-color: var(--unit-primary);
                        color: white;
                        padding: 4px 8px;
                        border-radius: 4px;
                        font-size: 0.8rem;
                        opacity: 0.9;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Remover el highlight después de 3 segundos
            setTimeout(() => {
                this.parentElement.classList.remove('diagram-highlight');
            }, 3000);
        });
    });
});