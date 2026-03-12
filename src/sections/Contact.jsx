import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const CONTACT_CARDS = [
  {
    id: 'contact-email',
    icon: <Mail size={20} />,
    label: 'Email',
    value: 'vgondhale23@gmail.com',
    href: 'mailto:vgondhale23@gmail.com',
  },
  {
    id: 'contact-phone',
    icon: <Phone size={20} />,
    label: 'Phone',
    value: '+91 8855831357',
    href: 'tel:+918855831357',
  },
  {
    id: 'contact-linkedin',
    icon: <Linkedin size={20} />,
    label: 'LinkedIn',
    value: 'linkedin.com/in/vgondhale23',
    href: 'https://linkedin.com/in/vgondhale23',
  },
  {
    id: 'contact-github',
    icon: <Github size={20} />,
    label: 'GitHub',
    value: 'github.com/vijaygondhale23',
    href: 'https://github.com/vijaygondhale23',
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Using Formspree (replace YOUR_FORM_ID with actual Formspree form ID)
      const res = await fetch('https://formspree.io/f/xpwqgrkd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="section-pad"
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div
        className="blob"
        style={{
          width: 500, height: 500,
          top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(61,107,86,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="container-max" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '64px' }}
        >
          <p className="section-label" style={{ marginBottom: '12px' }}>Get In Touch</p>
          <h2
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px' }}
          >
            Let's Build Something{' '}
            <span className="grad-text">Together</span>
          </h2>
          <p style={{ color: 'var(--text-sec)', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            I'm actively looking for frontend roles. Whether you have a job opening, a project idea,
            or just want to connect — my inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '48px', alignItems: 'start' }}>
          {/* Contact cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px' }}>Contact Details</p>
            {CONTACT_CARDS.map(({ id, icon, label, value, href }) => (
              <a
                key={id}
                id={id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="contact-card"
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'rgba(61,107,86,0.15)',
                  border: '1px solid rgba(61,107,86,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-lt)', flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-sec)', letterSpacing: '1px', marginBottom: '2px', textTransform: 'uppercase' }}>{label}</p>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: '#fff' }}>{value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '20px' }}>Send a Message</p>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="contact-name" style={{ fontSize: '13px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace', display: 'block', marginBottom: '8px' }}>
                  Your Name
                </label>
                <input
                  id="contact-name"
                  className="form-input"
                  type="text"
                  name="name"
                  placeholder="Vijay Gondhale"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-email" style={{ fontSize: '13px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace', display: 'block', marginBottom: '8px' }}>
                  Email Address
                </label>
                <input
                  id="contact-email-input"
                  className="form-input"
                  type="email"
                  name="email"
                  placeholder="recruiter@company.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="contact-message" style={{ fontSize: '13px', color: 'var(--text-sec)', fontFamily: 'JetBrains Mono, monospace', display: 'block', marginBottom: '8px' }}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  className="form-input"
                  name="message"
                  placeholder="Hi Vijay, I'd like to discuss a frontend role at our company..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  style={{ resize: 'vertical', minHeight: '120px' }}
                />
              </div>

              {/* Status messages */}
              {status === 'success' && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 18px', borderRadius: '10px',
                  background: 'rgba(61,107,86,0.1)', border: '1px solid rgba(61,107,86,0.3)',
                  color: 'var(--accent-lt)', fontSize: '14px',
                }}>
                  <CheckCircle size={16} />
                  Message sent! I'll reply within 24 hours. 🎉
                </div>
              )}
              {status === 'error' && (
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '14px 18px', borderRadius: '10px',
                  background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)',
                  color: '#f87171', fontSize: '14px',
                }}>
                  <AlertCircle size={16} />
                  Something went wrong. Try emailing me directly.
                </div>
              )}

              <button
                id="contact-submit"
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                style={{ width: '100%', justifyContent: 'center', opacity: status === 'sending' ? 0.7 : 1 }}
              >
                {status === 'sending' ? (
                  <>Sending…</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
