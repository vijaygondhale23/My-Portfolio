const WHATSAPP_LINK = `https://wa.me/918855831357?text=${encodeURIComponent("Hi Vijay! I'd like to connect with you.")}`;

const CONTACT_ITEMS = [
  { id: 'email',    icon: '✉',  label: 'Email',    value: 'vgondhale23@gmail.com',       href: 'mailto:vgondhale23@gmail.com' },
  { id: 'phone',    icon: '📞', label: 'Phone',    value: '+91 8855831357',               href: 'tel:+918855831357' },
  { id: 'linkedin', icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/vgondhale23', href: 'https://linkedin.com/in/vgondhale23' },
  { id: 'github',   icon: '🐙', label: 'GitHub',   value: 'github.com/vijaygondhale23',  href: 'https://github.com/vijaygondhale23' },
];

const WhatsAppIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

export default function Contact() {
  return (
    <div>
      <span className="code-comment">// contact.css — get in touch</span>
      <h2 className="section-heading">
        Let's Build Something <span className="hl-pink">Together</span>
      </h2>
      <p className="section-subheading">
        // I'm actively looking for frontend roles — feel free to reach out!
      </p>

      <div className="contact-grid">
        {/* Left: contact cards */}
        <div className="fade-up">
          <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--syn-white)', marginBottom: 16, fontFamily: 'JetBrains Mono, monospace' }}>
            Contact Details
          </p>
          {CONTACT_ITEMS.map(({ id, icon, label, value, href }) => (
            <a
              key={id}
              id={`contact-${id}`}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="contact-card"
            >
              <div className="contact-icon-box">{icon}</div>
              <div>
                <div className="contact-label">{label}</div>
                <div className="contact-value">{value}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: 'var(--syn-faded)', fontSize: 14 }}>→</span>
            </a>
          ))}
        </div>

        {/* Right: WhatsApp CTA */}
        <div className="whatsapp-box fade-up-2">
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', boxShadow: '0 8px 32px rgba(37,211,102,0.35)',
          }}>
            <WhatsAppIcon />
          </div>
          <div>
            <p className="whatsapp-title">Prefer a quick chat?</p>
            <p className="whatsapp-sub">
              Drop me a message on WhatsApp for a faster response. I'm usually available and happy to chat!
            </p>
          </div>
          <a
            id="contact-whatsapp"
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="whatsapp-btn"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12c0 1.68.42 3.25 1.14 4.63L2 22l5.37-1.14A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.54 0-2.99-.4-4.25-1.1l-.3-.18-3.13.66.67-3.14-.18-.3A8 8 0 1112 20z"/>
            </svg>
            Chat on WhatsApp
          </a>
          <p style={{ fontSize: 11, color: 'var(--syn-faded)', fontFamily: 'JetBrains Mono, monospace' }}>
            Available Mon – Sat · 10 AM – 9 PM IST
          </p>
        </div>
      </div>
    </div>
  );
}
