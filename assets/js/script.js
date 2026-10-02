document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const html = document.documentElement;
    const header = document.querySelector(".site-header");
    const loader = document.querySelector(".site-loader");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer:fine)").matches;

    /* Loader */
    window.setTimeout(() => loader?.classList.add("loaded"), 900);

    /* Header */
    const setHeader = () => header?.classList.toggle("scrolled", window.scrollY > 40);
    setHeader();
    window.addEventListener("scroll", setHeader, { passive: true });

    /* Theme persistence */
    const themeToggle = document.querySelector(".theme-toggle");
    const themeIcon = themeToggle?.querySelector("svg");
    const themeLabel = themeToggle?.querySelector(".theme-label");
    const themeColor = document.getElementById("theme-color");

    const applyTheme = theme => {
        html.dataset.theme = theme;
        const light = theme === "light";
        themeToggle?.setAttribute("aria-pressed", String(light));
        themeToggle?.setAttribute("aria-label", light ? "Switch to dark theme" : "Switch to light theme");
        if (themeLabel) themeLabel.textContent = light ? "DARK" : "LIGHT";
        if (themeIcon) themeIcon.outerHTML = `<i data-lucide="${light ? "moon" : "sun"}"></i>`;
        if (window.lucide) lucide.createIcons();
        themeColor?.setAttribute("content", light ? "#f4f4f0" : "#050505");
        localStorage.setItem("portfolio-theme", theme);
    };
    const savedTheme = localStorage.getItem("portfolio-theme");
    applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
    themeToggle?.addEventListener("click", () => {
        applyTheme(html.dataset.theme === "light" ? "dark" : "light");
    });

    /* Mobile menu */
    const closeMenu = () => {
        menuToggle?.classList.remove("active");
        mobileMenu?.classList.remove("open");
        mobileMenu?.setAttribute("aria-hidden", "true");
        menuToggle?.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
    };
    menuToggle?.addEventListener("click", () => {
        const open = !mobileMenu.classList.contains("open");
        menuToggle.classList.toggle("active", open);
        mobileMenu.classList.toggle("open", open);
        mobileMenu.setAttribute("aria-hidden", String(!open));
        menuToggle.setAttribute("aria-expanded", String(open));
        body.classList.toggle("menu-open", open);
    });
    mobileMenu?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

    /* Scroll reveals + section line animation */
    const reveals = document.querySelectorAll(".reveal");
    const sections = document.querySelectorAll("main > section");
    if (!reducedMotion && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        reveals.forEach(el => observer.observe(el));

        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add("is-visible");
            });
        }, { threshold: 0.08 });
        sections.forEach(section => sectionObserver.observe(section));
    } else {
        reveals.forEach(el => el.classList.add("visible"));
        sections.forEach(section => section.classList.add("is-visible"));
    }

    /* Hero parallax */
    const portrait = document.querySelector(".hero-portrait");
    const hero = document.querySelector(".hero");
    if (!reducedMotion && portrait && hero) {
        let ticking = false;
        window.addEventListener("scroll", () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                const rect = hero.getBoundingClientRect();
                const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height)));
                if (rect.bottom > 0) portrait.style.transform = `translate3d(0, ${progress * 28}px, 0) scale(${1 + progress * .015})`;
                ticking = false;
            });
        }, { passive: true });
    }

    /* Project lightbox with previous/next */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = lightbox?.querySelector(".lightbox-image img");
    const title = document.getElementById("lightbox-title");
    const category = document.getElementById("lightbox-category");
    const description = document.getElementById("lightbox-description");
    const projectButtons = [...document.querySelectorAll("[data-lightbox]")];
    let currentProject = 0;

    const renderProject = index => {
        if (!projectButtons.length || !lightbox) return;
        currentProject = (index + projectButtons.length) % projectButtons.length;
        const button = projectButtons[currentProject];
        lightboxImg.src = button.dataset.image;
        lightboxImg.alt = button.dataset.title || "Project image";
        title.textContent = button.dataset.title || "";
        category.textContent = button.dataset.category || "";
        description.textContent = button.dataset.description || "";
        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        body.classList.add("menu-open");
    };
    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        body.classList.remove("menu-open");
    };
    window.closeLightbox = closeLightbox;

    projectButtons.forEach((button, index) => button.addEventListener("click", () => renderProject(index)));
    lightbox?.querySelector(".lightbox-close")?.addEventListener("click", closeLightbox);
    lightbox?.querySelector(".lightbox-prev")?.addEventListener("click", () => renderProject(currentProject - 1));
    lightbox?.querySelector(".lightbox-next")?.addEventListener("click", () => renderProject(currentProject + 1));
    lightbox?.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

    /* Back to top */
    document.querySelector(".back-top")?.addEventListener("click", () =>
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" })
    );

    /* Cursor + magnetic interactions */
    if (!reducedMotion && finePointer) {
        const dot = document.querySelector(".cursor-dot");
        const ring = document.querySelector(".cursor-ring");
        let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;

        window.addEventListener("mousemove", e => {
            mx = e.clientX; my = e.clientY;
            if (dot) { dot.style.left = `${mx}px`; dot.style.top = `${my}px`; }
        });

        const animateCursor = () => {
            rx += (mx - rx) * .13;
            ry += (my - ry) * .13;
            if (ring) { ring.style.left = `${rx}px`; ring.style.top = `${ry}px`; }
            requestAnimationFrame(animateCursor);
        };
        animateCursor();

        document.querySelectorAll("a, button, [data-hover], .project-media, .process-card").forEach(el => {
            el.addEventListener("mouseenter", () => {
                body.classList.add("cursor-hover", "cursor-invert");
            });
            el.addEventListener("mouseleave", () => {
                body.classList.remove("cursor-hover", "cursor-invert");
            });
        });

        document.querySelectorAll(".magnetic").forEach(el => {
            el.addEventListener("mousemove", e => {
                const r = el.getBoundingClientRect();
                const strength = el.classList.contains("theme-toggle") ? 4 : 8;
                const x = ((e.clientX - r.left) / r.width - .5) * strength;
                const y = ((e.clientY - r.top) / r.height - .5) * strength;
                el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            });
            el.addEventListener("mouseleave", () => el.style.transform = "");
        });
    }

    /* Keyboard */
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") { closeMenu(); closeLightbox(); }
        if (lightbox?.classList.contains("open")) {
            if (e.key === "ArrowLeft") renderProject(currentProject - 1);
            if (e.key === "ArrowRight") renderProject(currentProject + 1);
        }
    });

    /* Keep icon library in sync after dynamic theme icon changes. */
    if (window.lucide) lucide.createIcons();
});
