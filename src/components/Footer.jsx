import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Clock, ArrowRight } from 'lucide-react';
import { getServicesFromStorage } from '../data/services';

// Social icons as inline SVGs (lucide-react doesn't export Facebook/Instagram/Youtube)
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
  </svg>
);
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <img src="/logo.png" alt="Urowala Clinic" className="footer__logo"
              onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} />
            <p className="footer__tagline">{t('footer.tagline')}</p>
            <p className="footer__desc">
              Jaipur's dedicated urology centre, built around the expertise of Dr. Mohit Sharma, an AIIMS-trained Urologist providing cutting-edge laser and surgical care.
            </p>
            <div className="footer__social">
              <a href="https://www.facebook.com/share/1CqaHPv8uM/?mibextid=wwXIfr" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon"><FacebookIcon /></a>
              <a href="https://www.instagram.com/dr.mohit_urowala?utm_source=qr" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon"><InstagramIcon /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4>{t('footer.quickLinks')}</h4>
            <ul>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Our Doctors', path: '/doctors' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Blog', path: '/blog' },
                { label: 'Patient Stories', path: '/experiences' },
                { label: 'Contact Us', path: '/contact' },
              ].map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__link">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4>Urology Services</h4>
            <ul>
              {getServicesFromStorage().slice(0, 5).map(s => ({ label: s.title, path: `/services/${s.slug}` }))
                .concat([{ label: 'All Procedures', path: '/procedures' }])
                .map(link => (
                <li key={link.path}>
                  <Link to={link.path} className="footer__link">
                    <ArrowRight size={12} /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>{t('footer.contactUs')}</h4>
            <div className="footer__locations">
              <div className="footer__location">
                <div className="footer__location-label">
                  <MapPin size={14} /> Mansarovar
                </div>
                <a
                  href="https://maps.google.com/?q=122+Mohan+Nagar+Gate+No+8+Mansarovar+Link+Road+Jaipur"
                  target="_blank" rel="noreferrer"
                  className="footer__address-link"
                >
                  122, Mohan Nagar Gate No. 8, Mansarovar Link Road, near Mangalam Electronic Market, Ridhhi Sidhhi Circle, Jaipur 302018
                </a>
                <a href="tel:+919183570761" className="footer__phone"><Phone size={12} /> +91 91835 70761</a>
                <div className="footer__hours">
                  <Clock size={12} /> Mon–Sat: 10 AM – 8 PM &nbsp;|&nbsp; Sun: 10 AM – 2 PM
                </div>
              </div>
              <div className="footer__location">
                <div className="footer__location-label">
                  <MapPin size={14} /> Sanganer
                </div>
                <a
                  href="https://maps.google.com/?q=21+GP+Colony+New+Sanganer+Road+Jaipur"
                  target="_blank" rel="noreferrer"
                  className="footer__address-link"
                >
                  21, G P Colony, New Sanganer Road, near Pradhan Vatika Marriage Garden, Mansarovar, Jaipur 302020
                </a>
                <a href="tel:+919183570761" className="footer__phone"><Phone size={12} /> +91 91835 70761</a>
                <div className="footer__hours">
                  <Clock size={12} /> Mon–Sat: 9–10 AM & 3–5 PM &nbsp;|&nbsp; Sun: Closed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {year} Urowala Clinic. {t('footer.rights')}</p>
          <div className="footer__credit" style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', textAlign: 'center', lineHeight: 1.6}}>
            Website Design &amp; Development by <br />
            <strong style={{color: 'var(--primary-light)'}}>Saksham Bhushan Asthana</strong><br />
            <a href="mailto:asthanasaksham2003@gmail.com" style={{color:'inherit', textDecoration:'none', transition:'color 0.2s'}} onMouseEnter={e=>e.target.style.color='var(--primary-light)'} onMouseLeave={e=>e.target.style.color='inherit'}>asthanasaksham2003@gmail.com</a>
          </div>
          <div className="footer__bottom-links">
            <Link to="/privacy">{t('footer.privacy')}</Link>
            <Link to="/terms">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
