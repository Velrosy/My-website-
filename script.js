// Award-Winning Portfolio Website JavaScript
// World-class interactions and animations

class PortfolioApp {
    constructor() {
        this.isLoaded = false;
        this.scrollY = 0;
        this.ticking = false;
        this.currentTestimonial = 0;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        console.log('🚀 Award-Winning Portfolio Loading...');
        
        // Initialize all components
        this.initParticleSystem();
        this.initNavigation();
        this.initThemeToggle();
        this.initScrollAnimations();
        this.initTiltEffects();
        this.initSkillBars();
        this.initPortfolioFilters();
        this.initTestimonials();
        this.initContactForm();
        this.initBackToTop();
        this.initSmoothScrolling();
        this.initMobileMenu();
        
        // Mark as loaded
        this.isLoaded = true;
        console.log('✨ Portfolio Loaded Successfully!');
        
        // Add entrance animations
        this.playEntranceAnimations();
    }

    // Particle System for Animated Background
    initParticleSystem() {
        const background = document.getElementById('animatedBackground');
        if (!background) return;

        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle(background);
        }

        // Regenerate particles periodically
        setInterval(() => {
            if (background.children.length < particleCount) {
                this.createParticle(background);
            }
        }, 5000);
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 10 + 15;
        const delay = Math.random() * 20;
        const leftPosition = Math.random() * 100;
        
        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${leftPosition}%;
            animation-duration: ${duration}s;
            animation-delay: ${delay}s;
        `;
        
        container.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, (duration + delay) * 1000);
    }

    // Enhanced Navigation
    initNavigation() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class
            if (currentScrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Hide/show navbar based on scroll direction
            if (currentScrollY > 200) {
                if (currentScrollY > lastScrollY) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });

        // Add entrance animation for nav items
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.5s ease-out';
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 100 + index * 100);
        });
    }

    // Theme Toggle with Smooth Transitions
    initThemeToggle() {
        const toggle = document.getElementById('themeToggle');
        const body = document.body;
        
        // Get saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark-mode';
        body.className = savedTheme;
        
        toggle.addEventListener('click', () => {
            const isLight = body.classList.contains('light-mode');
            body.className = isLight ? 'dark-mode' : 'light-mode';
            localStorage.setItem('theme', body.className);
            
            // Add bounce animation to toggle
            toggle.style.transform = 'scale(0.9)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Scroll-triggered Animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    
                    // Special handling for skill bars
                    if (entry.target.classList.contains('skill-item')) {
                        this.animateSkillBar(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animateElements = document.querySelectorAll('.section-header, .service-card, .portfolio-item, .skill-item, .testimonial-content, .contact-item');
        animateElements.forEach(el => observer.observe(el));

        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .section-header, .service-card, .portfolio-item, .skill-item, .testimonial-content, .contact-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }
            .section-header.animate, .service-card.animate, .portfolio-item.animate, 
            .skill-item.animate, .testimonial-content.animate, .contact-item.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }

    // Tilt Effect for Service Cards
    initTiltEffects() {
        const tiltElements = document.querySelectorAll('[data-tilt]');
        
        tiltElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transform = 'perspective(1000px) rotateX(5deg) rotateY(5deg) translateZ(10px)';
                element.style.transition = 'transform 0.3s ease-out';
            });
            
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // Animated Skill Bars
    initSkillBars() {
        // This will be triggered by scroll animation
    }

    animateSkillBar(skillItem) {
        const progressBar = skillItem.querySelector('.skill-progress');
        if (!progressBar) return;
        
        const level = progressBar.getAttribute('data-level');
        setTimeout(() => {
            progressBar.style.width = level + '%';
        }, 300);
    }

    // Portfolio Filters
    initPortfolioFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');
                    
                    if (filter === 'all' || category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Testimonials Slider
    initTestimonials() {
        const track = document.getElementById('testimonialTrack');
        const slides = document.querySelectorAll('.testimonial-slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.getElementById('testimonialPrev');
        const nextBtn = document.getElementById('testimonialNext');
        
        if (!track || slides.length === 0) return;
        
        const updateSlider = () => {
            // Update slides
            slides.forEach((slide, index) => {
                slide.classList.toggle('active', index === this.currentTestimonial);
            });
            
            // Update dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === this.currentTestimonial);
            });
            
            // Move track
            track.style.transform = `translateX(-${this.currentTestimonial * 100}%)`;
        };
        
        const nextSlide = () => {
            this.currentTestimonial = (this.currentTestimonial + 1) % slides.length;
            updateSlider();
        };
        
        const prevSlide = () => {
            this.currentTestimonial = (this.currentTestimonial - 1 + slides.length) % slides.length;
            updateSlider();
        };
        
        // Event listeners
        nextBtn?.addEventListener('click', nextSlide);
        prevBtn?.addEventListener('click', prevSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentTestimonial = index;
                updateSlider();
            });
        });
        
        // Auto-play
        setInterval(nextSlide, 5000);
        
        // Initialize
        updateSlider();
    }

    // Enhanced Contact Form with Envelope Animation
    initContactForm() {
        const form = document.getElementById('contactForm');
        const successAnimation = document.getElementById('successAnimation');
        
        if (!form) return;
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => this.validateField(input));
            input.addEventListener('blur', () => this.validateField(input));
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!this.validateField(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) return;
            
            // Get form data
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Show loading state
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate sending (replace with actual email service)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Create mailto link
            const mailtoLink = `mailto:fahadboss2023@gmail.com?subject=${encodeURIComponent(`Portfolio Contact: ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
            window.location.href = mailtoLink;
            
            // Show success animation
            this.showSuccessAnimation();
            
            // Reset form
            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                inputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                    this.removeFieldError(input);
                });
            }, 3000);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const name = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error
        this.removeFieldError(field);
        field.classList.remove('valid', 'invalid');
        
        // Required field validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        // Email validation
        else if (type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
        // Name validation
        else if (name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters';
        }
        // Message validation
        else if (name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
        
        // Apply styling
        if (value) {
            field.classList.add(isValid ? 'valid' : 'invalid');
        }
        
        // Show error message
        if (!isValid && errorMessage) {
            this.showFieldError(field, errorMessage);
        }
        
        return isValid;
    }

    showFieldError(field, message) {
        const errorEl = document.createElement('div');
        errorEl.className = 'field-error';
        errorEl.textContent = message;
        errorEl.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease-out;
        `;
        
        field.parentNode.appendChild(errorEl);
        
        // Animate in
        requestAnimationFrame(() => {
            errorEl.style.opacity = '1';
            errorEl.style.transform = 'translateY(0)';
        });
    }

    removeFieldError(field) {
        const errorEl = field.parentNode.querySelector('.field-error');
        if (errorEl) {
            errorEl.style.opacity = '0';
            errorEl.style.transform = 'translateY(-10px)';
            setTimeout(() => errorEl.remove(), 300);
        }
    }

    showSuccessAnimation() {
        const animation = document.getElementById('successAnimation');
        if (!animation) return;
        
        animation.classList.add('show');
        
        // Hide after 3 seconds
        setTimeout(() => {
            animation.classList.remove('show');
        }, 3000);
    }

    // Back to Top with Progress Ring
    initBackToTop() {
        const button = document.getElementById('backToTop');
        const progressRing = document.querySelector('.progress-ring__circle');
        
        if (!button || !progressRing) return;
        
        // Calculate circumference
        const radius = progressRing.r.baseVal.value;
        const circumference = 2 * Math.PI * radius;
        progressRing.style.strokeDasharray = circumference;
        progressRing.style.strokeDashoffset = circumference;
        
        const updateProgress = () => {
            const scrolled = window.scrollY;
            const maxHeight = document.body.scrollHeight - window.innerHeight;
            const scrollProgress = scrolled / maxHeight;
            const offset = circumference - (scrollProgress * circumference);
            
            progressRing.style.strokeDashoffset = offset;
            
            // Show/hide button
            if (scrolled > 300) {
                button.classList.add('show');
            } else {
                button.classList.remove('show');
            }
        };
        
        window.addEventListener('scroll', updateProgress, { passive: true });
        
        button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Smooth Scrolling for Navigation and CTA Buttons
    initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Update active nav link
                    this.updateActiveNavLink(targetId);
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
        
        // Handle CTA buttons
        const exploreBtn = document.getElementById('exploreBtn');
        const contactBtn = document.getElementById('contactBtn');
        
        if (exploreBtn) {
            exploreBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#portfolio');
            });
        }
        
