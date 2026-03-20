import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Starfield from '../components/Starfield';

const SKILL_CATEGORIES = [
  {
    id: 'frontend',
    title: 'FRONT END',
    accent: '#4e8a6e',
    description:
      'As a frontend developer, I focus on creating visually appealing, responsive & interactive user interfaces. I specialise in turning complex designs into efficient web applications with cross-browser compatibility.',
    icons: [
      {
        label: 'HTML5',
        bg: '#e34f26',
        svg: <i className="fi fi-brands-html5" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'CSS3',
        bg: '#1572b6',
        svg: <i className="fi fi-brands-css3" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'JavaScript',
        bg: '#f7df1e',
        svg: <i className="fi fi-brands-js" style={{ fontSize: "32px", color: "#000" }}></i>,
      },
      {
        label: 'Bootstrap',
        bg: '#7952b3',
        svg: <i className="fi fi-brands-bootstrap" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'React',
        bg: '#20232a',
        svg: <i className="fi fi-br-react" style={{ fontSize: "32px", color: "#61dafb" }}></i>,
      },
      {
        label: 'Tailwind',
        bg: '#0f172a',
        svg: <i className="fi fi-br-wind" style={{ fontSize: "32px", color: "#38bdf8" }}></i>,
      },
    ],
    tags: ['Responsive Design', 'Animations', 'Form Validation', 'Cross Compatibility', 'Performance Optimization'],
  },
  {
    id: 'backend',
    title: 'BACK END',
    accent: '#4e8a6e',
    description:
      'I build scalable server-side applications and RESTful APIs using Node.js and Express. I work with MongoDB for flexible data storage and understand core backend concepts like authentication, middleware, and data modelling.',
    icons: [
      {
        label: 'Node.js',
        bg: '#3c873a',
        svg: <i className="fi fi-brands-node-js" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'Express',
        bg: '#000',
        svg: <i className="fi fi-br-truck-moving" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'MongoDB',
        bg: '#13aa52',
        svg: <i className="fi fi-br-leaf" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'Python',
        bg: '#3776ab',
        svg: <i className="fi fi-brands-python" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
    ],
    tags: ['REST APIs', 'Authentication', 'Middleware', 'Data Modelling', 'CRUD Operations'],
  },
  {
    id: 'tools',
    title: 'DEV TOOLS',
    accent: '#4e8a6e',
    description:
      'I use industry-standard tools and workflows to maintain clean, efficient, and collaborative codebases. From version control with Git to bundling with Vite, I ensure smooth development and deployment pipelines.',
    icons: [
      {
        label: 'Git',
        bg: '#f05032',
        svg: <i className="fi fi-br-code-branch" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'GitHub',
        bg: '#181717',
        svg: <i className="fi fi-brands-github" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'VS Code',
        bg: '#007acc',
        svg: <i className="fi fi-br-laptop-code" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'Vite',
        bg: '#646cff',
        svg: <i className="fi fi-br-bolt" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'Figma',
        bg: '#1e1e1e',
        svg: <i className="fi fi-brands-figma" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
      {
        label: 'Postman',
        bg: '#ff6c37',
        svg: <i className="fi fi-br-paper-plane" style={{ fontSize: "32px", color: "#fff" }}></i>,
      },
    ],
    tags: ['Version Control', 'CI/CD', 'API Testing', 'Debugging', 'Code Review'],
  },
];

function TagChip({ label }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '7px 14px',
        borderRadius: '8px',
        border: '1px solid var(--tag-border)',
        fontSize: '13px',
        color: 'var(--text-sec)',
        background: 'var(--tag-bg)',
        transition: 'all 0.2s',
        cursor: 'default',
        whiteSpace: 'nowrap',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--tag-hover-border)';
        e.currentTarget.style.color = 'var(--text-pri)';
        e.currentTarget.style.background = 'var(--tag-hover-bg)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--tag-border)';
        e.currentTarget.style.color = 'var(--text-sec)';
        e.currentTarget.style.background = 'var(--tag-bg)';
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M1 6h3m7 0h-3m-4 0a1 1 0 102 0 1 1 0 00-2 0z"
          stroke="var(--accent-lt)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      {label}
    </span>
  );
}

function IconTile({ icon, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.1 + index * 0.07, duration: 0.4, ease: 'easeOut' }}
      data-tooltip={icon.label}
      style={{
        position: 'relative',
        width: '64px',
        height: '64px',
        margin: '0 auto',
        borderRadius: '14px',
        background: icon.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 16px var(--icon-tile-shadow)',
        flexShrink: 0,
        cursor: 'default',
      }}
      className="skill-icon-tile"
      whileHover={{ scale: 1.12, boxShadow: '0 8px 28px var(--icon-tile-shadow)' }}
    >
      {icon.svg}
    </motion.div>
  );
}

function SkillCard({ category, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="skill-card-grid"
      transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: '36px',
        alignItems: 'center',
        background: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '20px',
        padding: '32px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-hover)';
        e.currentTarget.style.boxShadow = '0 0 40px var(--accent-glow)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* ── Left: icon grid ── */}
      <div
        className="skill-icon-grid"
        style={{
          background: 'var(--code-bg)',
          borderRadius: '16px',
          padding: '20px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        {category.icons.map((icon, i) => (
          <IconTile key={icon.label} icon={icon} index={i} inView={inView} />
        ))}
      </div>

      {/* ── Right: title + description + tags ── */}
      <div className="skill-info">
        <motion.h3
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.2 + index * 0.12, duration: 0.5 }}
          style={{
            fontSize: 'clamp(18px, 2.5vw, 24px)',
            fontWeight: 800,
            letterSpacing: '2px',
            color: 'var(--text-pri)',
            marginBottom: '14px',
          }}
        >
          {category.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.28 + index * 0.12, duration: 0.5 }}
          style={{
            fontSize: '15px',
            lineHeight: 1.75,
            color: 'var(--text-sec)',
            marginBottom: '22px',
            maxWidth: '520px',
          }}
        >
          {category.description}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 + index * 0.12, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}
        >
          {category.tags.map(tag => (
            <TagChip key={tag} label={tag} />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [headerRef, headerInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="skills" className="section-pad" style={{ background: 'var(--bg-alt)', position: 'relative', overflow: 'hidden' }}>
      <Starfield />
      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div ref={headerRef} className="skills-header">
          <motion.p
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '12px' }}
          >
            Skills &amp; Tech
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              fontSize: 'clamp(28px, 4vw, 40px)',
              fontWeight: 700,
              marginBottom: '56px',
              maxWidth: '540px',
              color: 'var(--text-pri)',
            }}
          >
            Tools &amp; technologies I{' '}
            <span className="grad-text">work with</span>
          </motion.h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
