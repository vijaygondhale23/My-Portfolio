import { useEffect, useRef } from 'react';
import { THEMES, useTheme } from '../ThemeContext';

export default function SettingsPanel({
  isOpen,
  onClose,
  onOpenPalette,
  onToggleTerminal,
  onOpenCopilot,
  onToggleFullscreen,
}) {
  const { themeId, setThemeId } = useTheme();
  const panelRef = useRef(null);

  /* Close on Esc */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  /* Close on click outside */
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };
    // Delay to avoid the triggering click
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [isOpen, onClose]);

  const quickActions = [
    { label: 'Command Palette', shortcut: 'Ctrl+P', icon: '⌘', action: () => { onOpenPalette(); onClose(); } },
    { label: 'Toggle Terminal', shortcut: 'Ctrl+`', icon: '⬧', action: () => { onToggleTerminal(); onClose(); } },
    { label: 'Copilot Chat', icon: '✦', action: () => { onOpenCopilot(); onClose(); } },
    { label: 'Download Resume', icon: '📄', action: () => { window.open('https://drive.google.com/file/d/1xWMRuORDtz4Ud8zE-5SP3dUmPb7L4ZSc/view?usp=sharing', '_blank'); onClose(); } },
    { label: 'Toggle Fullscreen', shortcut: 'F11', icon: '⛶', action: () => { toggleFullscreen(); onClose(); } },
  ];

  const shortcuts = [
    { keys: 'Ctrl P', desc: 'Go to file (command palette)' },
    { keys: 'Ctrl `', desc: 'Toggle terminal' },
    { keys: 'Ctrl B', desc: 'Toggle sidebar' },
    { keys: 'Esc', desc: 'Close overlay' },
  ];

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div
      ref={panelRef}
      className={`settings-panel ${isOpen ? 'settings-panel--open' : ''}`}
    >
      {/* Header matching Explorer aesthetic */}
      <div className="vsc-sidebar-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '14px', borderBottom: '1px solid var(--border-dim)' }}>
        <span>SETTINGS</span>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <svg 
            className="vsc-sidebar-action glow-active"
            onClick={onClose}
            title="Toggle Settings"
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          <svg 
            className="vsc-sidebar-action"
            onClick={onClose} 
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ cursor: 'pointer' }}
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="settings-body">
        {/* ── COLOR THEME ── */}
        <div className="settings-section">
          <div className="settings-section-label">
            <span className="settings-section-icon">🎨</span>
            COLOR THEME
          </div>
          <div className="settings-theme-list">
            {THEMES.map((theme) => (
              <button
                key={theme.id}
                className={`settings-theme-item ${themeId === theme.id ? 'active' : ''}`}
                onClick={() => setThemeId(theme.id)}
              >
                <span
                  className="settings-theme-dot"
                  style={{ background: theme.color }}
                />
                <span className="settings-theme-name">{theme.label}</span>
                {themeId === theme.id && (
                  <span className="settings-theme-check">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── QUICK ACTIONS ── */}
        <div className="settings-section">
          <div className="settings-section-label">
            <span className="settings-section-icon">⚡</span>
            QUICK ACTIONS
          </div>
          <div className="settings-actions-list">
            {quickActions.map((action, i) => (
              <button
                key={i}
                className="settings-action-item"
                onClick={action.action}
              >
                <span className="settings-action-icon">{action.icon}</span>
                <span className="settings-action-label">{action.label}</span>
                {action.shortcut && (
                  <span className="settings-action-shortcut">{action.shortcut}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── KEYBOARD SHORTCUTS ── */}
        <div className="settings-section">
          <div className="settings-section-label">
            <span className="settings-section-icon">⌨️</span>
            KEYBOARD SHORTCUTS
          </div>
          <div className="settings-shortcuts-list">
            {shortcuts.map((s, i) => (
              <div key={i} className="settings-shortcut-row">
                <div className="settings-shortcut-keys">
                  {s.keys.split(' ').map((key, ki) => (
                    <kbd key={ki} className="settings-kbd">{key}</kbd>
                  ))}
                </div>
                <span className="settings-shortcut-desc">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
