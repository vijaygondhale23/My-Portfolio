import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      {/* Grid background */}
      <div className="hero-grid-bg" aria-hidden="true" />

      {/* Main content */}
      <div className="hero-inner container-max">
        {/* Left column */}
        <div className="hero-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hero-subtitle"
          >
            vijay.dev
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="hero-heading"
          >
            Vijay Gondhale
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="hero-desc"
          >
            I'm a frontend developer passionate about web development. I use{' '}
            <strong>React.js</strong>, <strong>Next.js</strong>,{' '}
            <strong>Node.js</strong>, and <strong>Tailwind CSS</strong> to build web
            applications. To see the applications I've developed, click the link
            below to visit my projects!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="hero-btns"
          >
            <button
              onClick={scrollToProjects}
              id="hero-projects-btn"
              className="hero-btn-fill"
            >
              Projects
            </button>
            <button
              onClick={scrollToContact}
              id="hero-contact-btn"
              className="hero-btn-outline"
            >
              Contact <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className="hero-right"
        >
          <img
            src="/laptop-hero.png"
            alt="Developer workspace"
            className="hero-img"
          />
        </motion.div>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--bg);
        }

        .hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(var(--grid-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
          background-size: 100px 100px;
          pointer-events: none;
          z-index: 0;
        }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          width: 100%;
          padding-top: 120px;
          padding-bottom: 80px;
        }

        .hero-left {
          flex: 0 1 540px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .hero-subtitle {
          font-size: 16px;
          color: var(--text-sec);
          margin-bottom: 16px;
          font-family: 'Outfit', sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
        }

        .hero-heading {
          font-size: clamp(42px, 5.5vw, 68px);
          font-weight: 800;
          line-height: 1.08;
          letter-spacing: -0.02em;
          font-family: 'Outfit', sans-serif;
          color: var(--text-pri);
          margin-bottom: 20px;
        }

        .hero-desc {
          font-size: 16px;
          line-height: 1.75;
          color: var(--text-sec);
          max-width: 480px;
          margin-bottom: 32px;
          font-family: 'Outfit', sans-serif;
        }

        .hero-desc strong {
          color: var(--hero-desc-strong);
          font-weight: 600;
        }

        .hero-btns {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .hero-btn-fill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 32px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          background: var(--btn-fill-bg);
          color: var(--btn-fill-color);
          border: 1px solid var(--btn-fill-bg);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-btn-fill:hover {
          background: transparent;
          color: var(--btn-fill-bg);
          border-color: var(--btn-fill-bg);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--accent-glow);
        }

        .hero-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 12px 32px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 15px;
          font-family: 'Outfit', sans-serif;
          background: transparent;
          color: var(--btn-outline-color);
          border: 1px solid var(--btn-outline-border);
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hero-btn-outline:hover {
          background: var(--btn-fill-bg);
          color: var(--btn-fill-color);
          border-color: var(--btn-fill-bg);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px var(--accent-glow);
        }

        .hero-right {
          flex: 0 1 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-img {
          width: 100%;
          max-width: 520px;
          height: auto;
          display: block;
          object-fit: contain;
        }

        /* Laptop image stays the same in both themes */

        @media (max-width: 1024px) {
          .hero-inner { gap: 40px; }
          .hero-left { flex: 0 1 480px; }
          .hero-right { flex: 0 1 420px; }
          .hero-heading { font-size: clamp(36px, 5vw, 54px); }
        }

        @media (max-width: 768px) {
          .hero-section { min-height: auto; }

          .hero-inner {
            flex-direction: column;
            text-align: center;
            padding-top: 100px;
            padding-bottom: 60px;
            gap: 48px;
          }

          .hero-left {
            align-items: center;
            flex: none;
            width: 100%;
          }

          .hero-heading {
            font-size: clamp(32px, 8vw, 48px);
            text-align: center;
          }

          .hero-desc {
            text-align: center;
            max-width: 100%;
          }

          .hero-btns { justify-content: center; }

          .hero-right {
            flex: none;
            width: 100%;
            max-width: 400px;
          }

          .hero-grid-bg { background-size: 60px 60px; }
        }

        @media (max-width: 480px) {
          .hero-inner {
            padding-top: 80px;
            padding-bottom: 40px;
          }
          .hero-heading { font-size: clamp(28px, 9vw, 38px); }
          .hero-btns {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }
          .hero-btn-fill,
          .hero-btn-outline {
            width: 100%;
            justify-content: center;
          }
          .hero-right { max-width: 300px; }
          .hero-grid-bg { background-size: 50px 50px; }
        }
      `}</style>
    </section>
  );
}
