import { useState, useRef, useEffect } from 'react';

/* ── Knowledge base ── */
const KNOWLEDGE = {
  about: {
    triggers: ['about vijay', 'who is vijay', 'tell me about vijay', 'who are you', 'introduce', 'yourself'],
    response: `👋 **Hi! I'm Vijay Gondhale!**

I'm a passionate **Frontend Developer** from Thane, Maharashtra, India 🇮🇳

I live at the crossroads of **React.js**, modern UI design, and backend engineering — building web apps that are genuinely *fast*, *accessible*, and *visually compelling*.

🎓 B.Sc. Computer Science — University of Mumbai (CGPA: 8.05)
💼 Former Automation Test Engineer @ Wipro Ltd (Cisco SRTS)
🚀 Actively looking for **Frontend / Full-Stack** roles`,
  },
  projects: {
    triggers: ['project', 'built', 'portfolio', 'work', 'made', 'created', 'apps'],
    response: `📁 **Vijay's Featured Projects:**

**1. Project Management System**
A full-featured task management frontend with drag-and-drop UX, real-time status tracking, and polished interactive UI components.
→ Stack: React, Tailwind CSS, JavaScript, HTML5

**2. Student Record System**
Full-stack CRUD app with real-time search, filtering, and pagination built on the MERN stack with RESTful API design.
→ Stack: React, Node.js, MongoDB, Express, Tailwind CSS

More projects available on [GitHub ↗](https://github.com/vijaygondhale23)`,
  },
  experience: {
    triggers: ['experience', 'work history', 'job', 'wipro', 'cisco', 'career', 'employment'],
    response: `💼 **Work Experience:**

**Automation Test Engineer — Wipro Ltd**
*Mar 2024 – Jun 2024 · Mumbai, India*

Working on the **Cisco SRTS Team:**
▸ Built automated test scripts using Python & Pyats for Cisco networking firmware validation
▸ Performed functional, regression & performance testing across routing/switching modules
▸ Integrated CI/CD pipelines via Jenkins & BitBucket
▸ Collaborated with cross-functional teams across sprint cycles

🟢 Currently **open to new opportunities** — Frontend / Full-Stack roles`,
  },
  skills: {
    triggers: ['skills', 'tech stack', 'technologies', 'tools', 'stack', 'languages', 'know', 'use'],
    response: `⚡ **Vijay's Tech Stack:**

**Frontend** → React.js (88%), JavaScript (84%), HTML5/CSS3 (92%), Tailwind CSS (80%)

**Backend** → Node.js, Express, MongoDB, REST APIs

**Testing** → Python (75%), Pyats (72%), Jenkins (65%), Selenium (60%)

**Dev Tools** → Git/GitHub (85%), Vite (78%), Figma (65%), VS Code (95%)

**Others** → Next.js, Bootstrap, Firebase, Redux, Postman, Linux`,
  },
  contact: {
    triggers: ['contact', 'reach', 'email', 'phone', 'linkedin', 'hire', 'connect', 'message', 'talk'],
    response: `📬 **Contact Vijay:**

✉️ **Email:** vgondhale23@gmail.com
📞 **Phone:** +91 8855831357
💼 **LinkedIn:** [linkedin.com/in/vgondhale23](https://linkedin.com/in/vgondhale23)
🐙 **GitHub:** [github.com/vijaygondhale23](https://github.com/vijaygondhale23)
💬 **WhatsApp:** [Chat now](https://wa.me/918855831357)

Available **Mon–Sat · 10 AM – 9 PM IST** 🕙`,
  },
  support: {
    triggers: ['support', 'help vijay', 'hire', 'opportunity', 'collaborate', 'recommend', 'refer'],
    response: `🙏 **Ways to Support Vijay:**

⭐ **Star** his projects on GitHub
🔗 **Share** his portfolio with your network
💼 **Offer** a Frontend / Full-Stack role — he's actively looking!
🤝 **Collaborate** on open-source or freelance projects
📣 **Refer** him to companies hiring frontend developers

👉 You can reach him directly at **vgondhale23@gmail.com**`,
  },
  education: {
    triggers: ['education', 'college', 'degree', 'study', 'university', 'cgpa', 'graduation'],
    response: `🎓 **Education:**

**B.Sc. in Computer Science**
Ram-Niranjan Jhunjhunwala College, University of Mumbai
*2021 – 2024 · CGPA: 8.05*

**12th Board (HSC)**
B.N.N. College, Bhiwandi, Maharashtra State Board
*2020 – 2021 · 81.33%*

📜 **Certification:**
100 Days of Code: Python Bootcamp — Udemy (Dr. Angela Yu)`,
  },
  resume: {
    triggers: ['resume', 'cv', 'download', 'pdf'],
    response: `📄 **Vijay's Resume**

You can view/download Vijay's resume here:
👉 [Open Resume PDF](https://drive.google.com/file/d/1xWMRuORDtz4Ud8zE-5SP3dUmPb7L4ZSc/view?usp=sharing)

Or click **Resume.pdf** in the file explorer sidebar on the left!`,
  },
};

const QUICK_QUESTIONS = [
  { label: 'Tell me about Vijay?',           key: 'about' },
  { label: 'What projects has Vijay built?', key: 'projects' },
  { label: 'Tell me about his work experience', key: 'experience' },
  { label: "What's his tech stack?",         key: 'skills' },
  { label: 'How can I contact Vijay?',       key: 'contact' },
  { label: 'How can I support Vijay?',       key: 'support' },
];

