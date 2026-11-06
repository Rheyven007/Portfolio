/* Assemble the custom RB vector monogram, then dock the transparent mark in the header. */
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.site-loader');
    const loaderCanvas = document.querySelector('.loader-canvas');
    const brandCanvas = document.querySelector('.brand-canvas');
    const brand = document.querySelector('.brand');
    const stage = document.querySelector('.loader-logo-stage');
    const sequence = [...document.querySelectorAll('.loader-sequence > span')];
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Hand-built connected geometry, shared with the transparent SVG logo assets.
    const monogramParts = ["M12 16H65L76 27L61 42H45L72 75L66 65H83L88 59L85 56H65L63 62L58 55L61 49H84L89 43L86 40H70L81 29H94L107 43L97 54L107 65L95 79H53L36 91L50 72L58 77L33 48L12 69L25 37H57L64 29H24Z"].map(d => new Path2D(d));
    const clamp = value => Math.max(0, Math.min(1, value));
    const phase = (time, start, end) => clamp((time - start) / (end - start));
    const ease = value => 1 - Math.pow(1 - value, 3);
    const overshoot = value => {
        const p = clamp(value) - 1;
        return 1 + 2.70158 * p * p * p + 1.70158 * p * p;
    };
    // These three clipped pieces partition the complete symbol without altering its geometry.
    const shards = [
        { clip: new Path2D('M0 0H120V32H0Z'), x: -38, y: -25, rotation: -.22, delay: 0 },
        { clip: new Path2D('M0 32H63L87 108H0Z'), x: -28, y: 33, rotation: .18, delay: .14 },
        { clip: new Path2D('M63 32H120V108H87Z'), x: 44, y: 15, rotation: -.2, delay: .28 }
    ];
    const states = [loaderCanvas, brandCanvas].filter(Boolean).map(canvas => ({ canvas, ctx: canvas.getContext('2d'), frame: 0 }));
    const draw = (state, time) => {
        if (!state.ctx) return;
        const { canvas, ctx } = state;
        const ratio = Math.min(window.devicePixelRatio || 1, 3);
        const width = Math.round(canvas.clientWidth * ratio), height = Math.round(canvas.clientHeight * ratio);
        if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);
        const scale = Math.min(width / 120, height / 108);
        ctx.setTransform(scale, 0, 0, scale, (width - 120 * scale) / 2, (height - 108 * scale) / 2);
        const dark = document.documentElement.dataset.theme === 'dark';
        const ink = dark ? '#ffffff' : '#151515';
        ctx.fillStyle = ink;
        ctx.strokeStyle = ink;
        ctx.lineWidth = .55;
        ctx.lineJoin = 'miter';
        ctx.miterLimit = 3;
        if (time < 1.38) {
            shards.forEach(shard => {
                const progress = phase(time, .1 + shard.delay, 1.06 + shard.delay);
                if (!progress) return;
                const fitted = overshoot(progress);
                ctx.save();
                ctx.translate(60 + shard.x * (1 - fitted), 54 + shard.y * (1 - fitted));
                ctx.rotate(shard.rotation * (1 - fitted));
                ctx.translate(-60, -54);
                ctx.clip(shard.clip);
                const solid = ease(phase(time, .36 + shard.delay, 1.05 + shard.delay));
                ctx.globalAlpha = ease(phase(progress, 0, .3));
                ctx.shadowColor = dark ? 'rgba(255,255,255,.28)' : 'transparent';
                ctx.shadowBlur = dark ? width * (.012 + (1 - progress) * .025) : 0;
                monogramParts.forEach(part => {
                    ctx.save();ctx.globalAlpha *= 1 - solid;ctx.stroke(part);ctx.restore();
                    ctx.save();ctx.globalAlpha *= solid;ctx.fill(part);ctx.restore();
                });
                ctx.restore();
            });
        } else {
            ctx.save();
            const impactTime = time - 1.38;
            const impact = 1 + .045 * Math.exp(-impactTime * 9) * Math.sin(impactTime * 20);
            ctx.translate(60, 54);ctx.scale(impact, impact);ctx.translate(-60, -54);
            ctx.shadowColor = dark ? 'rgba(255,255,255,.18)' : 'transparent';
            ctx.shadowBlur = dark ? width * .012 : 0;
            monogramParts.forEach(part => ctx.fill(part));
            const polish = phase(time, 1.48, 2.1);
            if (polish > 0 && polish < 1) {
                ctx.save();ctx.shadowBlur = 0;
                monogramParts.forEach(part => ctx.clip(part));
                const x = -25 + ease(polish) * 180;
                const sweep = ctx.createLinearGradient(x - 12, 0, x + 12, 15);
                const color = dark ? '0,0,0' : '255,255,255';
                sweep.addColorStop(0, `rgba(${color},0)`);
                sweep.addColorStop(.5, `rgba(${color},${dark ? .24 : .65})`);
                sweep.addColorStop(1, `rgba(${color},0)`);
                ctx.fillStyle = sweep;ctx.fillRect(0, 0, 120, 108);ctx.restore();
            }
            ctx.restore();
        }
        canvas.parentElement.classList.add('canvas-ready');
    };
    let finished = false, flying = false, flight;
    const finish = () => {
        if (finished) return;
        finished = true;
        states.forEach(state => { cancelAnimationFrame(state.frame); state.frame = 0; draw(state, 3); });
        loader?.classList.add('loaded');
        clearTimeout(safetyTimer);
    };
    const safetyTimer = window.setTimeout(finish, 4500);
    const dock = () => {
        if (finished || flying) return;
        flying = true;
        if (motionPreference.matches || !stage || !brandCanvas || !stage.animate) { finish(); return; }
        const from = stage.getBoundingClientRect(), to = brandCanvas.getBoundingClientRect();
        const x = to.left + to.width / 2 - from.left - from.width / 2;
        const y = to.top + to.height / 2 - from.top - from.height / 2;
        loader?.classList.add('is-exiting');
        flight = stage.animate([
            { transform: 'translate(0, 0) scale(1)', offset: 0 },
            { transform: `translate(${x * .13}px, ${y * .18 - 12}px) scale(.9)`, offset: .3 },
            { transform: `translate(${x}px, ${y}px) scale(${to.width / from.width})`, offset: 1 }
        ], { duration: 650, easing: 'cubic-bezier(.76,0,.24,1)', fill: 'forwards' });
        flight.finished.then(finish).catch(finish);
    };
    states.forEach(state => draw(state, state.canvas === loaderCanvas && !motionPreference.matches ? 0 : 3));
    const loaderState = states.find(state => state.canvas === loaderCanvas);
    if (motionPreference.matches || !loaderState?.ctx) {
        window.setTimeout(finish, 120);
    } else {
        const start = performance.now();
        const tick = now => {
            if (finished) return;
            const time = (now - start) / 1000;
            draw(loaderState, time);
            sequence.forEach((label, index) => label.classList.toggle('is-active', index === Math.min(2, Math.floor(time / .8))));
            if (time < 2.4) loaderState.frame = requestAnimationFrame(tick);
            else dock();
        };
        loaderState.frame = requestAnimationFrame(tick);
    }
    const brandState = states.find(state => state.canvas === brandCanvas);
    const replayBrand = () => {
        if (!finished || motionPreference.matches || !brandState?.ctx || brandState.frame) return;
        const start = performance.now();
        const tick = now => {
            const time = (now - start) / 1000 * 2.25;
            draw(brandState, time);
            if (time < 2.4) brandState.frame = requestAnimationFrame(tick);
            else { brandState.frame = 0; draw(brandState, 3); }
        };
        brandState.frame = requestAnimationFrame(tick);
    };
    brand?.addEventListener('pointerenter', replayBrand);
    brand?.addEventListener('focusin', replayBrand);
    new MutationObserver(() => {
        states.forEach(state => { if (!state.frame) draw(state, 3); });
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    document.addEventListener('visibilitychange', () => { if (document.hidden) finish(); });
    window.addEventListener('resize', () => {
        if (flying && !finished) { flight?.cancel(); finish(); }
        states.forEach(state => { if (!state.frame) draw(state, 3); });
    });
    motionPreference.addEventListener('change', () => {
        if (motionPreference.matches) {
            flight?.cancel();
            states.forEach(state => { cancelAnimationFrame(state.frame); state.frame = 0; draw(state, 3); });
            finish();
        }
    });
});
