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
    const navLinks = document.querySelectorAll('#unidad-nav .nav-link');
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
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    window.addEventListener('scroll', toggleBackToTopButton);
    toggleBackToTopButton(); // Call once to set initial state

    // Animación para tarjetas al hacer scroll
    const contentCards = document.querySelectorAll('.content-card');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated-card');
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

    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .content-card.animated-card {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Interactividad adicional para elementos de la página
    
    // Efectos hover en elementos de fusión
    document.querySelectorAll('.fusion-example').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Efectos hover en materiales
    document.querySelectorAll('.material-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const materialIcon = this.querySelector('.material-icon');
            materialIcon.style.transform = 'scale(1.1) rotate(5deg)';
            materialIcon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const materialIcon = this.querySelector('.material-icon');
            materialIcon.style.transform = '';
        });
    });

    // Efectos hover en principios de sostenibilidad
    document.querySelectorAll('.principle-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const principleNumber = this.querySelector('.principle-number');
            principleNumber.style.opacity = '0.7';
            principleNumber.style.transition = 'opacity 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const principleNumber = this.querySelector('.principle-number');
            principleNumber.style.opacity = '0.3';
        });
    });

    // Animación para SVG de hero section
    const printerSVG = document.querySelector('.hero-icon svg');
    if (printerSVG) {
        const extruder = printerSVG.querySelector('rect[x="290"][y="200"]');
        const printingObject = printerSVG.querySelector('path[d="M260 300 L340 300 L320 250 L280 250 Z"]');
        
        if (extruder && printingObject) {
            let direction = 1;
            let position = 200;
            
            setInterval(() => {
                position += (direction * 0.5);
                extruder.setAttribute('y', position);
                
                if (position <= 200) {
                    direction = 1;
                } else if (position >= 230) {
                    direction = -1;
                }
                
                // Change opacity of printing object based on extruder position
                const opacity = ((position - 200) / 30) * 0.7;
                printingObject.setAttribute('fill-opacity', 0.3 + opacity);
                
            }, 50);
        }
    }
});