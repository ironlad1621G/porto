const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const nav = document.querySelector(".main-nav");
const links = document.querySelectorAll(".nav-link");
const indicator = document.querySelector(".nav-indicator");
const themeToggle = document.getElementById("themeToggle");
const typingText = document.getElementById("typingText");
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const cursorGlow = document.querySelector('.cursor-glow');

function updateThemeMeta() {
    const isLight = document.body.classList.contains("light");
    if (metaThemeColor) {
        metaThemeColor.setAttribute("content", isLight ? "#e9ebef" : "#05080f");
    }
    themeToggle.textContent = isLight ? "🌙" : "☀";
}

updateThemeMeta();

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    document.documentElement.classList.toggle("light"); 
    updateThemeMeta();
});


menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
});


const roles = ["Cairo With No Context", "AI Enthusiast", "Sigma"];
let roleIndex = 0, charIndex = 0, deleting = false;

function typeRole() {
    if (!typingText) return;
    
    const currentRole = roles[roleIndex];
    if (!deleting) {
        typingText.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeRole, 1400);
            return;
        }
    } else {
        typingText.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    setTimeout(typeRole, deleting ? 70 : 150);
}
typeRole();

links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        if (!nav || !indicator) return;
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        
        indicator.style.left = `${linkRect.left - navRect.left}px`;
        indicator.style.top = `${linkRect.top - navRect.top}px`;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.height = `${linkRect.height}px`;
        indicator.style.opacity = "1";
    });
});

if (nav && indicator) {
    nav.addEventListener("mouseleave", () => {
        indicator.style.opacity = "0";
    });
}

links.forEach(link => {
    link.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        
        if (targetId.startsWith("#")) {
            e.preventDefault(); 
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                if (mainNav.classList.contains("open")) {
                    mainNav.classList.remove("open");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
                }
            }
        }
    });
});

const currentYearEl = document.getElementById("currentYear");
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Add iOS fluid lerp logic for cursor
if (cursorGlow && window.innerWidth > 640) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        // Smooth lerp for iOS fluid feel
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        
        cursorGlow.style.left = `${cursorX}px`;
        cursorGlow.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

// Scroll Reveal with IntersectionObserver
const revealElements = document.querySelectorAll('section > div, article, .hero-content, .hero-card');
revealElements.forEach(el => {
    el.classList.add('reveal');
});

const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(function(entries, observer) {
    entries.forEach((entry, index) => {
        if (!entry.isIntersecting) return;
        
        // Add stagger based on dom order for siblings
        entry.target.style.animationDelay = `${(index % 5) * 0.1}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});


const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const popupTitle = document.getElementById("popupTitle");
const popupGallery = document.getElementById("popupGallery");

const popupData = {
    goal: {
        title: "My Goals",
        images: ["images/goal-1.jpg", "images/goal-2.jpg", "images/goal-3.jpg"]
    },
    background: {
        title: "My Background",
        images: ["assets/B1.jpg", "images/background-2.jpg", "images/background-3.jpg"]
    },
    organization: {
        title: "Organization",
        images: ["images/org-1.jpg", "images/org-2.jpg", "images/org-3.jpg"]
    },
    hobbies: {
        title: "My E-certificate",
        images: ["assets/Picture1.jpg", "images/hobby-2.jpg", "images/hobby-3.jpg"]
    }   
};

document.querySelectorAll(".popup-trigger").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.popup;
        const data = popupData[type];
        
        if (!data) return;

        popupTitle.textContent = data.title;
        popupGallery.innerHTML = "";

        data.images.forEach(image => {
            const img = document.createElement("img");
            img.src = image;
            img.alt = data.title;
            popupGallery.appendChild(img);
        });
        popupOverlay.classList.add("active");
    });
});

if (popupClose && popupOverlay) {
    popupClose.addEventListener("click", () => {
        popupOverlay.classList.remove("active");
    });

    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove("active");
        }
    });
}