const PROJECTS = [
  {
    id: 'project-management',
    category: 'FRONTEND • PRODUCTIVITY',
    emoji: '📋',
    title: 'Project Management System',
    description:
      'A full-featured task and project management frontend with responsive layout, intuitive drag-and-drop UX flows, real-time status tracking, and polished interactive UI components. Inspired by Trello/Linear design patterns.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'HTML5'],
    github: 'https://github.com/vijaygondhale23',
    live: '#',
  },
  {
    id: 'student-record-system',
    category: 'FULL STACK • EDUCATION',
    emoji: '🎓',
    title: 'Student Record System',
    description:
      'Full-stack CRUD application enabling complete student record administration with a responsive dashboard, real-time search, filtering, and pagination. Built on MERN stack with RESTful API design.',
    tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/vijaygondhale23',
    live: '#',
  },
];

export default function Projects() {
  return (
    <div>
      <span className="code-comment">// projects.js — things I've built</span>
      <h2 className="section-heading">
        Featured <span className="hl-pink">Projects</span>
      </h2>
      <p className="section-subheading">// A selection of my work</p>

      <div className="projects-grid">
        {PROJECTS.map((project, i) => (
          <div key={project.id} className={`proj-card fade-up-${i + 1}`}>
            {/* Category & links row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div className="proj-category">{project.emoji} {project.category}</div>
              <div className="proj-links">
                {project.live && project.live !== '#' && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="proj-link"
                  >
                    Live ↗
                  </a>
                )}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="proj-link"
                >
                  GitHub ↗
                </a>
              </div>
            </div>

            {/* Title */}
            <h3 className="proj-title">{project.title}</h3>

            {/* Description */}
            <p className="proj-desc">{project.description}</p>

            {/* Tech tags */}
            <div className="proj-tags">
              {project.tech.map(t => (
                <span key={t} className="proj-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* More on GitHub */}
      <div style={{ textAlign: 'center', marginTop: 40 }} className="fade-up-3">
        <a
          href="https://github.com/vijaygondhale23"
          target="_blank"
          rel="noreferrer"
          className="vsc-btn vsc-btn-outline"
          style={{ display: 'inline-flex' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
          More on GitHub
        </a>
      </div>
    </div>
  );
}
