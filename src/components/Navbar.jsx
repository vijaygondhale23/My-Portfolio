import { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { useTheme } from '../ThemeContext';

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
  const { theme, toggleTheme }  = useTheme();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

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
          background: scrolled ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid var(--border)'
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
              textDecoration: 'none', color: 'var(--text-pri)',
              fontWeight: 700, fontSize: '19px', flexShrink: 0,
            }}
          >
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'var(--btn-fill-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Code2 size={18} color="var(--btn-fill-color)" />
            </div>
            <span>VG</span>
          </a>

          {/* Desktop nav links — hidden on mobile */}
          <ul
            className="nav-desktop-links"
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
                      color: isActive ? 'var(--text-pri)' : 'var(--text-sec)',
                      background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                      border: isActive
                        ? '1px solid var(--nav-active-border)'
                        : '1px solid transparent',
                      letterSpacing: '0.01em',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-pri)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = 'var(--text-sec)'; }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop right side: theme toggle + CTA — hidden on mobile */}
          <div className="nav-desktop-right" style={{ alignItems: 'center', gap: '10px' }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              id="theme-toggle-desktop"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNav('#contact'); }}
              className="btn-primary"
              style={{ padding: '10px 24px', fontSize: '15px', flexShrink: 0 }}
            >
              Hire Me ↗
            </a>
          </div>

          {/* Mobile: theme toggle + hamburger — hidden on desktop */}
          <div className="nav-mobile-right" style={{ alignItems: 'center', gap: '8px' }}>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
              id="theme-toggle-mobile"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              id="hamburger-btn"
              onClick={() => setIsOpen(true)}
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'var(--text-pri)',
                padding: '8px',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s',
              }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </nav>

      {/* ─────────────── Slide-in Right Drawer ─────────────── */}

      {/* Backdrop */}
      <div
        onClick={() => setIsOpen(false)}
        style={{
          position: 'fixed', inset: 0,
          zIndex: 1100,
          background: 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.35s ease',
        }}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        id="mobile-menu"
        style={{
          position: 'fixed',
          top: 0, right: 0, bottom: 0,
          width: '300px',
          maxWidth: '85vw',
          zIndex: 1200,
          background: 'var(--drawer-bg)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderLeft: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 0',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.38s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isOpen ? '-8px 0 40px rgba(0,0,0,0.2)' : 'none',
          overflowY: 'auto',
        }}
      >
        {/* Drawer header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px 28px',
          borderBottom: '1px solid var(--border)',
          marginBottom: '8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--btn-fill-bg)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Code2 size={15} color="var(--btn-fill-color)" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '16px', color: 'var(--text-pri)' }}>
              Vijay Gondhale
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              color: 'var(--text-sec)',
              padding: '7px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            aria-label="Close menu"
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
                  background: isActive ? 'var(--nav-active-bg)' : 'transparent',
                  border: isActive ? '1px solid var(--nav-active-border)' : '1px solid transparent',
                  transition: 'all 0.22s ease',
                  transform: isOpen ? 'translateX(0)' : 'translateX(20px)',
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: isOpen ? `${i * 0.05 + 0.1}s` : '0s',
                }}
              >
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  color: isActive ? 'var(--text-pri)' : 'var(--text-sec)',
                  flexShrink: 0,
                  width: '22px',
                }}>
                  {num}
                </span>
                <span style={{
                  fontSize: '17px',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'var(--text-pri)' : 'var(--text-sec)',
                  flex: 1,
                }}>
                  {label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div style={{ marginTop: 'auto', padding: '28px 24px 0', borderTop: '1px solid var(--border)' }}>
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

      {/* ─── Responsive CSS ─── */}
      <style>{`
        /* Desktop: show nav links + right side, hide mobile hamburger */
        .nav-desktop-links {
          display: flex;
        }
        .nav-desktop-right {
          display: flex;
        }
        .nav-mobile-right {
          display: none;
        }

        /* Mobile/Tablet: hide desktop nav, show hamburger */
        @media (max-width: 1024px) {
          .nav-desktop-links {
            display: none !important;
          }
          .nav-desktop-right {
            display: none !important;
          }
          .nav-mobile-right {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
