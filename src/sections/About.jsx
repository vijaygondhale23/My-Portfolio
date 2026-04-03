export default function About() {
  return (
    <div>
      {/* Section heading */}
      <span className="code-comment">// about.html — who I am</span>
      <h2 className="section-heading">
        Hi! I'm <span className="hl-cyan">Vijay Gondhale</span>
      </h2>
      <p className="section-subheading">Frontend Developer · Thane, Maharashtra, India</p>

      {/* Bio paragraph */}
      <p className="about-body fade-up">
        I'm a <strong>Frontend Developer</strong> living at the crossroads of{' '}
        <strong>React.js</strong>, <strong>modern UI design</strong>, and{' '}
        <strong>backend engineering</strong>. I build systems that are not just functional
        but genuinely <span className="hl-white">beautiful and scalable</span>.
      </p>
      <p className="about-body fade-up-1" style={{ marginTop: 16 }}>
        Currently a former <strong>Automation Test Engineer at Wipro Ltd</strong>,
        working in the Cisco SRTS Team where I built automated test scripts and CI/CD
        pipelines for Cisco's networking firmware.
      </p>

      {/* Current Focus */}
      <div style={{ marginTop: 32 }} className="fade-up-2">
        <div style={{
          fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          color: 'var(--syn-green)', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace'
        }}>
          ◈ CURRENT FOCUS
        </div>
        <div className="focus-grid">
          {[
            { icon: '🎨', text: 'Building pixel-perfect, responsive UIs with React.js' },
            { icon: '🧠', text: 'Deep interest in frontend architecture & performance' },
            { icon: '⚡', text: 'Exploring Next.js, Node.js & REST API development' },
            { icon: '💬', text: 'Talk to me about React, CSS, JavaScript, UI/UX' },
            { icon: '🔧', text: 'Making complex UIs simple and accessible' },
            { icon: '🚀', text: 'Always learning, always shipping' },
          ].map((item, i) => (
            <div key={i} className="focus-item">
              <span className="focus-icon">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginTop: 40 }} className="fade-up-3">
        <div style={{
          fontSize: 11, letterSpacing: 2, textTransform: 'uppercase',
          color: 'var(--syn-green)', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace'
        }}>
          ◈ EDUCATION
        </div>

        <div className="edu-card">
          <div className="edu-card-header">
            <div>
              <div className="edu-name">🎓 Ram-Niranjan Jhunjhunwala College</div>
              <div className="edu-inst">University of Mumbai</div>
            </div>
            <div className="edu-year">2021 – 2024</div>
          </div>
          <div className="edu-degree">B.Sc. in Computer Science</div>
          <div className="edu-score">CGPA: 8.05</div>
        </div>

        <div className="edu-card">
          <div className="edu-card-header">
            <div>
              <div className="edu-name">📚 B.N.N College, Bhiwandi</div>
              <div className="edu-inst">Maharashtra State Board</div>
            </div>
            <div className="edu-year">2020 – 2021</div>
          </div>
          <div className="edu-degree">12th Board (HSC)</div>
          <div className="edu-score">81.33%</div>
        </div>
      </div>

      {/* Social links */}
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }} className="fade-up-4">
        {[
          { href: 'https://linkedin.com/in/vgondhale23',  label: '⊕ LinkedIn',  color: 'var(--syn-cyan)' },
          { href: 'https://github.com/vijaygondhale23',   label: '⊕ GitHub',    color: 'var(--syn-white)' },
          { href: 'mailto:vgondhale23@gmail.com',         label: '⊕ Email',     color: 'var(--syn-green)' },
        ].map(({ href, label, color }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 18px', borderRadius: 4,
              border: '1px solid var(--border-mid)',
              color, fontSize: 12, textDecoration: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--hover-bg)'; e.currentTarget.style.borderColor = 'var(--border-hi)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-mid)'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
