import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';
import Starfield from '../components/Starfield';

const EDUCATION = [
  {
    id: 'bsc-cs',
    degree: 'B.Sc. in Computer Science',
    institution: 'Ram-Niranjan Jhunjhunwala College, Ghatkopar',
    location: 'Mumbai, Maharashtra',
    score: '8.05 CGPA',
    duration: '07/2021 – 07/2024',
    type: 'Degree',
    emoji: '🎓',
  },
  {
    id: 'hsc',
    degree: '12th Board (HSC)',
    institution: 'B.N.N College, Bhiwandi',
    location: 'Thane, Maharashtra',
    score: '81.33%',
    duration: '05/2020 – 05/2021',
    type: 'Board',
    emoji: '📚',
  },
];

const CERTIFICATIONS = [
  {
    id: 'udemy-python',
    title: '100 Days of Code: Python Bootcamp',
    issuer: 'Udemy',
    instructor: 'Dr. Angela Yu',
    year: '2024',
    emoji: '🐍',
    link: '#',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' },
  }),
};

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="education" className="section-pad" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '12px' }}
        >
          Academic Background
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: '64px', maxWidth: '540px', color: 'var(--text-pri)' }}
        >
          Education &amp;{' '}
          <span className="grad-text">Credentials</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '48px' }}>
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="project-card"
              id={`edu-${edu.id}`}
              style={{ cursor: 'default' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '32px' }}>{edu.emoji}</span>
                <span
                  style={{
                    padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                    fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px',
                    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
                    color: 'var(--accent-lt)',
                  }}
                >
                  {edu.type}
                </span>
              </div>

              <div style={{ marginTop: '16px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-pri)', marginBottom: '6px' }}>{edu.degree}</h3>
                <p style={{ color: 'var(--accent-lt)', fontWeight: 600, fontSize: '14px', marginBottom: '12px' }}>{edu.institution}</p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-sec)', fontSize: '13px' }}>
                    <MapPin size={13} />
                    <span>{edu.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-sec)', fontSize: '13px' }}>
                    <Calendar size={13} />
                    <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{edu.duration}</span>
                  </div>
                </div>

                <div
                  style={{
                    marginTop: '20px', padding: '12px 16px', borderRadius: '10px',
                    background: 'var(--tag-bg)', border: '1px solid var(--tag-border)',
                    display: 'flex', alignItems: 'center', gap: '10px',
                  }}
                >
                  <GraduationCap size={16} style={{ color: 'var(--accent-lt)', flexShrink: 0 }} />
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px' }}>SCORE</p>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-pri)' }}>{edu.score}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <Award size={18} style={{ color: 'var(--accent-lt)' }} />
            <p style={{ fontWeight: 600, fontSize: '16px', color: 'var(--text-pri)' }}>Certifications</p>
            <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CERTIFICATIONS.map((cert) => (
              <a
                key={cert.id}
                href={cert.link}
                id={`cert-${cert.id}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '20px 24px', borderRadius: '14px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--tag-hover-bg)';
                  e.currentTarget.style.borderColor = 'var(--tag-hover-border)';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--card-bg)';
                  e.currentTarget.style.borderColor = 'var(--card-border)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <span style={{ fontSize: '28px' }}>{cert.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 600, color: 'var(--text-pri)', fontSize: '15px', marginBottom: '4px' }}>{cert.title}</p>
                  <p style={{ color: 'var(--text-sec)', fontSize: '13px' }}>
                    {cert.issuer} · {cert.instructor} · {cert.year}
                  </p>
                </div>
                <span style={{ color: 'var(--accent-lt)', fontSize: '18px' }}>↗</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
