import { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, ChevronDown } from 'lucide-react';
import Hyperspeed from '../components/Hyperspeed';

// Green-tinted preset to match portfolio accent #3D6B56
const HERO_EFFECT = {
  onSpeedUp: () => {},
  onSlowDown: () => {},
  distortion: 'turbulentDistortion',
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5],
  lightStickHeight: [1.3, 1.7],
  movingAwaySpeed: [60, 80],
  movingCloserSpeed: [-120, -160],
  carLightsLength: [400 * 0.03, 400 * 0.2],
  carLightsRadius: [0.05, 0.14],
  carWidthPercentage: [0.3, 0.5],
  carShiftX: [-0.8, 0.8],
  carFloorSeparation: [0, 5],
  colors: {
    roadColor:    0x080808,
    islandColor:  0x0a0a0a,
    background:   0x000000,
    shoulderLines: 0x131318,
    brokenLines:  0x131318,
    // Left lane — greens matching portfolio accent
    leftCars:  [0x4ade80, 0x3d6b56, 0x22c55e],
    // Right lane — teal/cyan complement
    rightCars: [0x06b6d4, 0x0891b2, 0x38bdf8],
    sticks:    0x3d6b56,
  },
};

const TECH_STRIP = [
  'React', 'Node.js', 'MongoDB', 'Python',
  'Tailwind CSS', 'Vite', 'Git', 'HTML5', 'CSS3', 'JavaScript',
];

