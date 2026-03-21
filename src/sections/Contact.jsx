import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, Linkedin, Github, MessageCircle } from 'lucide-react';
import Starfield from '../components/Starfield';

const WHATSAPP_NUMBER = '918855831357';
const WHATSAPP_MESSAGE = encodeURIComponent("Hi Vijay! I'd like to connect with you.");
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

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

const WhatsAppIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      id="contact"
      className="section-pad"
      ref={ref}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <Starfield />
      {/* Ambient glow */}
      <div
        className="blob"
        style={{
          width: 500, height: 500,
          top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
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
            style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.15, marginBottom: '20px', color: 'var(--text-pri)' }}
          >
            Let's Build Something{' '}
            <span className="grad-text">Together</span>
          </h2>
          <p style={{ color: 'var(--text-sec)', fontSize: '17px', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            I'm actively looking for frontend roles. Whether you have a job opening, a project idea,
            or just want to connect — feel free to reach out!
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
            <p style={{ fontWeight: 600, fontSize: '16px', marginBottom: '8px', color: 'var(--text-pri)' }}>Contact Details</p>
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
                  background: 'var(--tag-bg)',
                  border: '1px solid var(--tag-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--accent-lt)', flexShrink: 0,
                }}>
                  {icon}
                </div>
                <div>
                  <p style={{ fontSize: '11px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-sec)', letterSpacing: '1px', marginBottom: '2px', textTransform: 'uppercase' }}>{label}</p>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text-pri)' }}>{value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '48px 32px',
              borderRadius: '20px',
              background: 'var(--card-bg)',
              border: '1px solid var(--border)',
              backdropFilter: 'blur(12px)',
              gap: '24px',
            }}
          >
            {/* WhatsApp icon circle */}
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(37, 211, 102, 0.3)',
              }}
            >
              <WhatsAppIcon size={40} />
            </motion.div>

            <div>
              <p style={{
                fontSize: '20px',
                fontWeight: 700,
                color: 'var(--text-pri)',
                marginBottom: '8px',
              }}>
                Prefer a quick chat?
              </p>
              <p style={{
                fontSize: '15px',
                color: 'var(--text-sec)',
                lineHeight: 1.7,
                maxWidth: '320px',
              }}>
                Drop me a message on WhatsApp for a faster response. I'm usually available and happy to chat!
              </p>
            </div>

            <a
              id="contact-whatsapp"
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 32px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(37, 211, 102, 0.25)',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(37, 211, 102, 0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(37, 211, 102, 0.25)';
              }}
            >
              <MessageCircle size={18} />
              Chat on WhatsApp
            </a>

            <p style={{
              fontSize: '12px',
              color: 'var(--text-sec)',
              opacity: 0.7,
              fontFamily: 'JetBrains Mono, monospace',
              letterSpacing: '0.5px',
            }}>
              Available Mon – Sat · 10 AM – 9 PM IST
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
