import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',       href: '#home',       num: '01' },
  { label: 'About',      href: '#about',      num: '02' },
  { label: 'Skills',     href: '#skills',     num: '03' },
  { label: 'Experience', href: '#experience', num: '04' },
  { label: 'Projects',   href: '#projects',   num: '05' },
  { label: 'Education',  href: '#education',  num: '06' },
  { label: 'Contact',    href: '#contact',    num: '07' },
];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [active, setActive]     = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = 'home';
      for (const { href } of NAV_LINKS) {
        const id = href.slice(1);
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (href) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ─────────────── Top Navbar ─────────────── */}
      <nav
        id="navbar"
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 1000,
          transition: 'all 0.3s ease',
          padding: scrolled ? '10px 0' : '18px 0',
          background: scrolled ? 'rgba(13,13,13,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.06)'
            : '1px solid transparent',
        }}
      >
        <div
          className="container-max"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleNav('#home'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              textDecoration: 'none', color: '#fff',
              fontWeight: 700, fontSize: '19px', flexShrink: 0,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 20px rgba(61,107,86,0.5)',
            }}>
              <Code2 size={18} color="#fff" />
            </div>
            <span>VG</span>
          </a>

          {/* Desktop nav links — hidden below lg (1024px) */}
          <ul
            className="hidden lg:flex"
            style={{
              alignItems: 'center',
              gap: '2px', listStyle: 'none',
              flex: 1, justifyContent: 'center',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.slice(1);
              const isActive = active === id;
              return (
                <li key={id}>
                  <a
                    href={href}
                    onClick={(e) => { e.preventDefault(); handleNav(href); }}
                    style={{
                      display: 'block',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '15.5px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#fff' : 'var(--text-sec)',
                      background: isActive ? 'rgba(61,107,86,0.2)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: isActive
                        ? '1px solid rgba(61,107,86,0.4)'
                        : '1px solid transparent',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-sec)'; }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hire Me CTA — desktop only */}
          <div className="hidden lg:flex">
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '15px', flexShrink: 0 }}
            >
              Hire Me ↗
            </a>
          </div>

          {/* Hamburger — mobile/tablet only (hidden on lg+) */}
          <button
            id="hamburger-btn"
            onClick={() => setIsOpen(true)}
            className="flex lg:hidden"
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: '#fff',
              padding: '8px',
              alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            aria-label="Open menu"
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(61,107,86,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* ─────────────── Slide-in Left Drawer ─────────────── */}

      {/* Backdrop overlay — fades in */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 1100,
          background: 'rgba(0,0,0,0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer panel — slides in from the left */}
      <div
        id="mobile-menu"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '300px',
          maxWidth: '85vw',
          zIndex: 1200,
          background: 'rgba(13,16,14,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 0',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? '-8px 0 40px rgba(0,0,0,0.5)' : 'none',
          overflowY: 'auto',
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px 28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: '8px',
        }}>
          {/* Logo inside drawer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 16px rgba(61,107,86,0.5)',
            }}>
              <Code2 size={15} color="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#fff' }}>
              Vijay Gondhale
            </span>
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--text-sec)',
              padding: '7px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            aria-label="Close menu"
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,80,80,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,80,80,0.3)';
              e.currentTarget.style.color = '#fc8181';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.color = 'var(--text-sec)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav label */}
        <p style={{
          padding: '0 24px 12px',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px', letterSpacing: '3px',
          color: 'var(--text-sec)', textTransform: 'uppercase',
        }}>
          Navigation
        </p>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 12px' }}>
          {NAV_LINKS.map(({ label, href, num }, i) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNav(href); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(61,107,86,0.15)' : 'transparent',
                  border: isActive ? '1px solid rgba(61,107,86,0.3)' : '1px solid transparent',
                  transition: 'all 0.22s ease',
                  // Staggered slide-in animation
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${i * 0.05 + 0.1}s` : '0s',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                  }
                }}
              >
                {/* Number badge */}
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: isActive ? 'var(--accent-lt)' : 'rgba(154,175,166,0.4)',
                  flexShrink: 0,
                  width: '22px',
                }}>
                  {num}
                </span>

                {/* Label */}
                <span style={{
                  fontSize: '17px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? '#fff' : 'var(--text-sec)',
                  flex: 1,
                }}>
                  {label}
                </span>


              </a>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'auto', padding: '28px 24px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', fontSize: '15px' }}
          >
            Hire Me ↗
          </a>
          <p style={{
            textAlign: 'center', marginTop: '16px',
            fontSize: '12px', color: 'var(--text-sec)',
            fontFamily: 'JetBrains Mono, monospace',
          }}>
            vgondhale23@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