export default function Hero() {
  // Memoize to avoid WebGL scene recreation on re-renders
  const effectOptions = useMemo(() => HERO_EFFECT, []);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Forward pointer events from the whole hero section down to the #lights
  // canvas so click-and-hold speed-up works everywhere, not just on the canvas
  const forwardToLights = useCallback((type) => {
    const lights = document.getElementById('lights');
    if (!lights) return;
    lights.dispatchEvent(new MouseEvent(type, { bubbles: false }));
  }, []);

  const handlePointerDown = useCallback((e) => {
    // Don't intercept real button/link clicks
    if (e.target.closest('button, a')) return;
    forwardToLights('mousedown');
  }, [forwardToLights]);

  const handlePointerUp = useCallback(() => {
    forwardToLights('mouseup');
  }, [forwardToLights]);

  const handleTouchStart = useCallback((e) => {
    if (e.target.closest('button, a')) return;
    forwardToLights('mousedown');
  }, [forwardToLights]);

  const handleTouchEnd = useCallback(() => {
    forwardToLights('mouseup');
  }, [forwardToLights]);

  return (
    <section
      id="home"
      onMouseDown={handlePointerDown}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingTop: 100,
        cursor: 'pointer',
      }}
    >
      {/* ── Hyperspeed WebGL background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Hyperspeed effectOptions={effectOptions} />
      </div>

      {/* ── Subtle overlay — keep text readable without hiding animation ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(13,13,13,0.15) 0%, rgba(13,13,13,0.05) 40%, rgba(13,13,13,0.65) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Main content ── */}
      <div
        className="container-max hero-content-wrapper"
        style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '48px' }}
      >
        <div className="hero-text-container" style={{ flex: '1 1 55%', textAlign: 'left', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', marginBottom: '28px' }}
            className="hero-badge-wrap"
          >
            <span className="pill">
              <span
                style={{
                  width: 8, height: 8, borderRadius: '50%',
                  background: '#4ade80',
                  boxShadow: '0 0 8px #4ade80',
                  display: 'inline-block',
                  animation: 'scroll-bounce 1.8s ease-in-out infinite',
                }}
              />
              Open to Work ↗
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="hero-title"
            style={{
              fontSize: 'clamp(38px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
              fontFamily: "'Outfit', sans-serif",
              textShadow: '0 2px 32px rgba(0,0,0,0.6)',
              textAlign: 'left',
            }}
          >
            Building{' '}
            <span className="grad-text">Modern</span>
            <br />
            Web Experiences
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="hero-subtitle"
            style={{
              fontSize: '18px',
              color: 'var(--text-sec)',
              maxWidth: '560px',
              margin: '0 0 40px 0',
              lineHeight: 1.7,
              textShadow: '0 1px 16px rgba(0,0,0,0.8)',
              textAlign: 'left',
            }}
          >
            Frontend Developer focused on crafting fast, beautiful, and accessible
            interfaces with React.js &amp; modern tooling.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="hero-ctas"
            style={{
              display: 'flex', gap: '16px',
              justifyContent: 'flex-start', flexWrap: 'wrap',
            }}
          >
            <button
              className="btn-primary"
              onClick={scrollToProjects}
              id="hero-view-projects"
            >
              View Projects <ArrowUpRight size={16} />
            </button>
            <a
              href="/resume.pdf"
              download
              className="btn-secondary"
              id="hero-download-resume"
              style={{ backdropFilter: 'blur(8px)', background: 'rgba(13,13,13,0.5)' }}
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>

          {/* Tech strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            style={{ marginTop: '70px', width: '100%' }}
            className="hero-tech-strip"
          >
            <p
              style={{
                fontSize: '12px', letterSpacing: '3px',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
                marginBottom: '20px',
                fontFamily: 'JetBrains Mono, monospace',
                textAlign: 'left',
              }}
              className="hero-tech-title"
            >
              Tech I Work With
            </p>
            <div
              style={{
                display: 'flex', gap: '12px',
                justifyContent: 'flex-start', flexWrap: 'wrap',
              }}
              className="hero-tech-badges"
            >
              {TECH_STRIP.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: '6px 16px',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    fontSize: '13px',
                    fontFamily: 'JetBrains Mono, monospace',
                    color: '#fff',
                    background: 'rgba(255,255,255,0.05)',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(61,107,86,0.8)';
                    e.currentTarget.style.color = 'var(--accent-lt)';
                    e.currentTarget.style.background = 'rgba(61,107,86,0.15)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Image Column ── */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
          className="hero-image-container"
          style={{ flex: '1 1 45%', display: 'flex', justifyContent: 'center' }}
        >
          {/* Circular portrait with wavy animated borders */}
          <div className="photo-wrap" style={{ position: 'relative', width: '100%', maxWidth: '440px', flexShrink: 0, pointerEvents: 'auto', margin: '0 auto', aspectRatio: '1' }}>

            {/* Wavy Background (Vibrant Green & Cyan border) */}
            <div style={{
              position: 'absolute', inset: -3,
              background: 'linear-gradient(135deg, #4ade80, #0ea5e9, #4ade80)',
              animation: 'blobRotate 10s linear infinite',
              borderRadius: '48% 52% 49% 51% / 51% 49% 52% 48%',
              zIndex: 0,
            }} />

            {/* Dark inner background to make the border pop (Black circle) */}
            <div style={{
              position: 'absolute', inset: 0,
              borderRadius: '50%',
              background: '#0a0a0a',
              zIndex: 1,
            }} />

            {/* Photo container (Perfect circle) */}
            <div style={{
              position: 'relative',
              borderRadius: '50%',
              overflow: 'hidden',
              zIndex: 2,
              margin: '3px',
              width: 'calc(100% - 6px)',
              aspectRatio: '1 / 1',
              background: 'transparent',
            }}>
              <img
                src="/blackish.png"
                alt="Vijay Gondhale"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                  display: 'block',
                }}
              />
            </div>

            {/* Available badge — centred below */}
            <div style={{
              position: 'absolute', bottom: -14, left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 5,
              background: 'rgba(13,13,13,0.92)',
              border: '1px solid rgba(61,107,86,0.6)',
              borderRadius: '20px',
              padding: '5px 14px',
              display: 'flex', alignItems: 'center', gap: '7px',
              fontSize: '11px', fontWeight: 600,
              color: '#4ade80',
              fontFamily: 'JetBrains Mono, monospace',
              backdropFilter: 'blur(10px)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#4ade80',
                boxShadow: '0 0 8px #4ade80',
                animation: 'pulse 2s ease-in-out infinite',
                display: 'inline-block',
              }} />
              Available
            </div>
          </div>
        </motion.div>
      </div>


      {/* Bottom-to-bg gradient fade */}
      <div
        style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '160px',
          background: 'linear-gradient(to bottom, transparent, var(--bg))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      <style>{`
        @keyframes blobRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 1024px) {
          .hero-content-wrapper {
            gap: 24px !important;
          }
          .hero-title {
            font-size: clamp(34px, 5vw, 56px) !important;
          }
          .photo-wrap {
            max-width: 320px !important;
          }
        }
        @media (max-width: 900px) {
          #home {
            padding-top: 40px !important;
            padding-bottom: 40px !important;
          }
          .hero-content-wrapper {
            flex-direction: column !important;
            text-align: center !important;
            padding-top: 40px;
          }
          .hero-text-container {
            align-items: center !important;
            text-align: center !important;
          }
          .hero-badge-wrap,
          .hero-ctas,
          .hero-tech-badges {
            justify-content: center !important;
          }
          .hero-title {
            font-size: clamp(32px, 8vw, 48px) !important;
            text-align: center !important;
          }
          .hero-subtitle {
            text-align: center !important;
            font-size: 16px !important;
            margin-bottom: 30px !important;
          }
          .hero-tech-title {
            text-align: center !important;
          }
          .hero-tech-strip {
            margin-top: 40px !important;
          }
          .hero-image-container {
            margin-top: 40px;
            width: 100%;
          }
          .photo-wrap {
            max-width: 300px !important;
          }
        }
        @media (max-width: 480px) {
          #home {
            padding-top: 20px !important;
          }
          .hero-title {
            font-size: clamp(28px, 10vw, 36px) !important;
          }
          .hero-ctas {
            flex-direction: column;
            width: 100%;
            gap: 12px !important;
          }
          .hero-ctas > * {
            width: 100%;
            justify-content: center;
          }
          .photo-wrap {
            max-width: 260px !important;
          }
        }
      `}</style>
    </section>
  );
}
