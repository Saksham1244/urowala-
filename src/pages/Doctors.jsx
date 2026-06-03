import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Star, Award, ChevronRight, CheckCircle } from 'lucide-react';
import { getPhotoPosition } from '../utils/photoPosition';
import './Doctors.css';

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

import { getMergedDoctors } from '../data/doctors.js';

function DoctorCard({ doc }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="doctor-card">
      <div className="doctor-card-inner">
        {/* Photo */}
        <div className="doctor-photo-wrap">
          {!imgError ? (
            <img
              src={doc.photo}
              alt={doc.name}
              className="doctor-photo"
              style={{ objectPosition: getPhotoPosition(doc.photoKey, doc.photoPosition) }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="doctor-initials"
              style={{ background: doc.color }}
            >
              {doc.photoFallback || doc.name.slice(0, 2)}
            </div>
          )}
          <div className="doctor-experience-badge">
            <Star size={14} fill="#f97316" color="#f97316" />
            {doc.experience}+ Years
          </div>
        </div>

        {/* Info */}
        <div className="doctor-info">
          <div className="doctor-certs">
            {doc.certifications?.map((c, i) => (
              <span key={i} className="doctor-cert-badge">
                <Award size={12} /> {c}
              </span>
            ))}
          </div>

          <h2 className="doctor-name">{doc.name}</h2>
          <p className="doctor-title">{doc.title}</p>
          <p className="doctor-quals">{doc.qualifications}</p>

          <div className="doctor-stats">
            <div className="doctor-stat">
              <span className="doctor-stat-num">{doc.experience}+</span>
              <span className="doctor-stat-lbl">Years Exp.</span>
            </div>
            <div className="doctor-stat-divider" />
            <div className="doctor-stat">
              <span className="doctor-stat-num">{doc.surgeries}</span>
              <span className="doctor-stat-lbl">Procedures</span>
            </div>
          </div>

          <div className="doctor-bio">
            {doc.bio?.split('\n\n').map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>

          {doc.conditions && (
            <div className="doctor-conditions">
              <h4 className="doctor-conditions-title">Conditions Treated</h4>
              <div className="doctor-conditions-grid">
                {doc.conditions.map((c, i) => (
                  <div key={i} className="doctor-condition-item">
                    <CheckCircle size={14} color="var(--primary, #0f4c5c)" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/9039570761"
              target="_blank"
              rel="noopener noreferrer"
              className="doctor-book-btn"
            >
              <MessageCircle size={18} />
              Book Appointment via WhatsApp
            </a>
            <a
              href="https://www.instagram.com/dr.mohit_urowala/"
              target="_blank"
              rel="noopener noreferrer"
              className="doctor-social-btn doctor-social-ig"
            >
              <InstagramIcon />
              Instagram
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61584123434000&mibextid=wwXIfr&rdid=kukWtU9x4tlXyP08&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CqaHPv8uM%2F%3Fmibextid%3DwwXIfr#"
              target="_blank"
              rel="noopener noreferrer"
              className="doctor-social-btn doctor-social-fb"
            >
              <FacebookIcon />
              Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const doctors = getMergedDoctors();
  return (
    <div className="doctors-page">
      {/* Hero */}
      <section className="doctors-hero">
        <div className="doctors-hero-overlay" />
        <div className="doctors-hero-content">
          <p className="doctors-hero-sub">Our Team</p>
          <h1 className="doctors-hero-title">Meet Our Specialist Doctors</h1>
          <p className="doctors-hero-desc">
            Experienced, compassionate, and board-certified — our doctors are dedicated to delivering
            the best outcomes for every patient at Urowala Clinic.
          </p>
          <div className="doctors-hero-divider" />
        </div>
      </section>

      {/* Doctors */}
      <section className="doctors-section">
        <div className="doctors-container">
          {doctors.map((doc, i) => (
            <DoctorCard key={i} doc={doc} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="doctors-cta">
        <div className="doctors-cta-inner">
          <h2 className="doctors-cta-title">Ready to consult our specialists?</h2>
          <p className="doctors-cta-desc">
            Book your appointment easily via WhatsApp or visit either of our two clinics in Jaipur.
          </p>
          <div className="doctors-cta-btns">
            <a
              href="https://wa.me/9039570761"
              target="_blank"
              rel="noopener noreferrer"
              className="doctors-cta-btn-primary"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <Link to="/contact" className="doctors-cta-btn-secondary">
              Find Our Clinics <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