const FALLBACK = `🤔 I don't have a specific answer for that, but here are some things I can help with:

• **About Vijay** — his background & goals
• **Projects** — things he's built
• **Experience** — his work history
• **Tech Stack** — skills & tools
• **Contact** — how to reach him
• **Resume** — download his CV

Try one of the quick questions below, or rephrase your query! 😊`;

function findResponse(query) {
  const q = query.toLowerCase().trim();
  for (const [, val] of Object.entries(KNOWLEDGE)) {
    if (val.triggers.some(t => q.includes(t))) {
      return val.response;
    }
  }
  return FALLBACK;
}

/* ── Markdown-lite renderer ── */
function MsgText({ text }) {
  const lines = text.split('\n');
  return (
    <div style={{ lineHeight: 1.7, fontSize: 12.5, fontFamily: 'JetBrains Mono, monospace' }}>
      {lines.map((line, i) => {
        // Bold: **text**
        const parts = line.split(/(\*\*[^*]+\*\*)/g);
        return (
          <span key={i} style={{ display: 'block', marginBottom: line === '' ? 6 : 0 }}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={j} style={{ color: 'var(--syn-white)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
              }
              // Link: [label](url)
              const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
              if (linkMatch) {
                return (
                  <a key={j} href={linkMatch[2]} target="_blank" rel="noreferrer"
                    style={{ color: 'var(--syn-cyan)', textDecoration: 'none' }}>
                    {linkMatch[1]}
                  </a>
                );
              }
              // Italic: *text*
              const italicParts = part.split(/(\*[^*]+\*)/g);
              return italicParts.map((ip, k) =>
                ip.startsWith('*') && ip.endsWith('*')
                  ? <em key={k} style={{ color: 'var(--syn-faded)', fontStyle: 'italic' }}>{ip.slice(1, -1)}</em>
                  : <span key={k}>{ip}</span>
              );
            })}
          </span>
        );
      })}
    </div>
  );
}

/* ── Typing indicator ── */
function TypingIndicator() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '10px 14px' }}>
      <div className="copilot-avatar-sm" />
      <div style={{ display: 'flex', gap: 4, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderRadius: 12, borderTopLeftRadius: 2 }}>
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--syn-faded)',
            display: 'inline-block',
            animation: `copilotBounce 1.2s ${i * 0.2}s ease-in-out infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Main Copilot Component ── */
export default function VijaysCopilot({ isOpen, onClose }) {
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text: text.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setShowWelcome(false);
    setIsTyping(true);

    // Simulate "thinking" delay
    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const response = findResponse(text);
      setIsTyping(false);
      setMessages(prev => [...prev, { role: 'bot', text: response, id: Date.now() + 1 }]);
    }, delay);
  };

  const handleQuick = (key) => {
    const q = QUICK_QUESTIONS.find(q => q.key === key);
    if (q) sendMessage(q.label);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const reset = () => {
    setMessages([]);
    setShowWelcome(true);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className={`copilot-panel ${isOpen ? 'copilot-panel--open' : ''}`}>
      {/* ── Header ── */}
      <div className="copilot-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="copilot-header-icon">✦</span>
          <span className="copilot-header-title">Vijay's AI Assistant</span>
        </div>
        <div style={{ display: 'flex', gap: 4 }}>
          <button className="copilot-icon-btn" onClick={reset} title="New chat">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </button>
          <button className="copilot-icon-btn" onClick={onClose} title="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Workspace badge */}
      <div className="copilot-workspace">
        <span className="copilot-workspace-label">WORKSPACE</span>
        <span className="copilot-workspace-badge">
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c586c0', display: 'inline-block', flexShrink: 0 }} />
          portfolio · vijay-gondhale
        </span>
      </div>

      {/* ── Messages / Welcome ── */}
      <div className="copilot-body">
        {showWelcome && messages.length === 0 ? (
          /* Welcome screen */
          <div className="copilot-welcome">
            <div className="copilot-avatar-lg">✦</div>
            <h3 className="copilot-welcome-title">Hi! I'm Vijay's Copilot 👋</h3>
            <p className="copilot-welcome-sub">
              Ask me anything about his projects, skills, experience, or achievements.
            </p>
            <div className="copilot-quick-grid">
              {QUICK_QUESTIONS.map(q => (
                <button
                  key={q.key}
                  className="copilot-quick-btn"
                  onClick={() => handleQuick(q.key)}
                >
                  <span className="copilot-quick-dot">✦</span>
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat messages */
          <div className="copilot-messages">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`copilot-msg copilot-msg--${msg.role}`}
              >
                {msg.role === 'bot' && <div className="copilot-avatar-sm">✦</div>}
                <div className={`copilot-bubble copilot-bubble--${msg.role}`}>
                  {msg.role === 'bot'
                    ? <MsgText text={msg.text} />
                    : <span style={{ fontSize: 12.5, fontFamily: 'JetBrains Mono, monospace' }}>{msg.text}</span>
                  }
                </div>
              </div>
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      {/* ── Input ── */}
      <div className="copilot-input-area">
        <div className="copilot-input-box">
          <textarea
            ref={inputRef}
            className="copilot-textarea"
            placeholder="Ask about Vijay's projects, experience, skills..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            rows={2}
          />
          <button
            className="copilot-send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>
            </svg>
          </button>
        </div>
        <div className="copilot-footer-note">
          AI can make mistakes · Contact Vijay directly for important info
        </div>
      </div>

      <style>{`
        @keyframes copilotBounce {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.5; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
