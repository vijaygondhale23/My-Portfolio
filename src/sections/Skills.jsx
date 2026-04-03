import { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const SKILL_GROUPS = [
  {
    title: 'FRONT END',
    skills: [
      { name: 'React.js',     pct: 88, color: '#61dafb' },
      { name: 'JavaScript',   pct: 84, color: '#f7df1e' },
      { name: 'HTML5 / CSS3', pct: 92, color: '#e34f26' },
      { name: 'Tailwind CSS', pct: 80, color: '#38bdf8' },
    ],
  },
  {
    title: 'BACK END & APIS',
    skills: [
      { name: 'Node.js',   pct: 70, color: '#3c873a' },
      { name: 'Express',   pct: 65, color: '#fff' },
      { name: 'MongoDB',   pct: 68, color: '#13aa52' },
      { name: 'REST APIs', pct: 78, color: '#9cdcfe' },
    ],
  },
  {
    title: 'TESTING & AUTOMATION',
    skills: [
      { name: 'Python',   pct: 75, color: '#3776ab' },
      { name: 'Pyats',    pct: 72, color: '#f7df1e' },
      { name: 'Jenkins',  pct: 65, color: '#d33833' },
      { name: 'Selenium', pct: 60, color: '#43b02a' },
    ],
  },
  {
    title: 'DEV TOOLS',
    skills: [
      { name: 'Git / GitHub', pct: 85, color: '#f05032' },
      { name: 'Vite',         pct: 78, color: '#646cff' },
      { name: 'Figma',        pct: 65, color: '#f24e1e' },
      { name: 'VS Code',      pct: 95, color: '#007acc' },
    ],
  },
];

function SkillBar({ name, pct, color }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setWidth(pct), 150);
      return () => clearTimeout(t);
    }
  }, [inView, pct]);

  return (
    <div className="skill-bar-row" ref={ref}>
      <span className="skill-bar-name">{name}</span>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
      <span className="skill-bar-pct" style={{ color }}>{pct}%</span>
    </div>
  );
}

export default function Skills() {
  return (
    <div>
      <span className="code-comment">// skills.json — tech stack & proficiency</span>
      <h2 className="section-heading">
        Skills & <span className="hl-pink">Technologies</span>
      </h2>
      <p className="section-subheading">// Tools I use to build things</p>

      <div className="skills-two-col">
        {SKILL_GROUPS.map((group, gi) => (
          <div key={gi} className={`fade-up-${gi + 1}`}>
            <div className="skill-category-title">{group.title}</div>
            {group.skills.map((skill, si) => (
              <SkillBar key={si} {...skill} />
            ))}
          </div>
        ))}
      </div>

      {/* Tech tag cloud */}
      <div style={{ marginTop: 48 }}>
        <div className="skill-category-title" style={{ marginBottom: 16 }}>OTHER TOOLS & TECHNOLOGIES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Bootstrap', 'Next.js', 'Wireshark', 'Cisco VIRL', 'BitBucket', 'Postman', 'CRDS', 'Linux', 'Firebase', 'Redux'].map(tag => (
            <span key={tag} style={{
              display: 'inline-block', padding: '4px 12px', borderRadius: 3,
              background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-dim)',
              color: 'var(--syn-faded)', fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.2s', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-mid)'; e.currentTarget.style.color = 'var(--syn-white)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-dim)'; e.currentTarget.style.color = 'var(--syn-faded)'; }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
