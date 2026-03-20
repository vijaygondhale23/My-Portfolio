import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import Starfield from '../components/Starfield';

const PROJECTS = [
  {
    id: 'project-management',
    title: 'Project Management System',
    duration: 'May – Jun 2024',
    description:
      'A full-featured task and project management frontend with responsive layout, intuitive drag-and-drop UX flows, real-time status tracking, and polished interactive UI components. Inspired by Trello/Linear design patterns.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript', 'React'],
    github: 'https://github.com/vijaygondhale23',
    live: '#',
    accent: '#3D6B56',
    badge: 'Frontend',
    emoji: '📋',
    logoNode: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#1e40af' }}>
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          <path d="M19.13 5.05a10 10 0 1 1-14.26 0"/>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#1e40af', letterSpacing: '1px' }}>PROJECT</span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#3b82f6', letterSpacing: '2px' }}>MANAGEMENT</span>
        </div>
      </div>
    ),
  },
  {
    id: 'student-record-system',
    title: 'Student Record System',
    duration: 'Dec 2024 – Jan 2025',
    description:
      'Full-stack CRUD application enabling complete student record administration with a responsive dashboard, real-time search, filtering, and pagination. Built on MERN stack with RESTful API design.',
    tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/vijaygondhale23',
    live: '#',
    accent: '#4e6b84',
    badge: 'Full-Stack',
    emoji: '🎓',
    logoNode: (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#0f766e' }}>
          <path d="M2 13v6c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-6M2 9v2M22 9v2M12 2s-3.5 2-8 3c0 0 1.5 6 8 8 6.5-2 8-8 8-8-4.5-1-8-3-8-3z"/>
          <path d="M12 21v-4"/>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: 1 }}>
          <span style={{ fontSize: '22px', fontWeight: 800, color: '#0f766e', letterSpacing: '1px' }}>STUDENT</span>
          <span style={{ fontSize: '15px', fontWeight: 600, color: '#14b8a6', letterSpacing: '2px' }}>RECORD SYSTEM</span>
        </div>
      </div>
    ),
  },
];

const MotionCard = ({ project, i, inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.2 + i * 0.18, duration: 0.7, ease: 'easeOut' }}
    className="project-card"
    id={`project-card-${project.id}`}
    style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}
  >
    {/* Project Image */}
    <div style={{
      width: '100%', aspectRatio: '16/10',
      borderRadius: '12px', overflow: 'hidden',
      marginBottom: '4px', background: 'var(--card-bg)'
    }}>
      <div
        style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: 'var(--surface)',
          transition: 'transform 0.4s ease',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        {project.logoNode}
      </div>
    </div>

    {/* Top row */}
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
      <div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '24px' }}>{project.emoji}</span>
          <span
            style={{
              padding: '3px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '1px', textTransform: 'uppercase',
              background: `${project.accent}22`,
              border: `1px solid ${project.accent}55`,
              color: 'var(--accent-lt)',
            }}
          >
            {project.badge}
          </span>
        </div>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-pri)', marginBottom: '6px' }}>
          {project.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-sec)', fontSize: '13px' }}>
          <Calendar size={13} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>{project.duration}</span>
        </div>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            id={`github-${project.id}`}
            style={{
              width: 36, height: 36, borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--tag-bg)',
              border: '1px solid var(--tag-border)',
              color: 'var(--text-sec)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--tag-hover-bg)';
              e.currentTarget.style.borderColor = 'var(--tag-hover-border)';
              e.currentTarget.style.color = 'var(--text-pri)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--tag-bg)';
              e.currentTarget.style.borderColor = 'var(--tag-border)';
              e.currentTarget.style.color = 'var(--text-sec)';
            }}
            aria-label={`GitHub for ${project.title}`}
          >
            <Github size={16} />
          </a>
        )}
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            id={`live-${project.id}`}
            style={{
              width: 36, height: 36, borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--tag-bg)',
              border: '1px solid var(--tag-border)',
              color: 'var(--text-sec)',
              transition: 'all 0.2s',
            }}
            aria-label={`Live demo for ${project.title}`}
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </div>

    {/* Description */}
    <p style={{ color: 'var(--text-sec)', fontSize: '14px', lineHeight: 1.8, flex: 1 }}>
      {project.description}
    </p>

    {/* Tech stack */}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto' }}>
      {project.tech.map(t => (
        <span
          key={t}
          style={{
            padding: '5px 12px', borderRadius: '7px',
            background: 'var(--tag-bg)',
            border: '1px solid var(--tag-border)',
            color: 'var(--text-sec)',
            fontSize: '12px',
            fontFamily: 'JetBrains Mono, monospace',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--tag-hover-bg)';
            e.currentTarget.style.borderColor = 'var(--tag-hover-border)';
            e.currentTarget.style.color = 'var(--text-pri)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--tag-bg)';
            e.currentTarget.style.borderColor = 'var(--tag-border)';
            e.currentTarget.style.color = 'var(--text-sec)';
          }}
        >
          {t}
        </span>
      ))}
    </div>

    {/* View source CTA */}
    <a
      href={project.github}
      target="_blank"
      rel="noreferrer"
      style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        color: 'var(--accent-lt)', fontSize: '13px', fontWeight: 600,
        textDecoration: 'none', fontFamily: 'JetBrains Mono, monospace',
        marginTop: '4px', transition: 'gap 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.gap = '10px'}
      onMouseLeave={e => e.currentTarget.style.gap = '6px'}
    >
      View source code →
    </a>
  </motion.div>
);

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="projects"
      className="section-pad"
      ref={ref}
      style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}
    >
      <Starfield />
      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '12px' }}
        >
          Selected Work
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: '64px', maxWidth: '540px', color: 'var(--text-pri)' }}
        >
          Things I've{' '}
          <span className="grad-text">built</span>
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {PROJECTS.map((project, i) => (
            <MotionCard key={project.id} project={project} i={i} inView={inView} />
          ))}
        </div>

        {/* More on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ textAlign: 'center', marginTop: '48px' }}
        >
          <a
            href="https://github.com/vijaygondhale23"
            target="_blank"
            rel="noreferrer"
            id="more-github"
            className="btn-secondary"
          >
            <Github size={16} />
            More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
