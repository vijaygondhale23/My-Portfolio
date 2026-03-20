import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Starfield from '../components/Starfield';

const EXPERIENCE = [
  {
    company: 'Wipro Ltd',
    team: 'Cisco SRTS Team',
    role: 'Automation Test Engineer',
    type: 'Full-time',
    location: 'Mumbai, Maharashtra, India',
    start: 'Mar 2024',
    end: 'Jun 2024',
    current: false,
    bullets: [
      'Developed and maintained automated test scripts using Python and Pyats for validating network features.',
      'Performed functional, regression, and performance testing across Cisco\'s routing, switching, and transport modules.',
      'Integrated test automation with CI/CD pipelines using Jenkins and BitBucket CI for nightly and on-demand runs.',
      'Collaborated with cross-functional teams to deliver sprint goals within tight deadlines.',
    ],
    tools: ['Python', 'Pyats', 'Jenkins', 'BitBucket', 'Cisco VIRL', 'Wireshark', 'CRDS'],
  },
];

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });
  const [expanded, setExpanded] = useState(true);

  return (
    <section id="experience" className="section-pad" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '12px' }}
        >
          Work History
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: '64px', maxWidth: '540px', color: 'var(--text-pri)' }}
        >
          Where I've{' '}
          <span className="grad-text">worked</span>
        </motion.h2>

        <div className="exp-timeline" style={{ position: 'relative', paddingLeft: '48px' }}>
          {/* Timeline vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'absolute', left: '19px', top: '24px',
              width: '2px', height: 'calc(100% - 24px)',
              background: 'linear-gradient(to bottom, var(--accent), var(--timeline-color))',
              transformOrigin: 'top',
            }}
          />

          {EXPERIENCE.map((job, i) => (
            <motion.div
              key={job.company + i}
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
              style={{ position: 'relative', marginBottom: '32px' }}
            >
              {/* Timeline dot */}
              <div className="exp-dot" style={{
                position: 'absolute', left: -38, top: '24px',
                width: '16px', height: '16px',
                borderRadius: '50%',
                background: job.current ? 'var(--accent)' : 'var(--surface)',
                border: '2px solid var(--accent)',
                boxShadow: job.current ? '0 0 16px var(--accent-glow)' : 'none',
              }} />
              {job.current && (
                <div className="exp-dot-ring" style={{
                  position: 'absolute', left: -41, top: '21px',
                  width: '22px', height: '22px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-hover)',
                  animation: 'scroll-bounce 2s ease-in-out infinite',
                }} />
              )}

              {/* Card */}
              <div
                className="project-card"
                style={{ cursor: 'default' }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', align: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                      <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-pri)' }}>{job.company}</h3>
                      {job.current && (
                        <span className="pill" style={{ fontSize: '11px', padding: '3px 10px' }}>
                          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 6px #4ade80', display: 'inline-block' }} />
                          Current
                        </span>
                      )}
                    </div>
                    <p style={{ color: 'var(--accent-lt)', fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{job.role}</p>
                    <p style={{ color: 'var(--text-sec)', fontSize: '13px', fontFamily: 'JetBrains Mono, monospace' }}>{job.team}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                    <div style={{ display: 'flex', align: 'center', gap: '6px', color: 'var(--text-sec)', fontSize: '13px' }}>
                      <Calendar size={13} />
                      <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{job.start} — {job.end}</span>
                    </div>
                    <div style={{ display: 'flex', align: 'center', gap: '6px', color: 'var(--text-sec)', fontSize: '13px' }}>
                      <MapPin size={13} />
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>

                {/* Toggle */}
                <button
                  id="exp-toggle-btn"
                  onClick={() => setExpanded(e => !e)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-sec)', fontSize: '13px', marginTop: '20px',
                    fontFamily: 'JetBrains Mono, monospace', padding: 0,
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-pri)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-sec)'}
                >
                  {expanded ? <><ChevronUp size={14} /> Hide details</> : <><ChevronDown size={14} /> Show details</>}
                </button>

                {/* Expandable content */}
                <motion.div
                  initial={false}
                  animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <ul style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '0', listStyle: 'none' }}>
                    {job.bullets.map((b, bi) => (
                      <li key={bi} style={{ display: 'flex', gap: '12px', color: 'var(--text-sec)', fontSize: '14px', lineHeight: 1.7 }}>
                        <span style={{ color: 'var(--accent-lt)', marginTop: '2px', flexShrink: 0 }}>▶</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
                    {job.tools.map(t => (
                      <span
                        key={t}
                        style={{
                          padding: '4px 12px', borderRadius: '6px',
                          background: 'var(--tag-bg)',
                          border: '1px solid var(--tag-border)',
                          color: 'var(--accent-lt)',
                          fontSize: '12px',
                          fontFamily: 'JetBrains Mono, monospace',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
