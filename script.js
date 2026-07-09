/*================================
    PORTFOLIO DEVOPS
    Auteur : Fanambinantsoa Haja
==================================*/

/*==========================
    TYPEWRITER EFFECT
===========================*/
const typingElement = document.getElementById("typing");
const texts = [
    "DevOps Engineer",
    "Linux Enthusiast",
    "Docker & Kubernetes",
    "CI/CD Automation",
    "Cloud & Infrastructure"
];

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    const current = texts[textIndex];

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
            textIndex++;
            if (textIndex >= texts.length) {
                textIndex = 0;
            }
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
        navbar.style.boxShadow = "0 8px 20px rgba(0,0,0,.35)";
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
    MOTEUR D'ANIMATION DE GOUTTES MACRO (Inspiration Vidéo)
======================================================*/
const canvas = document.getElementById('bg-animation');
const ctx = canvas.getContext('2d');
let particlesArray = [];
const numberOfParticles = 35; // Quantité idéale pour préserver les performances

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
        this.y = Math.random() * canvas.height; // Répartition initiale au premier chargement
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 25 + 6; // Grosses billes type macro photographique
        this.speedY = Math.random() * 0.6 + 0.2; // Ascension lente et paisible
        this.wobbleSpeed = Math.random() * 0.02 + 0.01;
        this.wobble = 0;
        this.alpha = Math.random() * 0.25 + 0.05; // Très translucides
    }

    update() {
        this.y -= this.speedY;
        this.wobble += this.wobbleSpeed;
        this.x += Math.sin(this.wobble) * 0.2; // Balancement organique fluide

        if (this.y < -this.size) {
            this.reset();
        }

        // Interaction avec la souris (Écartement fluide)
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
        ctx.beginPath();
        
        // Création d'un dégradé radial interne pour simuler la réfraction de la lumière dans l'eau
        let gradient = ctx.createRadialGradient(
            this.x - this.size * 0.2, 
            this.y - this.size * 0.2, 
            this.size * 0.05, 
            this.x, 
            this.y, 
            this.size
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.alpha * 1.8})`); // Point lumineux (reflet)
        gradient.addColorStop(0.5, `rgba(59, 130, 246, ${this.alpha * 0.4})`); // Teinte eau DevOps
        gradient.addColorStop(1, 'rgba(10, 15, 30, 0)'); // Fusion avec le fond
        
        ctx.fillStyle = gradient;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Fin contour cristallin pour l'effet de verre/goutte d'eau
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.alpha * 0.25})`;
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

/*==========================
    YEAR FOOTER
===========================*/
const footer = document.querySelector("footer p");
if(footer) {
    footer.innerHTML = `© ${new Date().getFullYear()} Fanambina. Turning dreams to reality. | ¬ DevOps Junior`;
}
