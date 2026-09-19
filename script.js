const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const typingText = document.getElementById("typingText");
const nav = document.querySelector(".main-nav");
const links = document.querySelectorAll(".nav-link");
const indicator = document.querySelector(".nav-indicator");
const themeToggle = document.getElementById("themeToggle");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu navigasi" : "Buka menu navigasi");
});

const roles = ["Cairo With No Context", "AI enthusiast", "Sigma",];
let roleIndex = 0, charIndex = 0, deleting = false;
function typeRole() {
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
        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        indicator.style.left = `${linkRect.left - navRect.left}px`;
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.top = `${linkRect.top - navRect.top}px`;
        indicator.style.height = `${linkRect.height}px`;
        
        indicator.style.opacity = "1";
    });
});
nav.addEventListener("mouseleave", () => {
    indicator.style.opacity = "0";
});
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀";
});

document.getElementById("currentYear").textContent = new Date().getFullYear();
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

const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow && window.innerWidth > 640) {
    window.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });
}
const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const popupTitle = document.getElementById("popupTitle");
const popupGallery = document.getElementById("popupGallery");
const popupData = {
    goal: {
        title: "My Goals",
        images: [
            "images/goal-1.jpg",
            "images/goal-2.jpg",
            "images/goal-3.jpg"
        ]
    },
    background: {
        title: "My Background",
        images: [
            "assets/B1.jpg",
            "images/background-2.jpg",
            "images/background-3.jpg"
        ]
    },
    organization: {
        title: "Organization",
        images: [
            "images/org-1.jpg",
            "images/org-2.jpg",
            "images/org-3.jpg"
        ]
    },
    hobbies: {
        title: "My E-certificate",
        images: [
            "assets/Picture1.jpg",
            "images/hobby-2.jpg",
            "images/hobby-3.jpg"
        ]
    }   
};

document.querySelectorAll(".popup-trigger").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.dataset.popup;
        const data = popupData[type];
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


popupClose.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
});

popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
        popupOverlay.classList.remove("active");
    }

});