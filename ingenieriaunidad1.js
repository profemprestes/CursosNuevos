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

    // Interactividad para elementos interactivos
    document.querySelectorAll('.benefit-item, .structure-item, .req-category, .activity-item, .process-step, .user-type, .checklist-item, .aspect-item, .consideration-item, .diagram-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Animación para estadísticas
    const statItems = document.querySelectorAll('.stat-item');
    if (statItems.length > 0) {
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('stat-animated');
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statItems.forEach(item => {
            statObserver.observe(item);
        });
        
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .stat-item {
                    transition: all 0.5s ease;
                }
                
                .stat-animated .stat-value {
                    animation: countUp 1.5s ease-out forwards;
                }
                
                @keyframes countUp {
                    from {
                        transform: translateY(20px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            </style>
        `);
    }
    
    // Animación para el diagrama de ciclo de vida
    const lifecyclePhases = document.querySelectorAll('.lifecycle-phase');
    if (lifecyclePhases.length > 0) {
        const phaseObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                lifecyclePhases.forEach((phase, index) => {
                    setTimeout(() => {
                        phase.classList.add('phase-animated');
                    }, index * 300);
                });
                phaseObserver.unobserve(entries[0].target);
            }
        }, { threshold: 0.5 });
        
        phaseObserver.observe(document.querySelector('.lifecycle-diagram'));
        
        document.head.insertAdjacentHTML('beforeend', `
            <style>
                .lifecycle-phase {
                    opacity: 0;
                    transform: translateY(20px);
                    transition: all 0.5s ease;
                }
                
                .phase-animated {
                    opacity: 1;
                    transform: translateY(0);
                }
            </style>
        `);
    }
    
    // Efecto hover para tablas
    document.querySelectorAll('.table tr').forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(147, 112, 219, 0.05)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
        });
    });
});