import { useEffect, useState } from 'react';

const TYPING_PHRASES = [
  'Frontend Developer',
  'React.js Enthusiast',
  'UI/UX Craftsman',
  'Full-Stack Builder',
];

function useTyping(phrases, speed = 80, pause = 1800) {
  const [text, setText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    let delay = deleting ? speed / 2 : speed;

    if (!deleting && charIdx === current.length) {
      delay = pause;
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setText(current.slice(0, charIdx + 1));
        setCharIdx(i => i + 1);
      } else if (!deleting && charIdx === current.length) {
        setDeleting(true);
      } else if (deleting) {
        setText(current.slice(0, charIdx - 1));
        setCharIdx(i => i - 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [charIdx, deleting, phraseIdx, phrases, speed, pause]);

  return text;
}

export default function Hero({ onNavigate }) {
  const typedText = useTyping(TYPING_PHRASES);

  return (
    <div>
      {/* Greeting comment */}
      <p className="hero-comment fade-up">// hello world !! Welcome to my portfolio</p>

      {/* Name */}
      <div className="fade-up-1">
        <span className="hero-name-first">Vijay</span>
        <span className="hero-name-last">Gondhale</span>
      </div>

      {/* Role tags */}
      <div className="hero-role-tags fade-up-2">
        <span className="role-tag role-tag-green">
          <span className="role-tag-dot" style={{ background: '#4ec9b0' }} />
          Frontend Developer
        </span>
        <span className="role-tag role-tag-cyan">
          <span className="role-tag-dot" style={{ background: '#9cdcfe' }} />
          React.js
        </span>
        <span className="role-tag role-tag-pink">
          <span className="role-tag-dot" style={{ background: '#f92aad' }} />
          @ Wipro Ltd
        </span>
      </div>

      {/* Typing animation */}
      <p className="hero-typing-line fade-up-3">
        {typedText}<span className="cursor" />
      </p>

      {/* Description */}
      <p className="hero-desc fade-up-4">
        I live at the crossroads of{' '}
        <span className="hl-cyan">frontend engineering</span>,{' '}
        <span className="hl-cyan">React.js</span>, and{' '}
        <span className="hl-cyan">modern UI design</span>. I build web applications
        that are genuinely{' '}
        <span className="hl-bold">fast, accessible</span> and{' '}
        <span className="hl-bold">visually compelling</span>.
      </p>

      {/* CTA Buttons */}
      <div className="hero-btns fade-up-5">
        <button className="vsc-btn vsc-btn-fill" data-navigate="projects">
          📁 Projects
        </button>
        <button className="vsc-btn vsc-btn-outline" data-navigate="about">
          👤 About Me
        </button>
        <button className="vsc-btn vsc-btn-ghost" data-navigate="contact">
          ✉ Contact
        </button>
      </div>

      {/* Stats row */}
      <div className="hero-stats fade-up-6">
        <div className="hero-stat">
          <div className="hero-stat-num">1+</div>
          <div className="hero-stat-label">YEARS</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">3+</div>
          <div className="hero-stat-label">PROJECTS</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">∞</div>
          <div className="hero-stat-label">CURIOSITY</div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-num">↑</div>
          <div className="hero-stat-label">ALWAYS LEARNING</div>
        </div>
      </div>

      {/* Social Links Row */}
      <div className="hero-socials fade-up-7">
        <a href="https://github.com/vijaygondhale23" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.45-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.07.63-1.32-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg> 
          GitHub
        </a>
        <a href="https://linkedin.com/in/vijay-gondhale" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="7" cy="12" r="7"/><circle cx="18" cy="12" r="3"/><circle cx="23" cy="12" r="1"/></svg>
          Medium
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#E97627"><path d="M12.92 10.15h-1.84V8.34h-1.9v1.81H7.37v1.87h1.81v1.85h1.9v-1.85h1.84zM24 10.99h-3.32V7.7h-1.92v3.29h-3.32v1.87h3.32v3.32h1.92v-3.32H24zM8.34 2.82h-.99V1.85H6.4v.97H5.43v.97h.97v.99h.95v-.99h.99zM8.34 20h-.99v-.97H6.4v.97H5.43v.99h.97v1.16h.95V21h.99zM2.84 10.59H1.87V9.62H.9v.97H0v1.01h.9v.95h.97v-.95h.97zM20.25 3.32h-1.42V1.9h-1.39v1.42h-1.45v1.39h1.45v1.45h1.39V4.71h1.42zM20.25 18.25h-1.42v-1.42h-1.39v1.42h-1.45v1.42h1.45v1.42h1.39v-1.42h1.42zM15.42 16.7h-1.87v-1.87h-1.9v1.87H9.8v1.9h1.85v1.87h1.9V18.6h1.87zM15.42 6.3V4.4h-1.87V2.55h-1.9V4.4H9.8v1.9h1.85v1.84h1.9V6.3z"/></svg>
          Tableau
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFA116"><path d="M13.48 10.46l-4.76 4.75a.53.53 0 0 0 0 .76l1.24 1.25a.53.53 0 0 0 .76 0l4.75-4.75a.53.53 0 0 0 0-.76l-1.23-1.25a.53.53 0 0 0-.76 0zm-2.06 6.38a1.26 1.26 0 0 1-1.78 0l-3.21-3.21a1.26 1.26 0 0 1 0-1.78l3.21-3.21a1.26 1.26 0 0 1 1.78 0l.4.4-4.88 4.88c-.62.62.24 1.5 1.5 1.48h8.86v1.44z"/></svg>
          LeetCode
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#E4405F"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          Instagram
        </a>
        <a href="mailto:vijaygondhale23@example.com" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"/></svg>
          Email
        </a>
        <a href="#" target="_blank" rel="noreferrer" className="vsc-social-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2c-.2-1.1-1.1-2-2.2-2.2C19.3 3.6 12 3.6 12 3.6s-7.3 0-9.3.4C1.6 4.3.7 5.2.5 6.2 0 8.2 0 12 0 12s0 3.8.5 5.8c.2 1.1 1.1 2 2.2 2.2 2 .4 9.3.4 9.3.4s7.3 0 9.3-.4c1.1-.2 2-1.1 2.2-2.2.5-2 .5-5.8.5-5.8s0-3.8-.5-5.8zM9.5 15.5v-7l6.5 3.5-6.5 3.5z"/></svg>
          Youtube
        </a>
      </div>
    </div>
  );
}
