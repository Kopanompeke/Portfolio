// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Project slider functionality
const imageSlider = document.querySelector('.image-slider');
const images = [
    './images/loading.jpg',
    './images/loading.jpg',
    './images/loading.jpg'
];
const labels = ['E-Commerce Website', 'Portfolio Dashboard', 'Mobile App Design']; 
let currentIndex = 0;

function updateImage() {
    imageSlider.innerHTML = `
        <img src="${images[currentIndex]}" alt="Project ${currentIndex + 1}">
        <h3>${labels[currentIndex]}</h3>
    `;
}

document.querySelector('.prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

document.querySelector('.next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

// Auto-slide functionality
setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}, 5000);


// Add interactive effects to skill buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'translateY(-3px) scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translateY(0) scale(1)';
    });
    
    btn.addEventListener('click', () => {
        btn.style.animation = 'pulse 0.5s ease';
        setTimeout(() => {
            btn.style.animation = '';
        }, 500);
    });
});

// Add pulse animation for button clicks
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-3px) scale(1.05); }
        50% { transform: translateY(-5px) scale(1.1); }
        100% { transform: translateY(-3px) scale(1.05); }
    }
`;
document.head.appendChild(style);

// Enhanced scroll effects with parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.Home-section');
    const speed = scrolled * 0.5;
    
    if (parallax) {
        parallax.style.backgroundPosition = `center ${speed}px`;
    }
});

// Add typing effect to home section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const nameElement = document.querySelector('.home h2');
    if (nameElement) {
        setTimeout(() => {
            typeWriter(nameElement, 'Bradley Kopano Mpeke', 120);
        }, 1000);
    }
});

// Enhanced mobile responsiveness
function handleResize() {
    const screenWidth = window.innerWidth;
    const navbar = document.querySelector('.navbar');
    const homeSection = document.querySelector('.home');
    
    // Adjust navbar height based on screen size
    if (screenWidth <= 480) {
        navbar.style.height = '60px';
    } else if (screenWidth <= 768) {
        navbar.style.height = '70px';
    } else {
        navbar.style.height = '80px';
    }
    
    // Adjust home section padding
    if (screenWidth <= 480) {
        homeSection.style.padding = '20px 15px';
    } else if (screenWidth <= 768) {
        homeSection.style.padding = '30px 20px';
    } else {
        homeSection.style.padding = '40px';
    }
}

// Call on load and resize
window.addEventListener('load', handleResize);
window.addEventListener('resize', handleResize);

// Add loading animation
function showLoadingAnimation() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #30382F 0%, #2a3028 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    
    loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid #FFFBDF;
            border-top: 3px solid transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <style>
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
    `;
    
    document.body.appendChild(loader);
    
    // Remove loader after page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(loader);
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation
showLoadingAnimation();

// Add enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/\s/g, ''));
}

// Enhanced contact form handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.querySelector('textarea').value.trim();
        
        // Validation
        if (!name) {
            showNotification('Please enter your name', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!validatePhone(phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }
        
        if (!message) {
            showNotification('Please enter a message', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 10px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #2196F3, #0b7dda)';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Add scroll to top button
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border: 2px solid #FFFBDF;
        border-radius: 50%;
        background: rgba(255, 251, 223, 0.1);
        color: #FFFBDF;
        font-size: 20px;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        transform: scale(0);
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    scrollBtn.addEventListener('mouseenter', () => {
        scrollBtn.style.background = '#FFFBDF';
        scrollBtn.style.color = '#30382F';
        scrollBtn.style.transform = 'scale(1.1)';
    });
    
    scrollBtn.addEventListener('mouseleave', () => {
        scrollBtn.style.background = 'rgba(255, 251, 223, 0.1)';
        scrollBtn.style.color = '#FFFBDF';
        scrollBtn.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.transform = 'scale(1)';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.transform = 'scale(0)';
        }
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Add progress bar for page scroll
function createProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #FFFBDF, rgba(255, 251, 223, 0.7));
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Initialize progress bar
createProgressBar();

// Enhanced image lazy loading for better performance
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Navigate with arrow keys
    if (e.key === 'ArrowLeft') {
        document.querySelector('.prev-btn')?.click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.next-btn')?.click();
    }
    
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        if (navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
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

// Apply debouncing to scroll events
const debouncedScroll = debounce(() => {
    // Your scroll logic here
}, 10);

window.addEventListener('scroll', debouncedScroll);

console.log('Portfolio website loaded successfully! 🚀');
console.log('All interactive features are now active.');