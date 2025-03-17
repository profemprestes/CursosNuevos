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

    // Course cards hover effects
    const courseCards = document.querySelectorAll('.course-card');
    
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Get the course category from the icon
            const iconElement = this.querySelector('.course-icon');
            let borderColor = '#3182ce'; // Default color
            
            if (iconElement.classList.contains('programming')) {
                borderColor = '#805ad5';
            } else if (iconElement.classList.contains('database')) {
                borderColor = '#2b6cb0';
            } else if (iconElement.classList.contains('os')) {
                borderColor = '#ed8936';
            } else if (iconElement.classList.contains('fullstack')) {
                borderColor = '#dd6b20';
            } else if (iconElement.classList.contains('software')) {
                borderColor = '#2f855a';
            } else if (iconElement.classList.contains('admin')) {
                borderColor = '#805ad5';
            } else if (iconElement.classList.contains('project')) {
                borderColor = '#38a169';
            }
            
            // Apply a gentle border top and increase shadow
            this.style.borderTopColor = borderColor;
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderTopColor = 'transparent';
            this.style.boxShadow = '';
        });
    });

    // Animation for feature items
    const featureItems = document.querySelectorAll('.feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // Button hover effect enhancement
    const courseButtons = document.querySelectorAll('.course-btn');
    
    courseButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });

    // Add scroll reveal animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Apply to course cards
    courseCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Apply to feature items
    featureItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add CSS class for appeared elements
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .appear {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
            
            .navbar-dark .navbar-nav .nav-link.active {
                background-color: rgba(255, 255, 255, 0.2);
                color: white;
                font-weight: 600;
            }
        </style>
    `);
});