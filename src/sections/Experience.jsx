import { useState } from 'react';

const EXPERIENCE = [
  {
    company: 'Wipro Ltd',
    team: 'Cisco SRTS Team',
    role: 'Automation Test Engineer',
    type: 'Full-time',
    location: 'Mumbai, Maharashtra, India',
    start: 'Mar 2024',
    end: 'Jun 2024',
    bullets: [
      'Developed and maintained automated test scripts using Python and Pyats for validating network features.',
      'Performed functional, regression, and performance testing across Cisco routing, switching, and transport modules.',
      'Integrated test automation with CI/CD pipelines using Jenkins and BitBucket CI for nightly and on-demand runs.',
      'Collaborated with cross-functional teams to deliver sprint goals within tight deadlines.',
    ],
    tools: ['Python', 'Pyats', 'Jenkins', 'BitBucket', 'Cisco VIRL', 'Wireshark', 'CRDS'],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <span className="code-comment">// experience.ts — work history</span>
      <h2 className="section-heading">
        Where I've <span className="hl-cyan">Worked</span>
      </h2>
      <p className="section-subheading">// Professional experience timeline</p>

      <div className="exp-timeline fade-up">
        <div className="exp-line" />

        {EXPERIENCE.map((job, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: 24 }}>
            <div className="exp-dot" />
            <div className="exp-card">
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 14 }}>
                <div>
                  <div className="exp-company">{job.company}</div>
                  <div className="exp-role">{job.role}</div>
                  <div className="exp-team">{job.team}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-end' }}>
                  <span className="exp-meta">📅 {job.start} — {job.end}</span>
                  <span className="exp-meta">📍 {job.location}</span>
                  <span style={{
                    display: 'inline-block', padding: '2px 10px', borderRadius: 3,
                    fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
                    background: 'rgba(78,201,176,0.1)', border: '1px solid rgba(78,201,176,0.3)',
                    color: 'var(--syn-green)', marginTop: 4,
                  }}>
                    {job.type}
                  </span>
                </div>
              </div>

              {/* Toggle */}
              <button
                onClick={() => setExpanded(p => !p)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--syn-faded)', fontSize: 12,
                  fontFamily: 'JetBrains Mono, monospace',
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: 0, transition: 'color 0.2s', marginBottom: 4,
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--syn-white)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--syn-faded)'}
              >
                {expanded ? '▾ hide details' : '▸ show details'}
              </button>

              {/* Bullets */}
              {expanded && (
                <div style={{ marginTop: 12 }}>
                  {job.bullets.map((b, bi) => (
                    <div key={bi} className="exp-bullet">{b}</div>
                  ))}
                  <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {job.tools.map(t => (
                      <span key={t} className="exp-tool">{t}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Open to work notice */}
        <div style={{ position: 'relative', marginBottom: 0 }}>
          <div style={{
            position: 'absolute', left: -22, top: 14,
            width: 12, height: 12, borderRadius: '50%',
            background: '#4ade80', border: '2px solid var(--vsc-bg)',
            boxShadow: '0 0 10px rgba(74,222,128,0.6)',
            animation: 'scroll-bounce 2s ease-in-out infinite',
          }} />
          <div style={{
            background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.25)',
            borderRadius: 6, padding: '20px 24px',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>🚀</span>
            <div>
              <p style={{ color: '#4ade80', fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
                Open to Opportunities
              </p>
              <p style={{ color: 'var(--syn-faded)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
                Actively seeking frontend / full-stack roles · Available immediately
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-bounce {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.2); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
