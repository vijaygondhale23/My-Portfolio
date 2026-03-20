import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, GraduationCap, Briefcase, Github, Linkedin, Star } from 'lucide-react';
import Starfield from '../components/Starfield';

const STATS = [
  { icon: <Briefcase size={16} />, label: '4 Months Exp',   desc: 'Wipro Ltd' },
  { icon: <Star size={16} />,      label: '3 Projects',   desc: 'Full-stack & Frontend' },
  { icon: <GraduationCap size={16} />, label: '8.05 CGPA', desc: 'B.Sc. CS' },
  { icon: <MapPin size={16} />,    label: 'Thane, India', desc: 'Maharashtra' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-pad" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* ── Two-column grid: [Left: heading+bio] [Right: stats+code] ── */}
          <div className="about-layout">
            {/* ── Left Column: Heading + Bio ── */}
            <motion.div variants={fadeUp} className="about-left">
              <p className="section-label" style={{ marginBottom: '12px' }}>
                About Me
              </p>
              <h2 style={{
                fontSize: 'clamp(28px, 4vw, 40px)',
                fontWeight: 700,
                marginBottom: '32px',
                color: 'var(--text-pri)',
              }}>
                Passionate about{' '}
                <span className="grad-text">pixel-perfect</span> interfaces
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, fontSize: '16px' }}>
                  Hi! I'm <strong style={{ color: 'var(--text-pri)' }}>Vijay Gondhale</strong>, a Frontend Developer
                  based in Thane, Maharashtra. I specialise in building responsive, accessible, and
                  visually compelling web applications using React.js and modern CSS frameworks.
                </p>
                <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, fontSize: '16px' }}>
                  Had Experience at <strong style={{ color: 'var(--text-pri)' }}>Wipro Ltd</strong>  in
                  Cisco SRTS Team, I bridge the gap between design and engineering — turning
                  complex requirements into elegant user experiences.
                </p>
                <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, fontSize: '16px' }}>
                  When I'm not coding, I'm exploring new frontend patterns, contributing to side
                  projects, or grinding Python on Udemy.
                </p>

                {/* Social links */}
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                  {[
                    { href: 'https://linkedin.com/in/vgondhale23', id: 'about-linkedin', icon: <Linkedin size={16} />, label: 'LinkedIn' },
                    { href: 'https://github.com/vijaygondhale23',  id: 'about-github',   icon: <Github size={16} />,   label: 'GitHub' },
                  ].map(({ href, id, icon, label }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      id={id}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '10px 20px', borderRadius: '10px',
                        border: '1px solid var(--border)',
                        color: 'var(--text-sec)', textDecoration: 'none',
                        fontSize: '14px', fontWeight: 500,
                        transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'var(--btn-fill-bg)';
                        e.currentTarget.style.color = 'var(--btn-fill-color)';
                        e.currentTarget.style.borderColor = 'var(--btn-fill-bg)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-sec)';
                        e.currentTarget.style.borderColor = 'var(--border)';
                      }}
                    >
                      {icon} {label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Right Column: Stats + Code card ── */}
            <motion.div variants={fadeUp} className="about-right">
              {/* Stats grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {STATS.map(({ icon, label, desc }) => (
                  <div
                    key={label}
                    className="glass shimmer-border"
                    style={{
                      padding: '18px 14px', borderRadius: '14px',
                      display: 'flex', flexDirection: 'column', gap: '8px',
                      transition: 'all 0.25s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ color: 'var(--accent-lt)' }}>{icon}</div>
                    <p style={{ fontWeight: 700, fontSize: '14px', color: 'var(--text-pri)' }}>{label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace' }}>{desc}</p>
                  </div>
                ))}
              </div>

              {/* Code snippet card */}
              <div
                className="glass"
                style={{ borderRadius: '14px', padding: '22px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: 1.8, marginTop: '12px' }}
              >
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div><span style={{ color: '#7c9e8c' }}>const </span><span style={{ color: '#9fcfb4' }}>developer</span><span style={{ color: 'var(--text-pri)' }}> = {'{'}</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>name</span><span style={{ color: 'var(--text-pri)' }}>: </span><span style={{ color: '#d4a27f' }}>"Vijay Gondhale"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>role</span><span style={{ color: 'var(--text-pri)' }}>: </span><span style={{ color: '#d4a27f' }}>"Frontend Dev"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>location</span><span style={{ color: 'var(--text-pri)' }}>: </span><span style={{ color: '#d4a27f' }}>"Thane, IN"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>available</span><span style={{ color: 'var(--text-pri)' }}>: </span><span style={{ color: '#7ec8a4' }}>true</span></div>
                <div><span style={{ color: 'var(--text-pri)' }}>{'};'}</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .about-layout {
          display: grid;
          grid-template-columns: 1fr 320px;
          gap: 48px;
          align-items: start;
        }

        .about-left {
          display: flex;
          flex-direction: column;
        }

        .about-right {
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 100px;
        }

        @media (max-width: 900px) {
          .about-layout {
            grid-template-columns: 1fr !important;
            gap: 32px;
          }
          .about-left {
            text-align: center;
            align-items: center;
          }
          .about-right {
            position: static;
            max-width: 400px;
            justify-self: center;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
