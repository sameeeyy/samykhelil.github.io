document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initAnimatedBackground();
    initSmoothScrolling();
    initCardEffects();
    initScrollAnimations();
    initImageLoading();

function initAnimatedBackground() {
    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const container = document.getElementById('animated-background');
        
        if (!ctx || !container) {
            throw new Error('Canvas or container not available');
        }

        // Set canvas size and style
        function setCanvasSize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        setCanvasSize();
        // Make sure the canvas fills the container
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        container.appendChild(canvas);

        // Create more visible particles
        const particles = [];
        const particleCount = 100; // Increased count
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 3 + 1, // Bigger radius
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.5 + 0.1 // Variable opacity
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                // Move particle
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle with variable opacity
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 123, 255, ${particle.opacity})`;
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        // Handle window resize
        window.addEventListener('resize', () => {
            setCanvasSize();
        });

        // Start animation
        animate();
        
    } catch (error) {
        console.warn('Animated background initialization failed:', error);
        const container = document.getElementById('animated-background');
        if (container) container.remove();
    }
}

// Make sure to call it when the document loads
document.addEventListener('DOMContentLoaded', function() {
    initAnimatedBackground();
});
    // Smooth Scrolling
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Card Effects
    function initCardEffects() {
        // Project cards hover effect
        const projectCards = document.querySelectorAll('.project-card');
        const certificationCards = document.querySelectorAll('.certification-card');

        function addHoverEffect(element) {
            element.addEventListener('mouseover', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.transition = 'transform 0.3s ease';
            });

            element.addEventListener('mouseout', function() {
                this.style.transform = 'translateY(0)';
            });

            // Add touch support for mobile
            element.addEventListener('touchstart', function(e) {
                this.style.transform = 'translateY(-5px)';
            });

            element.addEventListener('touchend', function() {
                this.style.transform = 'translateY(0)';
            });
        }

        projectCards.forEach(addHoverEffect);
        certificationCards.forEach(addHoverEffect);
    }

    // Scroll Animations
    function initScrollAnimations() {
        // Timeline animation
        const timelineItems = document.querySelectorAll('.timeline-item');
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    timelineObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '50px'
        });

        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease-out';
            timelineObserver.observe(item);
        });

        // Skills animation
        const skillItems = document.querySelectorAll('.skill-list li');
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.5
        });

        skillItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = `all 0.3s ease-out ${index * 0.1}s`;
            skillObserver.observe(item);
        });
    }

    // Image Loading
    function initImageLoading() {
        const images = document.querySelectorAll('img');
        
        images.forEach(img => {
            // Add loading attribute
            img.setAttribute('loading', 'lazy');
            
            // Add loaded class when image loads
            img.addEventListener('load', function() {
                this.setAttribute('loaded', '');
            });

            // Handle error
            img.addEventListener('error', function() {
                console.warn(`Failed to load image: ${this.src}`);
                // You can set a fallback image here if needed
                // this.src = 'path/to/fallback-image.jpg';
            });
        });
    }
});