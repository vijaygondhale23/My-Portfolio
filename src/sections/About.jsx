import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, GraduationCap, Briefcase, Github, Linkedin, Star } from 'lucide-react';

const STATS = [
  { icon: <Briefcase size={16} />, label: '1 Year Exp',   desc: 'Wipro Ltd' },
  { icon: <Star size={16} />,      label: '2 Projects',   desc: 'Full-stack & Frontend' },
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
    <section id="about" className="section-pad" ref={ref}>
      <div className="container-max">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Label + heading */}
          <div className="about-header">
            <motion.p variants={fadeUp} className="section-label" style={{ marginBottom: '12px' }}>
              About Me
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: '56px', maxWidth: '600px' }}
            >
              Passionate about{' '}
              <span className="grad-text">pixel-perfect</span> interfaces
            </motion.h2>
          </div>

          {/* ── Main grid: [Bio] [Stats] ── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '48px',
              alignItems: 'start',
            }}
            className="about-grid"
          >
            {/* ── Column 1: Bio ── */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 }}>
              <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, fontSize: '16px' }}>
                Hi! I'm <strong style={{ color: '#fff' }}>Vijay Gondhale</strong>, a Frontend Developer
                based in Thane, Maharashtra. I specialise in building responsive, accessible, and
                visually compelling web applications using React.js and modern CSS frameworks.
              </p>
              <p style={{ color: 'var(--text-sec)', lineHeight: 1.85, fontSize: '16px' }}>
                Currently working at <strong style={{ color: '#fff' }}>Wipro Ltd</strong> on the
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
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-sec)', textDecoration: 'none',
                      fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'rgba(61,107,86,0.5)';
                      e.currentTarget.style.color = 'var(--accent-lt)';
                      e.currentTarget.style.background = 'rgba(61,107,86,0.06)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                      e.currentTarget.style.color = 'var(--text-sec)';
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    {icon} {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* ── Column 3: Stats + code card ── */}
            <motion.div variants={fadeUp} style={{ display: 'flex', flexDirection: 'column', gap: '16px', minWidth: '260px' }}>
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
                    <p style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{label}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace' }}>{desc}</p>
                  </div>
                ))}
              </div>

              {/* Code snippet card */}
              <div
                className="glass"
                style={{ borderRadius: '14px', padding: '22px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: 1.8 }}
              >
                <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
                  {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                    <div key={c} style={{ width: 11, height: 11, borderRadius: '50%', background: c }} />
                  ))}
                </div>
                <div><span style={{ color: '#7c9e8c' }}>const </span><span style={{ color: '#9fcfb4' }}>developer</span><span style={{ color: '#fff' }}> = {'{'}</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>name</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#d4a27f' }}>"Vijay Gondhale"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>role</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#d4a27f' }}>"Frontend Dev"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>location</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#d4a27f' }}>"Thane, IN"</span><span style={{ color: 'var(--text-sec)' }}>,</span></div>
                <div style={{ paddingLeft: '18px' }}><span style={{ color: '#9fcfb4' }}>available</span><span style={{ color: '#fff' }}>: </span><span style={{ color: '#7ec8a4' }}>true</span></div>
                <div><span style={{ color: '#fff' }}>{'}'};</span></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Keyframe styles for ring spin + badge pulse */}
      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes borderSpin {
          from { --angle: 0deg; }
          to   { --angle: 360deg; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
