document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle "Ver más detalles" button clicks
    const showMoreButtons = document.querySelectorAll('.show-more');
    showMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            if (targetContent.style.display === 'none') {
                targetContent.style.display = 'block';
                this.innerHTML = 'Ocultar detalles <i class="bi bi-dash-circle"></i>';
            } else {
                targetContent.style.display = 'none';
                this.innerHTML = 'Ver más detalles <i class="bi bi-plus-circle"></i>';
            }
        });
    });

    // Active navigation highlighting
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
    
    // Add active class to navbar links
    window.addEventListener('scroll', highlightNavigation);

    // Add some interactivity to the navbar
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Style active navigation links
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .navbar-dark .navbar-nav .nav-link.active {
                background-color: rgba(255, 255, 255, 0.2);
                color: white;
                font-weight: 600;
            }
        </style>
    `);

    // Add parallax effect to hero section
    const heroSection = document.querySelector('.hero-bg');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            const translateY = scrollPosition * 0.3;
            heroSection.style.backgroundPosition = `center -${translateY}px`;
        });
    }

    // Add typing effect to terminal in SVG (can be extended)
    const terminalLines = document.querySelectorAll('.hero-icon rect[fill="#A0AEC0"]');
    if (terminalLines.length > 0) {
        terminalLines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('animate__animated', 'animate__fadeIn');
            }, 500 + (index * 150));
        });
    }
});