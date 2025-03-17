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
    
    window.addEventListener('scroll', highlightNavigation);

    // Enhanced card animations on hover
    const unitCards = document.querySelectorAll('.unit-card');
    unitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Method cards hover effects
    const methodItems = document.querySelectorAll('.method-item');
    methodItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.circle-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.circle-icon');
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Animate elements when they enter viewport
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.section-heading, .card-title, .method-item').forEach(item => {
        observer.observe(item);
    });
});