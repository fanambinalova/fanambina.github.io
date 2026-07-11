/*================================
    PORTFOLIO DEVOPS
    Auteur : Fanambinantsoa Haja
==================================*/

// 1. GESTION DU DOUBLE THÈME
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

const currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'light' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// 2. GESTION DE LA TRADUCTION MULTILINGUE 
const langToggle = document.getElementById('lang-toggle');
const langText = document.getElementById('lang-text');
let currentLang = localStorage.getItem('lang') || 'fr';

function applyLanguage(lang) {
    document.querySelectorAll('[data-fr]').forEach(el => {
        el.textContent = el.getAttribute(`data-${lang}`);
    });
    langText.textContent = lang === 'fr' ? 'EN' : 'FR';
    localStorage.setItem('lang', lang);
}
applyLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'fr' ? 'en' : 'fr';
    applyLanguage(currentLang);
    textIndex = 0;
    charIndex = 0;
    deleting = false;
});

// 3. EFFET TYPEWRITER TRADUIT
const typingElement = document.getElementById("typing");
const translations = {
    fr: ["DevOps Engineer", "Passionné Linux", "Docker & Kubernetes", "Automatisation CI/CD", "Cloud & Infrastructure"],
    en: ["DevOps Engineer", "Linux Enthusiast", "Docker & Kubernetes", "CI/CD Automation", "Cloud & Infrastructure"]
};

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const currentList = translations[currentLang] || translations['fr'];
    const current = currentList[textIndex];

    if (!deleting) {
        typingElement.textContent = current.substring(0, charIndex++);
        if (charIndex > current.length) {
            deleting = true;
            setTimeout(typeEffect, 1800);
            return;
        }
    } else {
        typingElement.textContent = current.substring(0, charIndex--);
        if (charIndex < 0) {
            deleting = false;
            textIndex = (textIndex + 1) % currentList.length;
        }
    }
    setTimeout(typeEffect, deleting ? 40 : 90);
}
typeEffect();

/*==========================
    NAVBAR SHADOW
===========================*/
const navbar = document.querySelector("nav");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.15)";
    } else {
        navbar.style.boxShadow = "none";
    }
});

/*==========================
    ACTIVE MENU
===========================*/
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/*==========================
    SCROLL REVEAL
===========================*/
const revealElements = document.querySelectorAll(".about-card, .skill, .timeline-item, .project-card");
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach(element => {
    observer.observe(element);
});

/*==========================
    BACK TO TOP BUTTON
===========================*/
const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

/*==========================
    SMOOTH SCROLL
===========================*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

/*==========================
    HERO IMAGE PARALLAX
===========================*/
const heroImage = document.querySelector(".hero-right img");
window.addEventListener("mousemove", (e) => {
    const x = (window.innerWidth / 2 - e.clientX) / 40;
    const y = (window.innerHeight / 2 - e.clientY) / 40;
    if(heroImage) {
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    }
});

/*====================================================
    MOTEUR D'ANIMATION DE GOUTTES MACRO (Couleurs adaptées)
======================================================*/
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const numberOfParticles = 35;

const mouse = {
    x: null,
    y: null,
    radius: 180
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class MacroDrop {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 25 + 6;
        this.speedY = Math.random() * 0.6 + 0.2;
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobble = 0;
        this.alpha = Math.random() * 0.25 + 0.05;
    }

    update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.2;

        if (this.y < -this.size) {
            this.reset();
        }

        if (mouse.x != null && mouse.y != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < mouse.radius) {
                let force = (mouse.radius - distance) / mouse.radius;
                let directionX = dx / distance;
                this.x -= directionX * force * 2;
            }
        }
    }

    draw() {
        let isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        ctx.beginPath();
        
        let gradient = ctx.createRadialGradient(
            this.x - this.size * 0.2, 
            this.y - this.size * 0.2, 
            this.size * 0.05, 
            this.x, 
            this.y, 
            this.size
        );
        
        if (isDark) {
            // Teintes d'eau calquées sur le dégradé de l' image (Bleu roi profond)
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 1.8})`);
            gradient.addColorStop(0.5, `rgba(37, 99, 235, ${this.alpha * 0.5})`);
            gradient.addColorStop(1, 'rgba(5, 11, 20, 0)');
            ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.25})`;
        } else {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 2})`);
            gradient.addColorStop(0.5, `rgba(37, 99, 235, ${this.alpha * 0.35})`);
            gradient.addColorStop(1, 'rgba(238, 242, 246, 0)');
            ctx.strokeStyle = `rgba(37, 99, 235, ${this.alpha * 0.2})`;
        }
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        ctx.lineWidth = 0.5;
        ctx.stroke();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new MacroDrop());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
