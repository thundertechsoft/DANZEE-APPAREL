// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1500);
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Banner Slider Functionality
class BannerSlider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.querySelector('.slider-prev');
        this.nextBtn = document.querySelector('.slider-next');
        this.currentSlide = 0;
        this.slideInterval = null;
        
        this.init();
    }
    
    init() {
        this.startAutoSlide();
        this.addEventListeners();
    }
    
    startAutoSlide() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }
    
    addEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoSlide();
            });
        });
        
        // Pause auto-slide on hover
        const slider = document.querySelector('.banner-slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(this.slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    nextSlide() {
        this.goToSlide((this.currentSlide + 1) % this.slides.length);
    }
    
    prevSlide() {
        this.goToSlide((this.currentSlide - 1 + this.slides.length) % this.slides.length);
    }
    
    goToSlide(index) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');
        
        this.currentSlide = index;
        
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    resetAutoSlide() {
        clearInterval(this.slideInterval);
        this.startAutoSlide();
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    new BannerSlider();
});

// Counter Animation
class CounterAnimation {
    constructor() {
        this.counters = document.querySelectorAll('.counter');
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.counters.forEach(counter => {
            this.observer.observe(counter);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.animateCounter(entry.target);
                this.observer.unobserve(entry.target);
            }
        });
    }
    
    animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + (target >= 1000 ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
            }
        }, 16);
    }
}

// Initialize counters
new CounterAnimation();

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.animatedElements = document.querySelectorAll('.animated-card');
        this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.animatedElements.forEach(el => {
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }
}

// Initialize scroll animations
new ScrollAnimations();

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Enhanced Form Handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message
            this.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
            `;
        }, 2000);
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.type === 'submit' || this.href.includes('contact')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 3000);
        }
    });
});

// Parallax Effect for Banner
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const banner = document.querySelector('.banner-slider');
    if (banner) {
        banner.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add to cart functionality (for future e-commerce)
class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.updateCartCount();
    }
    
    addToCart(product) {
        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.updateCartCount();
        this.showAddToCartMessage();
    }
    
    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.cart.length;
        }
    }
    
    showAddToCartMessage() {
        // Create toast notification
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>Product added to cart successfully!</span>
        `;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Tab key navigation enhancement
    if (e.key === 'Tab') {
        document.documentElement.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse click
document.addEventListener('mousedown', function() {
    document.documentElement.classList.remove('keyboard-navigation');
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

// Export for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        BannerSlider,
        CounterAnimation,
        ScrollAnimations,
        CartManager
    };
}
