import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <style>{`
        @keyframes whatsappPulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          70% { box-shadow: 0 0 0 16px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .whatsapp-float-btn {
          animation: whatsappPulse 2.2s infinite;
        }
        .whatsapp-float-btn:hover {
          transform: scale(1.12);
          animation: none;
          box-shadow: 0 8px 32px rgba(37,211,102,0.45);
        }
      `}</style>
      <a
        href="https://wa.me/9039570761"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float-btn"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #25D366 60%, #128C7E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          boxShadow: '0 4px 18px rgba(37,211,102,0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s',
          cursor: 'pointer',
        }}
        aria-label="Chat with us on WhatsApp"
      >
        <MessageCircle size={30} fill="white" color="white" />
        {hovered && (
          <span
            style={{
              position: 'absolute',
              right: '68px',
              bottom: '10px',
              background: '#222',
              color: '#fff',
              borderRadius: '8px',
              padding: '6px 14px',
              fontSize: '14px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              pointerEvents: 'none',
            }}
          >
            Chat with us
          </span>
        )}
      </a>
    </>
  );
}