        if (contactBtn) {
            contactBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('#contact');
            });
        }
        
        // Update active nav link on scroll
        this.initActiveNavTracking();
    }

    scrollToSection(targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Update active nav link
            this.updateActiveNavLink(targetId);
            
            // Close mobile menu if open
            this.closeMobileMenu();
        }
    }

    updateActiveNavLink(targetId) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === targetId);
        });
    }

    initActiveNavTracking() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                    this.updateActiveNavLink(`#${entry.target.id}`);
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '-80px 0px -50% 0px'
        });
        
        sections.forEach(section => observer.observe(section));
    }

    // Mobile Menu
    initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (!hamburger || !navMenu) return;
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking nav links
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    closeMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // Entrance Animations
    playEntranceAnimations() {
        // Logo animation
        const logo = document.querySelector('.nav-logo');
        if (logo) {
            logo.style.opacity = '0';
            logo.style.transform = 'scale(0.8)';
            setTimeout(() => {
                logo.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                logo.style.opacity = '1';
                logo.style.transform = 'scale(1)';
            }, 200);
        }
        
        // Theme toggle animation
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.style.opacity = '0';
            themeToggle.style.transform = 'translateX(20px)';
            setTimeout(() => {
                themeToggle.style.transition = 'all 0.5s ease-out';
                themeToggle.style.opacity = '1';
                themeToggle.style.transform = 'translateX(0)';
            }, 800);
        }
        
        // Add subtle animations to all interactive elements
        this.enhanceInteractivity();
        
        // Initialize Discord link placeholder
        this.initDiscordLink();
    }

    enhanceInteractivity() {
        // Add hover effects to all buttons
        const buttons = document.querySelectorAll('button, .cta-button, .filter-btn, .portfolio-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.willChange = 'transform';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.willChange = 'auto';
            });
        });
        
        // Add smooth transitions to cards
        const cards = document.querySelectorAll('.service-card, .portfolio-item, .testimonial-content');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.willChange = 'transform, box-shadow';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.willChange = 'auto';
            });
        });
    }

    initDiscordLink() {
        const discordLink = document.getElementById('discordLink');
        if (discordLink) {
            discordLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Show a message that the link will be provided later
                this.showTemporaryMessage('Discord server link will be provided by the owner');
            });
        }
    }

    showTemporaryMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--gradient-primary);
            color: white;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: 600;
            z-index: 2000;
            opacity: 0;
            transition: all 0.3s ease-out;
        `;
        
        document.body.appendChild(messageEl);
        
        requestAnimationFrame(() => {
            messageEl.style.opacity = '1';
            messageEl.style.transform = 'translate(-50%, -50%) scale(1.05)';
        });
        
        setTimeout(() => {
            messageEl.style.opacity = '0';
            messageEl.style.transform = 'translate(-50%, -50%) scale(0.95)';
            setTimeout(() => messageEl.remove(), 300);
        }, 2000);
    }
}

// Portfolio Modal Functions (Global scope for onclick handlers)
function openPortfolioModal(projectId) {
    const modal = document.getElementById('portfolioModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    // Project data
    const projects = {
        project1: {
            title: 'E-commerce Platform',
            description: 'A comprehensive e-commerce solution built with modern technologies, featuring AI-powered recommendations, advanced analytics, and seamless payment integration.',
            image: 'fas fa-laptop-code',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe API', 'Machine Learning'],
            features: [
                'AI-powered product recommendations',
                'Real-time inventory management',
                'Advanced analytics dashboard',
                'Multi-payment gateway integration',
                'Progressive Web App (PWA)',
                'Mobile-first responsive design'
            ],
            achievements: [
                '40% increase in conversion rates',
                '99.9% uptime achievement',
                '10x faster page load times'
            ]
        },
        project2: {
            title: 'Brand Commercial Video',
            description: 'A cinematic brand commercial featuring advanced motion graphics, 3D animations, and professional color grading that increased brand awareness by 300%.',
            image: 'fas fa-play-circle',
            technologies: ['After Effects', 'Cinema 4D', 'Premiere Pro', 'DaVinci Resolve'],
            features: [
                'Cinematic storytelling',
                'Advanced motion graphics',
                '3D product visualization',
                'Professional color grading',
                'Surround sound audio design',
                'Multi-platform optimization'
            ],
            achievements: [
                '2M+ views on social media',
                '300% brand awareness increase',
                'Award-winning cinematography'
            ]
        },
        project3: {
            title: 'AI Analytics Dashboard',
            description: 'An intelligent analytics dashboard that leverages machine learning to provide real-time insights and predictive analytics for business decision-making.',
            image: 'fas fa-robot',
            technologies: ['Python', 'TensorFlow', 'Vue.js', 'D3.js', 'PostgreSQL'],
            features: [
                'Real-time data visualization',
                'Predictive analytics engine',
                'Machine learning insights',
                'Custom report generation',
                'API integration suite',
                'Mobile companion app'
            ],
            achievements: [
                '85% accuracy in predictions',
                '60% faster decision making',
                'Industry-leading performance'
            ]
        },
        project4: {
            title: 'Advanced Discord Bot',
            description: 'A sophisticated Discord bot with AI-powered moderation, custom commands, music streaming, and community management features.',
            image: 'fab fa-discord',
            technologies: ['Discord.js', 'Node.js', 'MongoDB', 'OpenAI API'],
            features: [
                'AI-powered moderation',
                'Custom command system',
                'Music streaming integration',
                'Automated role management',
                'Advanced logging system',
                'Multi-server dashboard'
            ],
            achievements: [
                '500+ servers deployed',
                '99.9% uptime maintained',
                '50K+ active users'
            ]
        },
        project5: {
            title: 'Mobile App UI Design',
            description: 'A sleek and intuitive mobile application interface designed with user experience at its core, featuring micro-interactions and modern design principles.',
            image: 'fas fa-mobile-alt',
            technologies: ['Figma', 'Principle', 'After Effects', 'Lottie'],
            features: [
                'User-centered design',
                'Micro-interactions',
                'Accessibility compliance',
                'Cross-platform consistency',
                'Animation prototyping',
                'Design system creation'
            ],
            achievements: [
                '4.9/5 user satisfaction',
                '40% engagement increase',
                'Award-winning UX design'
            ]
        },
        project6: {
            title: '3D Product Showcase',
            description: 'A stunning 3D product visualization and animation showcase featuring photorealistic rendering and interactive product exploration.',
            image: 'fas fa-film',
            technologies: ['Blender', 'Three.js', 'WebGL', 'Cinema 4D'],
            features: [
                'Photorealistic rendering',
                '360° product rotation',
                'Interactive exploration',
                'Real-time lighting',
                'Material customization',
                'VR compatibility'
            ],
            achievements: [
                '500% engagement boost',
                '95% reduction in returns',
                'Industry benchmark quality'
            ]
        }
    };
    
    const project = projects[projectId];
    if (!project) return;
    
    // Create modal content
    modalBody.innerHTML = `
        <div class="project-showcase">
            <div class="project-hero">
                <div class="project-icon">
                    <i class="${project.image}"></i>
                </div>
                <div class="project-info">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                </div>
            </div>
            
            <div class="project-details">
                <div class="detail-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-grid">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h3>Key Features</h3>
                    <ul class="feature-list">
                        ${project.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h3>Achievements</h3>
                    <ul class="achievement-list">
                        ${project.achievements.map(achievement => `<li><i class="fas fa-trophy"></i>${achievement}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-actions">
                    <button class="project-btn primary">
                        <i class="fas fa-external-link-alt"></i>
                        View Live Demo
                    </button>
                    <button class="project-btn secondary">
                        <i class="fab fa-github"></i>
                        Source Code
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .project-showcase { padding: 1rem; }
        .project-hero { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 2rem; }
        .project-icon { font-size: 3rem; color: var(--accent-color); }
        .project-info h2 { font-size: 1.75rem; margin-bottom: 0.5rem; }
        .detail-section { margin-bottom: 2rem; }
        .detail-section h3 { color: var(--accent-color); margin-bottom: 1rem; }
        .tech-grid { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .tech-tag { 
            background: var(--gradient-primary); color: white; 
            padding: 0.25rem 0.75rem; border-radius: 20px; 
            font-size: 0.875rem; font-weight: 500; 
        }
        .feature-list, .achievement-list { list-style: none; }
        .feature-list li, .achievement-list li { 
            display: flex; align-items: center; gap: 0.5rem; 
            margin-bottom: 0.5rem; color: var(--text-secondary); 
        }
        .feature-list i { color: #10b981; }
        .achievement-list i { color: #f59e0b; }
        .project-actions { display: flex; gap: 1rem; margin-top: 2rem; }
        .project-btn { 
            flex: 1; padding: 0.75rem 1.5rem; border-radius: 50px; 
            border: none; cursor: pointer; display: flex; 
            align-items: center; justify-content: center; gap: 0.5rem; 
            font-weight: 600; transition: all 0.3s ease; 
        }
        .project-btn.primary { 
            background: var(--gradient-primary); color: white; 
        }
        .project-btn.secondary { 
            background: var(--tertiary-bg); color: var(--text-primary); 
            border: 1px solid var(--border-color); 
        }
        .project-btn:hover { transform: translateY(-2px); }
    `;
    
    // Add styles if not already added
    if (!document.getElementById('modal-styles')) {
        const styleEl = document.createElement('style');
        styleEl.id = 'modal-styles';
        styleEl.textContent = modalStyles;
        document.head.appendChild(styleEl);
    }
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closePortfolioModal() {
    const modal = document.getElementById('portfolioModal');
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Initialize the application
new PortfolioApp();

// Add additional styles for form validation
const additionalStyles = `
    .form-group input.valid,
    .form-group textarea.valid {
        border-color: #10b981;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    
    .form-group input.invalid,
    .form-group textarea.invalid {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
    
    .field-error {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .field-error::before {
        content: '⚠';
        font-size: 0.875rem;
    }
`;

// Add the styles safely
if (document.head) {
    const styleElement = document.createElement('style');
    styleElement.textContent = additionalStyles;
    document.head.appendChild(styleElement);
}

// Performance optimization
window.addEventListener('load', () => {
    // Remove will-change from animated elements to improve performance
    const animatedElements = document.querySelectorAll('[style*="will-change"]');
    animatedElements.forEach(el => {
        el.style.willChange = 'auto';
    });
});

// Error handling
window.addEventListener('error', (e) => {
    console.warn('Caught error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.warn('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});