import React, { useEffect, useRef, useState, useCallback } from "react";

// --- Configuration Constants ---
const PARTICLE_DENSITY = 0.00015;
const BG_PARTICLE_DENSITY = 0.00005;
const MOUSE_RADIUS = 180;
const RETURN_SPEED = 0.08;
const DAMPING = 0.9;
const REPULSION_STRENGTH = 1.2;

const randomRange = (min, max) => Math.random() * (max - min) + min;

const AntiGravityCanvas = ({
  accentColor = "#d97706",
  particleColor = "#ffffff",
  glowColor = "217, 119, 6", // RGB string for the radial glow
  bgColor = "transparent",
  className = "",
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [debugInfo, setDebugInfo] = useState({ count: 0, fps: 0 });

  const particlesRef = useRef([]);
  const backgroundParticlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 }); // CSS-pixel dimensions for the animate loop

  // Initialize Particles
  const initParticles = useCallback(
    (width, height) => {
      const particleCount = Math.floor(width * height * PARTICLE_DENSITY);
      const newParticles = [];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        newParticles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: randomRange(1, 2.5),
          color: Math.random() > 0.9 ? accentColor : particleColor,
          angle: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = newParticles;

      const bgCount = Math.floor(width * height * BG_PARTICLE_DENSITY);
      const newBgParticles = [];

      for (let i = 0; i < bgCount; i++) {
        newBgParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          size: randomRange(0.5, 1.5),
          alpha: randomRange(0.1, 0.4),
          phase: Math.random() * Math.PI * 2,
        });
      }
      backgroundParticlesRef.current = newBgParticles;

      setDebugInfo((prev) => ({ ...prev, count: particleCount + bgCount }));
    },
    [accentColor, particleColor],
  );
  // Animation Loop
  const animate = useCallback(
    (time) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      if (delta > 0) {
        setDebugInfo((prev) => ({ ...prev, fps: Math.round(1000 / delta) }));
      }

      ctx.clearRect(0, 0, sizeRef.current.w, sizeRef.current.h);

      // Pulsating Radial Glow
      const centerX = sizeRef.current.w / 2;
      const centerY = sizeRef.current.h / 2;
      const pulseOpacity = Math.sin(time * 0.0008) * 0.035 + 0.085;

      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height) * 0.7,
      );
      gradient.addColorStop(0, `rgba(${glowColor}, ${pulseOpacity})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, sizeRef.current.w, sizeRef.current.h);

      // Background Particles
      const bgParticles = backgroundParticlesRef.current;
      ctx.fillStyle = particleColor;

      for (let i = 0; i < bgParticles.length; i++) {
        const p = bgParticles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = sizeRef.current.w;
        if (p.x > sizeRef.current.w) p.x = 0;
        if (p.y < 0) p.y = sizeRef.current.h;
        if (p.y > sizeRef.current.h) p.y = 0;

        const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
        ctx.globalAlpha = p.alpha * (0.3 + 0.7 * twinkle);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // Main Foreground Physics
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Phase 1: Forces
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (mouse.isActive && distance < MOUSE_RADIUS) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
          const repulsion = force * REPULSION_STRENGTH;

          p.vx -= forceDirectionX * repulsion * 5;
          p.vy -= forceDirectionY * repulsion * 5;
        }

        const springDx = p.originX - p.x;
        const springDy = p.originY - p.y;
        p.vx += springDx * RETURN_SPEED;
        p.vy += springDy * RETURN_SPEED;
      }

      // Phase 2: Collisions
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];

          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distSq = dx * dx + dy * dy;
          const minDist = p1.size + p2.size;

          if (distSq < minDist * minDist) {
            const dist = Math.sqrt(distSq);

            if (dist > 0.01) {
              const nx = dx / dist;
              const ny = dy / dist;

              const overlap = minDist - dist;
              const pushX = nx * overlap * 0.5;
              const pushY = ny * overlap * 0.5;

              p1.x -= pushX;
              p1.y -= pushY;
              p2.x += pushX;
              p2.y += pushY;

              const dvx = p1.vx - p2.vx;
              const dvy = p1.vy - p2.vy;
              const velocityAlongNormal = dvx * nx + dvy * ny;

              if (velocityAlongNormal > 0) {
                const m1 = p1.size;
                const m2 = p2.size;
                const restitution = 0.85;
                const impulseMagnitude =
                  (-(1 + restitution) * velocityAlongNormal) /
                  (1 / m1 + 1 / m2);

                const impulseX = impulseMagnitude * nx;
                const impulseY = impulseMagnitude * ny;

                p1.vx += impulseX / m1;
                p1.vy += impulseY / m1;
                p2.vx -= impulseX / m2;
                p2.vy -= impulseY / m2;
              }
            }
          }
        }
      }

      // Phase 3: Integration & Drawing
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const opacity = Math.min(0.3 + velocity * 0.1, 1);

        // Parse particleColor to rgba
        const isWhite =
          particleColor === "#ffffff" || particleColor === "white";
        const baseRgb = isWhite ? "255, 255, 255" : "0, 0, 0";

        ctx.fillStyle =
          p.color === particleColor ? `rgba(${baseRgb}, ${opacity})` : p.color;

        ctx.fill();
      }

      frameIdRef.current = requestAnimationFrame(animate);
    },
    [accentColor, particleColor, glowColor],
  );

  // Resize Handler
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && canvasRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;

        const ctx = canvasRef.current.getContext("2d");
        if (ctx) ctx.scale(dpr, dpr);

        sizeRef.current = { w: width, h: height };
        initParticles(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  // Start Animation
  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  // Mouse Handlers
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 z-0 overflow-hidden cursor-crosshair ${className}`}
      style={{ background: bgColor }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default AntiGravityCanvas;
