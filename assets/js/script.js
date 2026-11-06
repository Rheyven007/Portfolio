document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const html = document.documentElement;
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer:fine)").matches;

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
        document.querySelectorAll('[data-rb-logo]').forEach(image => {
            image.src = `assets/images/rb-logo-${theme}.svg`;
        });
        document.getElementById("site-favicon")?.setAttribute("href", `assets/images/favicon-${theme}.svg`);
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
    applyTheme(savedTheme || "light");
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

    /* Free-drag badge with release momentum, elastic tension and angular inertia. */
    const badge = document.querySelector(".id-badge");
    const badgeStage = document.querySelector(".badge-stage");
    if (badge && badgeStage) {
        const strapSides = [...badgeStage.querySelectorAll("[data-lanyard-side]")].map(group => ({
            side: Number(group.dataset.lanyardSide),
            paths: group.querySelectorAll("[data-strap-shape]")
        }));
        badgeStage.querySelectorAll(".lanyard-name textPath").forEach(names => {
            names.textContent = "RHEYVEN BAUSAS / ".repeat(100);
        });
        let x = 0, y = 0, vx = 0, vy = 0, angle = 0, spin = 0;
        let drag = null, frame = 0, previousTime = 0;
        const paint = () => {
            badge.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
            const centerX = badgeStage.clientWidth / 2;
            const spread = Math.min(82, badgeStage.clientWidth * .19);
            const radians = angle * Math.PI / 180;
            const sin = Math.sin(radians), cos = Math.cos(radians);
            // Two independent fabric straps meet the rotating swivel ring.
            strapSides.forEach(({ side, paths }) => {
                const anchorX = centerX + side * spread;
                const endX = centerX + x + cos * side * 7 + sin * 46;
                const endY = badge.offsetTop + y + 16 + sin * side * 7 - cos * 46;
                const distance = Math.hypot(endX - anchorX, endY + 12);
                const restLength = Math.hypot(spread - 7, badge.offsetTop - 18);
                const stretch = Math.max(1, distance / restLength);
                const slack = Math.max(0, restLength - distance) * .65;
                const sway = Math.max(-75, Math.min(75, -vx * .04));
                const controlX = anchorX + (endX - anchorX) * .36 + sway + side * (slack + 9);
                const controlY = (endY - 12) * .48 + slack;
                const path = `M ${anchorX} -12 Q ${controlX} ${controlY} ${endX} ${endY}`;
                paths.forEach(strap => {
                    strap.setAttribute("d", path);
                    strap.style.strokeWidth = `${Number(strap.dataset.width) / Math.min(1.45, Math.sqrt(stretch))}px`;
                });
            });
        };
        const stopSpring = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            previousTime = 0;
        };
        const reset = () => {
            stopSpring();
            x = y = vx = vy = spin = 0;
            angle = 0;
            badge.classList.remove("is-moving");
            badgeStage.classList.remove("is-active");
            paint();
        };
        const spring = time => {
            const dt = Math.min((time - (previousTime || time - 16)) / 1000, .032);
            previousTime = time;
            // Small substeps keep large throws stable across different refresh rates.
            const steps = Math.ceil(dt / .008);
            const step = dt / steps;
            for (let i = 0; i < steps; i++) {
                const tension = 42 + Math.min(35, Math.hypot(x, y) * .035);
                const ax = -tension * x - 7.5 * vx;
                const ay = -tension * y - 8.5 * vy;
                vx += ax * step;
                vy += ay * step;
                x += vx * step;
                y += vy * step;
                // The heavier card lags behind the strap and swings as it returns.
                const targetAngle = -Math.max(-32, Math.min(32, x * .035 + vx * .018));
                spin += ((targetAngle - angle) * 90 - spin * 9) * step;
                angle += spin * step;
            }
            paint();
            if (Math.abs(x) + Math.abs(y) + Math.abs(vx) + Math.abs(vy) + Math.abs(angle) + Math.abs(spin) > .25) {
                frame = requestAnimationFrame(spring);
            } else {
                reset();
            }
        };
        const settle = () => {
            stopSpring();
            if (reducedMotion) reset();
            else {
                badge.classList.add("is-moving");
                badgeStage.classList.add("is-active");
                frame = requestAnimationFrame(spring);
            }
        };
        badge.addEventListener("pointerdown", event => {
            if (!event.isPrimary || event.button !== 0) return;
            stopSpring();
            vx = vy = spin = 0;
            drag = {
                id: event.pointerId, startX: event.clientX - x, startY: event.clientY - y,
                lastX: event.clientX, lastY: event.clientY, time: event.timeStamp,
                oldUserSelect: document.body.style.userSelect
            };
            document.body.style.userSelect = "none";
            badge.setPointerCapture(event.pointerId);
            badge.classList.add("is-dragging", "is-moving");
            badgeStage.classList.add("is-active");
        });
        badge.addEventListener("pointermove", event => {
            if (!drag || event.pointerId !== drag.id) return;
            const dt = Math.max(.008, (event.timeStamp - drag.time) / 1000);
            vx = vx * .35 + ((event.clientX - drag.lastX) / dt) * .65;
            vy = vy * .35 + ((event.clientY - drag.lastY) / dt) * .65;
            // No stage bounds: the captured pointer can pull the card across the page.
            x = event.clientX - drag.startX;
            y = event.clientY - drag.startY;
            const nextAngle = -Math.max(-28, Math.min(28, x * .025 + vx * .006));
            spin = (nextAngle - angle) / dt;
            angle = nextAngle;
            drag.lastX = event.clientX;
            drag.lastY = event.clientY;
            drag.time = event.timeStamp;
            paint();
        });
        const release = event => {
            if (!drag || event.pointerId !== drag.id) return;
            document.body.style.userSelect = drag.oldUserSelect;
            // A pause before releasing means the card starts from rest.
            if (event.type !== "pointerup" || event.timeStamp - drag.time > 100) vx = vy = spin = 0;
            vx = Math.max(-1800, Math.min(1800, vx));
            vy = Math.max(-1800, Math.min(1800, vy));
            spin = Math.max(-240, Math.min(240, spin));
            const pointerId = drag.id;
            drag = null;
            badge.classList.remove("is-dragging");
            if (badge.hasPointerCapture(pointerId)) badge.releasePointerCapture(pointerId);
            settle();
        };
        badge.addEventListener("pointerup", release);
        badge.addEventListener("pointercancel", release);
        badge.addEventListener("lostpointercapture", release);
        badge.addEventListener("keydown", event => {
            const steps = { ArrowLeft: [-85, 0], ArrowRight: [85, 0], ArrowUp: [0, -85], ArrowDown: [0, 85], Enter: [70, 100], " ": [70, 100] };
            if (event.key === "Escape") {
                if (drag) release({ pointerId: drag.id });
                reset();
            } else if (steps[event.key] && !drag) {
                event.preventDefault();
                x += steps[event.key][0];
                y += steps[event.key][1];
                vx = vy = spin = 0;
                paint();
                settle();
            }
        });
        const cancelInteraction = () => {
            if (drag) release({ pointerId: drag.id });
            reset();
        };
        window.addEventListener("resize", cancelInteraction);
        window.addEventListener("blur", cancelInteraction);
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) cancelInteraction();
        });
        paint();
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

    /* Magnetic interactions */
    if (!reducedMotion && finePointer) {
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

    /* Static Vercel contact form: prepare a mailto message without PHP. */
    document.querySelector("[data-static-contact]")?.addEventListener("submit", event => {
        event.preventDefault();
        const form = event.currentTarget;
        const name = form.querySelector('[name="name"]')?.value.trim() || "";
        const email = form.querySelector('[name="email"]')?.value.trim() || "";
        const subject = form.querySelector('[name="subject"]')?.value.trim() || "Portfolio inquiry";
        const message = form.querySelector('[name="message"]')?.value.trim() || "";
        const directEmail = document.querySelector('.contact-title .text-link')?.href || "mailto:bausasrheyven@gmail.com";
        const recipient = directEmail.replace(/^mailto:/i, "").split("?")[0];
        const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
        const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    });

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
