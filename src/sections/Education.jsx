const EDUCATION = [
  {
    id: 'bsc-cs',
    emoji: '🎓',
    degree: 'B.Sc. in Computer Science',
    institution: 'Ram-Niranjan Jhunjhunwala College',
    university: 'University of Mumbai',
    duration: '07/2021 – 07/2024',
    score: '8.05 CGPA',
    type: 'Degree',
  },
  {
    id: 'hsc',
    emoji: '📚',
    degree: '12th Board (HSC)',
    institution: 'B.N.N College, Bhiwandi',
    university: 'Maharashtra State Board',
    duration: '05/2020 – 05/2021',
    score: '81.33%',
    type: 'Board',
  },
];

const CERTIFICATIONS = [
  {
    id: 'udemy-python',
    emoji: '🐍',
    title: '100 Days of Code: Python Bootcamp',
    issuer: 'Udemy',
    instructor: 'Dr. Angela Yu',
    year: '2024',
    link: '#',
  },
];

export default function Education() {
  return (
    <div>
      <span className="code-comment">// education.md — academic background</span>
      <h2 className="section-heading">
        Education & <span className="hl-green">Credentials</span>
      </h2>
      <p className="section-subheading">// Academic journey & certifications</p>

      {/* Education cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 40 }}>
        {EDUCATION.map((edu, i) => (
          <div key={edu.id} className={`edu-card fade-up-${i + 1}`}>
            <div className="edu-card-header">
              <span style={{ fontSize: 28 }}>{edu.emoji}</span>
              <span style={{
                padding: '2px 10px', borderRadius: 3,
                fontSize: 10, fontFamily: 'JetBrains Mono, monospace',
                background: 'rgba(156,220,254,0.08)', border: '1px solid rgba(156,220,254,0.2)',
                color: 'var(--syn-cyan)',
              }}>
                {edu.type}
              </span>
            </div>
            <div className="edu-name" style={{ marginTop: 12 }}>{edu.institution}</div>
            <div className="edu-inst">{edu.university}</div>
            <div className="edu-degree" style={{ marginTop: 6 }}>{edu.degree}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>
              <span style={{ color: 'var(--syn-faded)' }}>📅 {edu.duration}</span>
              <span className="edu-score">CGPA/Score: {edu.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="fade-up-3">
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
        }}>
          <span style={{ color: 'var(--syn-yellow)', fontSize: 16 }}>🏆</span>
          <span style={{ fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--syn-faded)', fontFamily: 'JetBrains Mono, monospace' }}>
            Certifications
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-dim)' }} />
        </div>

        {CERTIFICATIONS.map(cert => (
          <a
            key={cert.id}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="cert-row"
            style={{ display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none' }}
          >
            <span style={{ fontSize: 28 }}>{cert.emoji}</span>
            <div style={{ flex: 1 }}>
              <div className="cert-title">{cert.title}</div>
              <div className="cert-sub">{cert.issuer} · {cert.instructor} · {cert.year}</div>
            </div>
            <span style={{ color: 'var(--syn-cyan)', fontSize: 16 }}>↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}
