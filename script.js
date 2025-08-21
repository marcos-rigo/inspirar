// ===== VARIABLES GLOBALES =====
let particles = [];
const particleCount = 50;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initScrollEffects();
    initNavbar();
    initAnimations();
    initSmoothScroll();
});

// ===== SISTEMA DE PARTÍCULAS =====
function initParticles() {
    const container = document.getElementById('particles-container');
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Propiedades aleatorias
    const size = Math.random() * 4 + 1;
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const duration = Math.random() * 3 + 3;
    const delay = Math.random() * 2;
    
    // Colores aleatorios del esquema
    const colors = ['#32B9F0', '#4FE8B0', '#FFD94D', '#9C6CFF'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    // Aplicar estilos
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.background = color;
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';
    
    container.appendChild(particle);
    particles.push(particle);
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax para partículas
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 0.5;
            particle.style.transform = `translateY(${rate * speed}px)`;
        });
    });
}

// ===== NAVBAR DINÁMICO =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== ANIMACIONES DE ENTRADA =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.service-card, .highlight-card, .tech-item, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Animaciones específicas para secciones
    const leftElements = document.querySelectorAll('.about-content');
    leftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });
    
    const rightElements = document.querySelectorAll('.about-visual, .hero-visual');
    rightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
}

// ===== SCROLL SUAVE =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFECTOS HOVER AVANZADOS =====
document.addEventListener('DOMContentLoaded', function() {
    // Efecto hover para tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Efecto hover para elementos tech
    const techItems = document.querySelectorAll('.tech-item');
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateY(10deg)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
        });
    });
});

// ===== CONTADOR ANIMADO =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = Math.floor(current) + '+';
            
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(timer);
            }
        }, 20);
    });
}

// Activar contador cuando sea visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// ===== EFECTOS DE CURSOR PERSONALIZADO =====
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #32B9F0, #4FE8B0);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    // Efecto especial en elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .service-card, .highlight-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(2)';
            cursor.style.background = 'radial-gradient(circle, #FFD94D, #9C6CFF)';
        });
        
        el.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #32B9F0, #4FE8B0)';
        });
    });
});

// ===== RESPONSIVE PARTICLES =====
function updateParticlesOnResize() {
    window.addEventListener('resize', function() {
        particles.forEach(particle => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
        });
    });
}

// Inicializar responsive particles
document.addEventListener('DOMContentLoaded', updateParticlesOnResize);

// ===== LOADING ANIMATION =====
window.addEventListener('load', function() {
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #0E1721;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.5s ease;
    `;
    
    const loaderContent = document.createElement('div');
    loaderContent.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 3px solid #32B9F0; border-top: 3px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px;"></div>
            <h3 style="color: #FFFFFF; font-family: 'Inter', sans-serif;">Inspir<span style="color: #32B9F0;">AR</span> Lab</h3>
        </div>
    `;
    
    loader.appendChild(loaderContent);
    document.body.appendChild(loader);
    
    // Agregar animación de spin
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remover loader después de 2 segundos
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loader);
        }, 500);
    }, 2000);
});
