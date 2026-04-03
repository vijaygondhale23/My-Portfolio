import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import VijaysCopilot from './VijaysCopilot';
import SettingsPanel from './SettingsPanel';
import { THEMES, useTheme } from '../ThemeContext';

/* ── File definitions matching VS Code sidebar ── */
const FILES = [
  { id: 'home',       label: 'home.jsx',        ext: 'jsx',  color: '#61dafb',  breadcrumb: ['vijay-portfolio', 'src', 'home.jsx'] },
  { id: 'about',      label: 'about.html',       ext: 'html', color: '#e34f26',  breadcrumb: ['vijay-portfolio', 'src', 'about.html'] },
  { id: 'skills',     label: 'skills.json',      ext: 'json', color: '#ffd700',  breadcrumb: ['vijay-portfolio', 'data', 'skills.json'] },
  { id: 'experience', label: 'experience.ts',    ext: 'ts',   color: '#007acc',  breadcrumb: ['vijay-portfolio', 'src', 'experience.ts'] },
  { id: 'projects',   label: 'projects.js',      ext: 'js',   color: '#f7df1e',  breadcrumb: ['vijay-portfolio', 'src', 'projects.js'] },
  { id: 'education',  label: 'education.md',     ext: 'md',   color: '#24a0ed',  breadcrumb: ['vijay-portfolio', 'docs', 'education.md'] },
  { id: 'contact',    label: 'contact.css',      ext: 'css',  color: '#264de4',  breadcrumb: ['vijay-portfolio', 'src', 'contact.css'] },
];

const STATUS_LANG = {
  home: 'JSX', about: 'HTML', skills: 'JSON',
  experience: 'TypeScript', projects: 'JavaScript',
  education: 'Markdown', contact: 'CSS',
};

const FILE_PATH_LABEL = {
  home: 'src/', about: 'src/', skills: 'data/',
  experience: 'src/', projects: 'src/',
  education: 'docs/', contact: 'src/',
};

function FileIcon({ ext }) {
  const map = {
    jsx: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" width="14" height="14">
        <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
        <g stroke="#61dafb" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    ),
    html: (
      <svg viewBox="0 0 384 512" width="14" height="14" fill="#E34F26">
        <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.1l-97.9-27-6.2-69.7h48.2l3.5 32.5 52.4 14.2 52.4-14.2 4.4-49.4H80.4L67.1 73.9h245.3l-4.2 86z"/>
      </svg>
    ),
    json: (
      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#8B9C2A', color: '#1a1a1a', width: 14, height: 14, borderRadius: 2, fontSize: 9, fontWeight: 800 }}>{'{ }'}</span>
    ),
    ts: (
      <svg viewBox="0 0 448 512" width="14" height="14" fill="#3178C6">
        <path d="M0 32v448h448V32H0zm217 360.2h-40.3v-123H116v-34.9h161.4v34.9h-60.4v123zm120.4 2.8c-40 0-68.5-18-80.9-43.2l34.1-19c9 14.5 22.1 26 43 26 19 0 31.5-8.5 31.5-22 0-16.5-13.8-21.5-35.1-30.5l-10.5-4.5c-34.5-14.5-56-32.5-56-68.5 0-35 26.5-61.5 68-61.5 30.5 0 53 11 67.5 36l-33.1 19.5c-7.5-13.5-16.5-19.5-30.5-19.5-14.5 0-24 8.5-24 20 0 14 9.5 20 30.5 29l10 4.5c39.5 17 61.5 34.5 61.5 73.5 0 42-32.5 60.7-76 60.7z"/>
      </svg>
    ),
    js: (
      <svg viewBox="0 0 448 512" width="14" height="14" fill="#F7DF1E">
        <path d="M0 32v448h448V32H0zm243.8 349.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.4V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
      </svg>
    ),
    md: (
      <svg viewBox="0 0 16 16" width="14" height="14" fill="#24A0ED">
        <path d="M14.5 2h-13C.672 2 0 2.672 0 3.5v9C0 13.328.672 14 1.5 14h13c.828 0 1.5-.672 1.5-1.5v-9C16 2.672 15.328 2 14.5 2zm-8.892 9H4.159V7.1l-1.4 1.83-1.4-1.83V11H.064V5h1.282l1.414 1.95L4.174 5h1.434v6zM15 8h-2.148V5h-1.393v3H9.31l2.844 3L15 8z"/>
      </svg>
    ),
    css: (
      <svg viewBox="0 0 384 512" width="14" height="14" fill="#2965F1">
        <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.1l-97.9-27-6.2-69.7h48.2l3.5 32.5 52.4 14.2 52.4-14.2 4.4-49.4H80.4L67.1 73.9h245.3l-4.2 86z"/>
      </svg>
    ),
    pdf: (
      <svg viewBox="0 0 384 512" width="14" height="14" fill="#CB2027">
        <path d="M181.9 256.1c-5-16-4.9-46.9-2-46.9 8.4 0 7.6 36.9 2 46.9zm-1.7 47.2c-7.7 20.2-17.3 43.3-28.4 62.7 18.3-7 39-17.2 62.9-21.9-12.7-9.6-24.9-23.4-34.5-40.8zM86.1 428.1c0 .8 13.2-5.4 34.9-40.2-6.7 6.3-29.1 24.5-34.9 40.2zM261.6 288c21.8 14 47.9 16.4 47.9 26.6 0 1.2-1.6 3.6-7.8 3.5-12.5-.2-33-14-53.1-40.6 4.9.4 9.1.5 13 .5zm122.4 179.9v-311L272.9 45h-241C14.3 45 0 59.3 0 77.1v365.9c0 17.8 14.3 32 32 32h320c17.7 0 32-14.3 32-32zM337 289.4c0 30-22.3 33.7-36 33.7-22 0-48.4-19.4-76.4-33.1-24.3 5.4-50.6 15-74.9 26-19 33.4-44.5 61.1-60.6 61.1-13.6 0-24-11.2-24-24 0-14.4 20-29.1 53-53 10.7-18.7 20-39.7 26.6-61.1-22.2-50.9-24-91-12.3-101.4 12.3-10.9 33.1 3.5 35.8 40.6 2.6 35.6-1.5 54.3-1.5 54.3 12.4 27.5 28.5 53 43 71.9 25.1-4.7 49-6.3 64.9-6.3 6.9 0 13.8.4 20 1 23.3-15.6 38.6-21.9 45-21.9 9.9 0 14.3 6.5 14.3 15z"/>
      </svg>
    )
  };
  return <span className="vsc-file-icon" style={{ display: 'flex', alignItems: 'center' }}>{map[ext] || '📄'}</span>;
}

