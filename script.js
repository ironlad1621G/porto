const isAndroid = /Android/i.test(navigator.userAgent);
const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

if (isAndroid) {
    document.body.classList.add("low-end");
    document.querySelectorAll('[data-tilt]').forEach(el => {
        el.removeAttribute('data-tilt');
    });
}

window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

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
    themeToggle.innerHTML = isLight ? 
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>` :
        `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path></svg>`;
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
if (cursorGlow && window.innerWidth > 640 && !isAndroid) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        
        cursorGlow.style.left = `${cursorX}px`;
        cursorGlow.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
}

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
    },
    background: {
        title: "My Background",
    },
    organization: {
        title: "Organization",
    },
    hobbies: {
        title: "My E-certificate",
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