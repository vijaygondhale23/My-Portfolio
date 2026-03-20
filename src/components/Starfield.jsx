import { useEffect, useRef } from 'react';
import { useTheme } from '../ThemeContext';

/**
 * Animated starfield / floating‑particle canvas.
 * Renders ~ 80 small dots that slowly drift upward and twinkle.
 * Adapts colour to the current theme automatically.
 *
 * Usage: <Starfield /> — wrap inside a position:relative container.
 */
export default function Starfield() {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);

  // Keep theme ref fresh without re-creating particles
  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    // Resize canvas to fill parent
    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate particles
    const COUNT = 100;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.5,          // radius 0.5–2.1
      vx: (Math.random() - 0.5) * 0.18,       // very slow horizontal drift
      vy: -(Math.random() * 0.25 + 0.06),     // slow upward drift
      baseAlpha: Math.random() * 0.5 + 0.2,   // 0.2–0.7
      phase: Math.random() * Math.PI * 2,      // twinkle phase offset
      twinkleSpeed: Math.random() * 0.012 + 0.005,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isDark = themeRef.current === 'dark';

      for (const p of particles) {
        // Twinkle
        p.phase += p.twinkleSpeed;
        const twinkle = 0.5 + 0.5 * Math.sin(p.phase);
        const alpha = p.baseAlpha * twinkle;

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around
        if (p.y < -2) p.y = canvas.height + 2;
        if (p.x < -2) p.x = canvas.width + 2;
        if (p.x > canvas.width + 2) p.x = -2;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${alpha})`
          : `rgba(9, 9, 11, ${alpha * 0.8})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []); // run once

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
