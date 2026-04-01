import { useEffect, useRef } from "react";

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId = 0;

        const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
        const cursor = { x: mouse.x, y: mouse.y };

        const MOUSE_RADIUS = 120;
        const REPEL_FORCE = 0.8;
        const TRAIL_LENGTH = 42;
        const CURSOR_LERP = 0.3;

        const trail: { x: number; y: number }[] = [];
        const particles: { x: number; y: number; vx: number; vy: number; r: number; opacity: number }[] = [];

        const primaryColor = getComputedStyle(document.documentElement)
            .getPropertyValue("--primary")
            .trim() || "160 84% 50%";

        const toPrimary = (alpha: number) => {
            const [h, s, l] = primaryColor.split(" ");
            if (!h || !s || !l) return `hsla(160, 84%, 50%, ${alpha})`;
            return `hsla(${h}, ${s}, ${l}, ${alpha})`;
        };

        const seedParticles = () => {
            particles.length = 0;
            const count = Math.max(45, Math.min(95, Math.floor((canvas.width * canvas.height) / 22000)));

            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    r: Math.random() * 1.5 + 0.5,
                    opacity: Math.random() * 0.35 + 0.12,
                });
            }
        };

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            seedParticles();
        };

        resize();
        window.addEventListener("resize", resize);

        const onMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const onMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        window.addEventListener("mouseleave", onMouseLeave);

        const drawTrail = () => {
            if (!mouse.active && trail.length > 0) {
                trail.shift();
            }

            if (mouse.active) {
                trail.push({ x: cursor.x, y: cursor.y });
                if (trail.length > TRAIL_LENGTH) trail.shift();
            }

            if (trail.length < 2) return;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            for (let i = 1; i < trail.length - 1; i++) {
                const prev = trail[i - 1];
                const cur = trail[i];
                const next = trail[i + 1];

                const t = i / (trail.length - 1);
                const alpha = 0.06 + t * 0.4;
                const width = 0.4 + t * 3.2;

                const startX = (prev.x + cur.x) * 0.5;
                const startY = (prev.y + cur.y) * 0.5;
                const endX = (cur.x + next.x) * 0.5;
                const endY = (cur.y + next.y) * 0.5;

                ctx.beginPath();
                ctx.moveTo(startX, startY);
                ctx.quadraticCurveTo(cur.x, cur.y, endX, endY);
                ctx.strokeStyle = toPrimary(alpha);
                ctx.lineWidth = width;
                ctx.stroke();
            }

            const gradient = ctx.createRadialGradient(cursor.x, cursor.y, 0, cursor.x, cursor.y, 20);
            gradient.addColorStop(0, toPrimary(0.22));
            gradient.addColorStop(1, toPrimary(0));
            ctx.beginPath();
            ctx.arc(cursor.x, cursor.y, 20, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            cursor.x += (mouse.x - cursor.x) * CURSOR_LERP;
            cursor.y += (mouse.y - cursor.y) * CURSOR_LERP;

            for (const p of particles) {
                if (mouse.active) {
                    const dx = p.x - cursor.x;
                    const dy = p.y - cursor.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS && dist > 0) {
                        const force = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * REPEL_FORCE;
                        p.vx += (dx / dist) * force;
                        p.vy += (dy / dist) * force;
                    }
                }

                p.vx *= 0.98;
                p.vy *= 0.98;

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = toPrimary(p.opacity);
                ctx.fill();
            }

            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = toPrimary(0.06 * (1 - dist / 150));
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            if (mouse.active) {
                for (const p of particles) {
                    const dx = p.x - cursor.x;
                    const dy = p.y - cursor.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < MOUSE_RADIUS * 1.5) {
                        ctx.beginPath();
                        ctx.moveTo(cursor.x, cursor.y);
                        ctx.lineTo(p.x, p.y);
                        ctx.strokeStyle = toPrimary(0.1 * (1 - dist / (MOUSE_RADIUS * 1.5)));
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            drawTrail();
            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseleave", onMouseLeave);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }}
        />
    );
};

export default ParticleBackground;