/* ─── Menu Bar Item ─── */
function MenuBarItem({ label, items, isOpen, onOpen, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onClose]);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        className={`menubar-item ${isOpen ? 'active' : ''}`}
        onClick={() => isOpen ? onClose() : onOpen()}
      >
        {label}
      </button>
      {isOpen && (
        <div className="menubar-dropdown">
          {items.map((item, i) =>
            item === '---'
              ? <div key={i} className="menubar-separator" />
              : (
                <button
                  key={i}
                  className="menubar-dropdown-item"
                  onClick={() => { item.action?.(); onClose(); }}
                  disabled={item.disabled}
                >
                  <span>{item.label}</span>
                  {item.shortcut && <span className="menubar-shortcut">{item.shortcut}</span>}
                </button>
              )
          )}
        </div>
      )}
    </div>
  );
}

/* ─── Command Palette ─── */
function CommandPalette({ isOpen, onClose, onNavigate, onOpenCopilot }) {
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);

  const COMMANDS = [
    { label: "Open Vijay's Copilot", shortcut: 'Ctrl+Shift+C', action: onOpenCopilot, icon: '✦', iconColor: '#c586c0' },
  ];

  const filteredFiles = FILES.filter(f =>
    !query || f.label.toLowerCase().includes(query.toLowerCase())
  );

  const allItems = query
    ? filteredFiles.map(f => ({ type: 'file', ...f }))
    : [
        ...COMMANDS.map(c => ({ type: 'command', ...c })),
        ...FILES.map(f => ({ type: 'file', ...f })),
      ];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => { setSelectedIdx(0); }, [query]);

  const handleKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, allItems.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') {
      const item = allItems[selectedIdx];
      if (item?.type === 'file') { onNavigate(item.id); onClose(); }
      if (item?.type === 'command' && item.action) { item.action(); onClose(); }
    }
    if (e.key === 'Escape') onClose();
  };

  if (!isOpen) return null;

  const showCommandsSection = !query && COMMANDS.length > 0;
  const showFilesSection = filteredFiles.length > 0;

  let itemIdx = -1;

  return (
    <div className="cmdpal-overlay" onClick={onClose}>
      <div className="cmdpal-modal" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="cmdpal-input-row">
          <span className="cmdpal-arrow">›</span>
          <input
            ref={inputRef}
            className="cmdpal-input"
            placeholder="Go to file or run command..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
          />
          <span className="cmdpal-esc-badge">Esc</span>
        </div>

        {/* Results */}
        <div className="cmdpal-results">
          {showCommandsSection && (
            <>
              <div className="cmdpal-section-label">COMMANDS</div>
              {COMMANDS.map((cmd, i) => {
                itemIdx++;
                const idx = itemIdx;
                return (
                  <button
                    key={i}
                    className={`cmdpal-item ${selectedIdx === idx ? 'selected' : ''}`}
                    onClick={() => { cmd.action?.(); onClose(); }}
                    onMouseEnter={() => setSelectedIdx(idx)}
                  >
                    <span style={{ color: cmd.iconColor, marginRight: 8, fontSize: 14 }}>{cmd.icon}</span>
                    <span style={{ flex: 1 }}>{cmd.label}</span>
                    {cmd.shortcut && <span className="cmdpal-item-shortcut">{cmd.shortcut}</span>}
                  </button>
                );
              })}
            </>
          )}

          {showFilesSection && (
            <>
              <div className="cmdpal-section-label">{query ? 'RESULTS' : 'FILES'}</div>
              {filteredFiles.map((file, i) => {
                itemIdx++;
                const idx = itemIdx;
                return (
                  <button
                    key={file.id}
                    className={`cmdpal-item ${selectedIdx === idx ? 'selected' : ''}`}
                    onClick={() => { onNavigate(file.id); onClose(); }}
                    onMouseEnter={() => setSelectedIdx(idx)}
                  >
                    <span style={{ marginRight: 10, minWidth: 24, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <FileIcon ext={file.ext} />
                    </span>
                    <span style={{ flex: 1 }}>{file.label}</span>
                    <span style={{ color: 'var(--syn-faded)', fontSize: 11 }}>{FILE_PATH_LABEL[file.id]}</span>
                  </button>
                );
              })}

              {!filteredFiles.length && (
                <div style={{ padding: '24px', textAlign: 'center', color: 'var(--syn-faded)', fontSize: 12 }}>
                  No files matching "{query}"
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer hint */}
        <div className="cmdpal-footer">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
          <span style={{ marginLeft: 'auto', color: 'var(--syn-faded)' }}>
            Tip: press <kbd>Ctrl+P</kbd> to open this palette
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Interactive Terminal Panel ─── */
const TerminalPanel = forwardRef(({ isOpen, onClose, onNavigate, files }, ref) => {
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome! Type 'help' to see available commands." }
  ]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const inputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, history]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) {
      setHistory(prev => [...prev, { type: 'input', text: '', dir: cwd }]);
      return;
    }

    const args = trimmed.split(' ').filter(Boolean);
    const command = args[0].toLowerCase();
    
    let outputText = '';

    if (command === 'help') {
      outputText = `Available commands:
ls - list files in current directory
pwd - print working directory
cd <dir> - change directory (cd .. to go up)
cat <file> - view / open a file in the editor
open <file> - same as cat
clear - clear terminal output`;
    } else if (command === 'ls') {
      outputText = files.map(f => f.label).join('  ') + '  Vijay_Gondhale_resume.pdf';
    } else if (command === 'pwd') {
      outputText = `/home/vijay/projects/portfolio${cwd === '~' ? '' : cwd.replace('~', '')}`;
    } else if (command === 'clear') {
      setHistory([]);
      return;
    } else if (command === 'cd') {
      if (args[1] === '..') {
        setCwd('~');
      } else if (args[1]) {
        setCwd(`~/${args[1]}`);
      } else {
        setCwd('~');
      }
    } else if (command === 'cat' || command === 'open') {
      const target = args[1];
      if (!target) {
        outputText = `${command}: missing file operand`;
      } else {
        const file = files.find(f => f.label === target || f.id === target);
        if (file) {
          outputText = `Opening ${file.label}...`;
          onNavigate(file.id);
        } else if (target === 'Vijay_Gondhale_resume.pdf' || target === 'Resume.pdf') {
          outputText = `Opening Resume...`;
          window.open('https://drive.google.com/file/d/1xWMRuORDtz4Ud8zE-5SP3dUmPb7L4ZSc/view?usp=sharing', '_blank');
        } else {
          outputText = `${command}: ${target}: No such file or directory`;
        }
      }
    } else {
      outputText = `${command}: command not found`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: trimmed, dir: cwd },
      ...(outputText ? [{ type: 'output', text: outputText }] : [])
    ]);
  };

  useImperativeHandle(ref, () => ({
    runCommand: (cmd) => {
      handleCommand(cmd);
    }
  }));

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="vsc-terminal-panel">
      <div className="vsc-terminal-tabs">
        <span className="vsc-terminal-tab active">TERMINAL</span>
        <span className="vsc-terminal-tab">PROBLEMS</span>
        <span className="vsc-terminal-tab">OUTPUT</span>
        <button className="vsc-terminal-close" onClick={onClose}>×</button>
      </div>
      <div className="vsc-terminal-body" onClick={() => inputRef.current?.focus()} style={{ overflowY: 'auto' }}>
        {history.map((line, i) => (
          <div key={i} style={{ marginBottom: 4 }}>
            {line.type === 'input' ? (
              <div>
                <span style={{ color: '#4ec9b0' }}>vijay@portfolio</span>
                <span style={{ color: '#d4d4d4' }}>:</span>
                <span style={{ color: '#3b8eea' }}>{line.dir}</span>
                <span style={{ color: '#d4d4d4' }}>$ {line.text}</span>
              </div>
            ) : (
              <div style={{ color: line.text.includes('Available') ? '#4ec9b0' : '#d4d4d4', whiteSpace: 'pre-wrap', lineHeight: 1.4 }}>
                {line.text}
              </div>
            )}
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: '#4ec9b0' }}>vijay@portfolio</span>
          <span style={{ color: '#d4d4d4' }}>:</span>
          <span style={{ color: '#3b8eea' }}>{cwd}</span>
          <span style={{ color: '#d4d4d4', marginRight: 8, marginLeft: 2 }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              background: 'transparent', border: 'none', color: '#d4d4d4', 
              fontFamily: 'inherit', fontSize: 'inherit', outline: 'none', flex: 1
            }}
            spellCheck="false"
            autoComplete="off"
          />
        </div>
        <div ref={endRef} />
      </div>
    </div>
  );
});

