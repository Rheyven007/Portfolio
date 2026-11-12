(() => {
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
                const slack = Math.max(0, restLength - distance) * .65;
                const sway = Math.max(-75, Math.min(75, -vx * .04));
                const controlX = anchorX + (endX - anchorX) * .36 + sway + side * (slack + 9);
                const controlY = (endY - 12) * .48 + slack;
                const path = `M ${anchorX} -12 Q ${controlX} ${controlY} ${endX} ${endY}`;
                paths.forEach(strap => {
                    strap.setAttribute("d", path);
                    strap.style.strokeWidth = `${Number(strap.dataset.width)}px`;
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

})();