/* ─── Main Layout ─── */
export default function VSCodeLayout({ children, activeSection, onNavigate }) {
  const [openTabs, setOpenTabs]         = useState(['home', 'about', 'projects', 'skills', 'experience']);
  const [clock, setClock]               = useState('');
  const [cmdPaletteOpen, setCmdPalette] = useState(false);
  const [sidebarView, setSidebarView]   = useState(window.innerWidth <= 900 ? null : 'explorer');
  const [terminalOpen, setTerminal]     = useState(false);
  const [openMenu, setOpenMenu]         = useState(null);
  const [copilotOpen, setCopilot]       = useState(false);
  const [settingsOpen, setSettings]     = useState(false);
  const terminalRef                     = useRef(null);

  const { themeId } = useTheme();
  const activeTheme = THEMES.find(t => t.id === themeId) || THEMES[0];

  const sidebarOpen = sidebarView !== null;

  const toggleView = (view) => {
    setSidebarView(prev => prev === view ? null : view);
  };

  const triggerTerminalHelp = () => {
    setTerminal(true);
    setTimeout(() => {
      terminalRef.current?.runCommand('help');
    }, 50);
  };

  /* Live clock */
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
    };
    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, []);

  /* Global Keyboard Shortcuts */
  useEffect(() => {
    const handler = (e) => {
      // Toggle Command Palette (Ctrl+P / Cmd+P)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        setCmdPalette(p => !p);
      }
      // Toggle Sidebar (Ctrl+B / Cmd+B)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        setSidebarView(prev => prev === 'explorer' ? null : 'explorer');
      }
      // Toggle Terminal (Ctrl+` / Cmd+` or Ctrl+J)
      if ((e.ctrlKey || e.metaKey) && (e.key === '`' || e.key.toLowerCase() === 'j')) {
        e.preventDefault();
        setTerminal(p => !p);
      }
      // Toggle Copilot (Ctrl+Shift+C / Cmd+Shift+C)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        setCopilot(p => !p);
      }
      // Toggle Settings (Ctrl+, or Ctrl+.)
      if ((e.ctrlKey || e.metaKey) && (e.key === ',' || e.key === '.')) {
        e.preventDefault();
        setSettings(p => !p);
      }
      
      if (e.key === 'Escape') { 
        setCmdPalette(false); 
        setOpenMenu(null); 
        setSettings(false); 
        setCopilot(false); 
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* Open tab on navigate */
  useEffect(() => {
    if (!openTabs.includes(activeSection)) {
      setOpenTabs(prev => [...prev, activeSection]);
    }
  }, [activeSection]);

  const activeFile = FILES.find(f => f.id === activeSection) || FILES[0];

  const closeTab = (e, id) => {
    e.stopPropagation();
    const next = openTabs.filter(t => t !== id);

    if (next.length === 0) {
      // Always fall back to home.jsx when the last tab is closed
      setOpenTabs(['home']);
      onNavigate('home');
    } else {
      setOpenTabs(next);
      if (activeSection === id) {
        // Navigate to the tab that was to the left (or the last remaining tab)
        const closedIdx = openTabs.indexOf(id);
        const fallback = next[Math.max(0, closedIdx - 1)];
        onNavigate(fallback);
      }
    }
  };

  /* Menu definitions */
  const menus = {
    File: [
      { label: 'New File', shortcut: 'Ctrl+N', disabled: true },
      { label: 'Open File...', shortcut: 'Ctrl+O', disabled: true },
      '---',
      { label: 'Save', shortcut: 'Ctrl+S', disabled: true },
      '---',
      { label: 'Close Tab', action: () => closeTab({ stopPropagation:()=>{} }, activeSection) },
    ],
    Edit: [
      { label: 'Undo', shortcut: 'Ctrl+Z', disabled: true },
      { label: 'Redo', shortcut: 'Ctrl+Y', disabled: true },
      '---',
      { label: 'Find', shortcut: 'Ctrl+F', disabled: true },
    ],
    View: [
      { label: 'Command Palette', shortcut: 'Ctrl+P', action: () => setCmdPalette(true) },
      '---',
      { label: sidebarOpen ? 'Hide Sidebar' : 'Show Sidebar', shortcut: 'Ctrl+B', action: () => toggleView('explorer') },
      { label: terminalOpen ? 'Hide Terminal' : 'Show Terminal', shortcut: 'Ctrl+`', action: () => setTerminal(p => !p) },
    ],
    Go: [
      { label: 'Go to File...', shortcut: 'Ctrl+P', action: () => setCmdPalette(true) },
      '---',
      ...FILES.map(f => ({ label: f.label, action: () => onNavigate(f.id) })),
    ],
    Terminal: [
      { label: 'New Terminal', action: () => setTerminal(true) },
      { label: 'Kill Terminal', action: () => setTerminal(false) },
    ],
    Help: [
      { label: 'Terminal Help', action: triggerTerminalHelp },
      '---',
      { label: 'About', action: () => window.open('https://github.com/vijaygondhale23', '_blank') },
      { label: 'GitHub ↗', action: () => window.open('https://github.com/vijaygondhale23', '_blank') },
    ],
  };

  return (
    <div className="vsc-shell">
      {/* ── Menu bar ── */}
      <div className={`vsc-menubar ${copilotOpen ? 'copilot-shifted' : ''}`}>
        <div className="vsc-traffic-lights">
          <span className="traffic-red"    />
          <span className="traffic-yellow" />
          <span className="traffic-green"  />
        </div>
        <div className="vsc-menubar-items">
          {Object.entries(menus).map(([label, items]) => (
            <MenuBarItem
              key={label}
              label={label}
              items={items}
              isOpen={openMenu === label}
              onOpen={() => setOpenMenu(label)}
              onClose={() => setOpenMenu(null)}
            />
          ))}
          <button
            className={`menubar-item ${copilotOpen ? 'active' : ''}`}
            onClick={() => setCopilot(p => !p)}
            style={{ display: 'inline-flex', alignItems: 'center', marginLeft: 2 }}
            title="Toggle Vijay's Copilot"
          >
            Copilot
          </button>
        </div>

        {/* Top command pill (Desktop) */}
        <div className="vsc-topbar-pill" onClick={() => setCmdPalette(true)}>
          <span style={{ color: '#569cd6' }}>⊙</span>
          <span>vijay-gondhale : portfolio</span>
          <span style={{ opacity: 0.5, fontSize: 10 }}>Ctrl+P</span>
        </div>

        {/* Mobile Top Bar */}
        <div className="vsc-mobile-topbar">
          <button className="vsc-mobile-hamburger" onClick={() => setSidebarView(p => p === 'explorer' ? null : 'explorer')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <div className="vsc-mobile-path">
            ~ / <span>{activeSection}</span>
          </div>
          <div className="vsc-mobile-actions">
            <button className="vsc-mobile-action-btn" onClick={() => setCopilot(p => !p)}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>✦</span>
            </button>
            <button className="vsc-mobile-action-btn" onClick={() => setCmdPalette(true)}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Right side spacer */}
        <div style={{ flex: 1 }} />
      </div>

      {/* ── Body row ── */}
      <div className={`vsc-body ${copilotOpen ? 'copilot-shifted' : ''}`}>
        {/* Activity bar */}
        <div className="vsc-activity-bar">
          <div
            className={`vsc-activity-icon ${sidebarView === 'explorer' ? 'active' : ''}`}
            title="Explorer (Ctrl+B)"
            onClick={() => toggleView('explorer')}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 3h8l2 2h8v14H3z"/>
            </svg>
          </div>
          <div
            className="vsc-activity-icon"
            title="Search Files (Ctrl+P)"
            onClick={() => setCmdPalette(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </div>
          <div
            className={`vsc-activity-icon ${sidebarView === 'source-control' ? 'active' : ''}`}
            title="Source Control (Git)"
            onClick={() => toggleView('source-control')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/>
              <path d="M6 9v6M9 6h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/>
            </svg>
          </div>
          <div className="vsc-activity-icon" title="Extensions">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/>
              <rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/>
            </svg>
          </div>
          {/* Copilot icon — opens chat panel */}
          <div
            className={`vsc-activity-icon ${copilotOpen ? 'vsc-activity-copilot-active' : ''}`}
            title="Open Vijay's Copilot"
            onClick={() => setCopilot(p => !p)}
            style={{ position: 'relative' }}
          >
            <span style={{
              fontSize: 18,
              color: copilotOpen ? '#c586c0' : 'var(--syn-faded)',
              lineHeight: 1,
              transition: 'color 0.2s',
            }}>✦</span>
            {copilotOpen && (
              <span style={{
                position: 'absolute',
                top: 8, left: 0,
                width: 2, height: 24,
                background: '#c586c0',
                borderRadius: '0 2px 2px 0',
              }} />
            )}
          </div>
          <div
            className="vsc-activity-icon"
            title="Toggle Terminal"
            onClick={() => setTerminal(p => !p)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M7 9l3 3-3 3M13 15h4"/>
            </svg>
          </div>
          <div className="vsc-activity-spacer" />
          <div
            className={`vsc-activity-icon ${settingsOpen ? 'active' : ''}`}
            title="Settings"
            onClick={() => setSettings(p => !p)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
          </div>
        </div>

        {/* Sidebar — switches between Explorer and Source Control */}
        <div className={`vsc-sidebar ${sidebarView === 'explorer' ? '' : 'vsc-sidebar--closed'}`}>
          <div className="vsc-sidebar-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '14px' }}>
            <span>EXPLORER</span>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <svg 
                className={`vsc-sidebar-action ${settingsOpen ? 'glow-active' : ''}`}
                onClick={() => {
                  setSettings(p => !p);
                }} 
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}
                title="Settings"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              <svg 
                className="vsc-sidebar-action"
                onClick={() => setSidebarView(null)} 
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ cursor: 'pointer' }}
                title="Close Sidebar"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
          </div>
          {FILES.map(file => (
            <div
              key={file.id}
              className={`vsc-file-item ${activeSection === file.id ? 'active' : ''}`}
              onClick={() => {
                onNavigate(file.id);
                if (window.innerWidth <= 900) setSidebarView(null);
              }}
            >
              <FileIcon ext={file.ext} />
              <span>{file.label}</span>
            </div>
          ))}
          <div className="vsc-file-item" style={{ marginTop: 8 }}
            onClick={() => {
              window.open('https://drive.google.com/file/d/1xWMRuORDtz4Ud8zE-5SP3dUmPb7L4ZSc/view?usp=sharing', '_blank');
              if (window.innerWidth <= 900) setSidebarView(null);
            }}>
            <FileIcon ext="pdf" />
            <span>Vijay_Gondhale_resume.pdf</span>
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column' }}>
            <div 
              style={{
                margin: '12px 14px',
                padding: '8px 12px',
                borderRadius: '6px',
                border: '1px solid rgba(197, 134, 192, 0.4)',
                background: 'rgba(197, 134, 192, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '12px',
                color: '#c586c0',
                transition: 'all 0.2s'
              }}
              onClick={() => setCopilot(p => !p)}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(197, 134, 192, 0.15)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(197, 134, 192, 0.05)' }}
            >
              <span style={{ fontSize: '15px', lineHeight: 1 }}>✦</span>
              <span>Vijay's Copilot</span>
              <span style={{ marginLeft: 'auto', fontSize: '10px', opacity: 0.6 }}>AI</span>
            </div>

            <div style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 14px', borderTop: '1px solid var(--border-dim)',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--syn-faded)'
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/>
                <path d="M6 9v6M9 6h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/>
              </svg>
              <span style={{ color: 'var(--syn-white)' }}>main</span>
              <span style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                <span style={{ color: '#4ec9b0' }}>↑1</span>
                <span style={{ color: '#ce9178' }}>↓3</span>
              </span>
            </div>
          </div>
        </div>

        <div className={`vsc-sidebar ${sidebarView === 'source-control' ? '' : 'vsc-sidebar--closed'}`}>
          <div className="vsc-sidebar-title">Source Control</div>

            {/* Branch + ahead info */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 14px', borderBottom: '1px solid var(--border-dim)',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--syn-faded)" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/>
                <path d="M6 9v6M9 6h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/>
              </svg>
              <span style={{ color: 'var(--syn-white)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace' }}>main</span>
              <span style={{
                marginLeft: 'auto', fontSize: 10, color: 'var(--syn-faded)',
                fontFamily: 'JetBrains Mono, monospace',
                display: 'flex', alignItems: 'center', gap: 4,
              }}>
                <span>↑</span> 1 commit ahead
              </span>
            </div>

            {/* Commit stats */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
              gap: 0, margin: '12px 14px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-dim)', borderRadius: 5, overflow: 'hidden',
            }}>
              {[
                { count: 3, label: 'Modified', color: '#f0c040' },
                { count: 1, label: 'Added',    color: '#4ec9b0' },
                { count: 0, label: 'Deleted',  color: '#f44747' },
              ].map(({ count, label, color }) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '14px 8px',
                  borderRight: label !== 'Deleted' ? '1px solid var(--border-dim)' : 'none',
                }}>
                  <div style={{ fontSize: 22, fontFamily: 'Outfit, sans-serif', fontWeight: 700, color }}>{count}</div>
                  <div style={{ fontSize: 10, color: 'var(--syn-faded)', fontFamily: 'JetBrains Mono, monospace', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>

            {/* Changed files list */}
            <div style={{ padding: '0 14px 8px' }}>
              <div style={{ fontSize: 10, letterSpacing: 2, color: 'var(--syn-faded)', marginBottom: 8, fontFamily: 'JetBrains Mono, monospace' }}>CHANGES</div>
              {[
                { file: 'VSCodeLayout.jsx', status: 'M', color: '#f0c040' },
                { file: 'index.css',        status: 'M', color: '#f0c040' },
                { file: 'Hero.jsx',         status: 'M', color: '#f0c040' },
                { file: 'About.jsx',        status: 'A', color: '#4ec9b0' },
              ].map(({ file, status, color }) => (
                <div key={file} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '4px 0', fontSize: 11.5, fontFamily: 'JetBrains Mono, monospace',
                }}>
                  <span style={{ color, fontWeight: 700, width: 12, textAlign: 'center', flexShrink: 0 }}>{status}</span>
                  <span style={{ color: 'var(--syn-white)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file}</span>
                </div>
              ))}
            </div>

            {/* View on GitHub */}
            <div style={{ padding: '8px 14px', marginTop: 4, borderTop: '1px solid var(--border-dim)' }}>
              <a
                href="https://github.com/vijaygondhale23/My-Portfolio"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 12, color: 'var(--syn-cyan)',
                  fontFamily: 'JetBrains Mono, monospace', textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.7'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                View on GitHub ↗
              </a>
            </div>

            <div className="vsc-sidebar-bottom">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="6" r="3"/>
                <path d="M6 9v6M9 6h5a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1"/>
              </svg>
              <span>↙ main</span>
            </div>
          </div>

        {/* Editor area */}
        <div className="vsc-editor-area">
          {/* Tab bar */}
          <div className="vsc-tab-bar">
            {openTabs.map(tabId => {
              const file = FILES.find(f => f.id === tabId);
              if (!file) return null;
              return (
                <div
                  key={tabId}
                  className={`vsc-tab ${activeSection === tabId ? 'active' : ''}`}
                  onClick={() => onNavigate(tabId)}
                >
                  <FileIcon ext={file.ext} />
                  <span>{file.label}</span>
                  <span className="vsc-tab-close" onClick={e => closeTab(e, tabId)}>×</span>
                </div>
              );
            })}
          </div>

          {/* Breadcrumb */}
          <div className="vsc-breadcrumb">
            {activeFile.breadcrumb.map((part, i) => (
              <span key={i}>
                {i > 0 && <span className="vsc-breadcrumb-sep"> › </span>}
                {i === activeFile.breadcrumb.length - 1
                  ? <span style={{ color: '#d4d4d4' }}>{part}</span>
                  : part
                }
              </span>
            ))}
          </div>

          {/* Content + Terminal */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="vsc-editor-content" id="main-editor">
              {children}
            </div>
            <TerminalPanel ref={terminalRef} isOpen={terminalOpen} onClose={() => setTerminal(false)} onNavigate={onNavigate} files={FILES} />
          </div>
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className={`vsc-statusbar ${copilotOpen ? 'copilot-shifted' : ''}`}>
        <div className="vsc-statusbar-left">
          <div className="vsc-statusbar-item">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.93 8.5a4 4 0 1 1-3.72-5.45c.205 0 .406.015.602.046L10.93 2l1.066 1.145L11 4.13l1 1-.96.94.96.94-.96.96L12 9l-1.07-1.07A3.978 3.978 0 0 1 11.93 8.5z"/>
            </svg>
            <span>↙ main</span>
          </div>
          <div className="vsc-statusbar-item"><span>⚠ 0</span></div>
          <div className="vsc-statusbar-item"><span>⊙ 0</span></div>
        </div>
        <div className="vsc-statusbar-right">
          <div className="vsc-statusbar-item"><span>{activeSection === 'home' ? 'Ln 1, Col 1' : 'Ln 1, Col 1'}</span></div>
          <div className="vsc-statusbar-item"><span>UTF-8</span></div>
          <div className="vsc-statusbar-item"><span>{STATUS_LANG[activeSection] || 'JSX'}</span></div>
          <div className="vsc-statusbar-item"><span>Prettier</span></div>
          <div className="vsc-statusbar-item pink" style={{ cursor: 'pointer' }} onClick={() => setCopilot(p => !p)} title="Open Vijay's Copilot">
            <span style={{ fontSize: 12, lineHeight: 1 }}>✦</span>
            <span>Vijay's Copilot</span>
          </div>
          <div className="vsc-statusbar-item" style={{ cursor: 'pointer' }} onClick={() => setSettings(p => !p)} title="Change Theme">
            <span style={{ fontSize: 10, color: activeTheme.color }}>●</span>
            <span>{activeTheme.label} ▸</span>
          </div>
          <div className="vsc-statusbar-item"><span>{clock}</span></div>
        </div>
      </div>

      {/* ── Command Palette ── */}
      <CommandPalette
        isOpen={cmdPaletteOpen}
        onClose={() => setCmdPalette(false)}
        onNavigate={onNavigate}
        onOpenCopilot={() => setCopilot(true)}
      />

      {/* ── Vijay's Copilot ── */}
      <VijaysCopilot isOpen={copilotOpen} onClose={() => setCopilot(false)} />

      {/* ── Settings Panel ── */}
      <SettingsPanel
        isOpen={settingsOpen}
        onClose={() => setSettings(false)}
        onOpenPalette={() => setCmdPalette(true)}
        onToggleTerminal={() => setTerminal(p => !p)}
        onOpenCopilot={() => setCopilot(true)}
      />
    </div>
  );
}
