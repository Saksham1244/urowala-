import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, BookOpen, Globe, Stethoscope, Heart, CheckCircle, MessageCircle, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react';
import './About.css';

/* ── Achievement Photos ── */
const ACHIEVEMENT_PHOTOS = [
  {
    id: 1,
    src: '/achievements/jua-kyoto.jpg',
    title: 'Japan Urology Association — JUA 2026, Kyoto',
    caption: 'Presenting research at the Annual Meeting of the Japan Urological Association, Kyoto, Japan (April 2026)',
    badge: '🌏 International',
    type: 'conference',
  },
  {
    id: 2,
    src: '/achievements/recon-award.jpg',
    title: 'RECON 2025 — Best Paper Award',
    caption: 'Receiving 1st Prize for Best Poster Presentation at RECON 2025, AIIMS Bhubaneswar (Nov 28–29, 2025)',
    badge: '🏆 Award',
    type: 'award',
  },
  {
    id: 3,
    src: '/achievements/recon-certificate.jpg',
    title: 'RECON 2025 — Poster Winner Certificate',
    caption: '1st Prize — Poster Presentation Winner at Andrology & Reconstructive Urology Live Operative Workshop, AIIMS Bhubaneswar',
    badge: '🥇 1st Prize',
    type: 'award',
  },
  {
    id: 4,
    src: '/achievements/nzusicon-jaipur.jpg',
    title: 'NZUSICON 2025 — Jaipur',
    caption: 'Attending the NZUSICON 2025 conference held in the historic city of Jaipur (November 14–16, 2025)',
    badge: '📍 National',
    type: 'conference',
  },
];

const RESEARCH_AREAS = [
  { icon: '🔬', label: 'Urological Oncology' },
  { icon: '🫘', label: 'Endourology' },
  { icon: '🔧', label: 'Reconstructive Urology' },
  { icon: '💎', label: 'Kidney Stone Disease' },
  { icon: '🦠', label: 'Urinary Tract Infections' },
  { icon: '♂️', label: "Men's Health" },
  { icon: '✂️', label: 'Minimally Invasive Surgery' },
];

const CONFERENCES = [
  { year: '2026', event: 'Japan Urology Association (JUA) Annual Meeting', location: 'Kyoto, Japan', type: 'international' },
  { year: '2026', event: 'USICON — Urological Society of India Annual Conference', location: 'India', type: 'national' },
  { year: '2025', event: 'RECON 2025 — Andrology & Reconstructive Urology Workshop', location: 'AIIMS Bhubaneswar', type: 'award', award: '🏆 1st Prize — Best Poster Presentation' },
  { year: '2025', event: 'NZUSICON 2025', location: 'Jaipur, India', type: 'national' },
  { year: '2024', event: 'SIU & International Urological Societies', location: 'International', type: 'international' },
  { year: '2024', event: 'Conferences at AIIMS Rishikesh & Premier Institutes', location: 'India', type: 'national' },
];

/* ── Lightbox Component ── */
const Lightbox = ({ photo, onClose, onPrev, onNext }) => (
  <div className="about-lightbox" onClick={onClose}>
    <button className="about-lightbox-close" onClick={onClose}><X size={24} /></button>
    <button className="about-lightbox-prev" onClick={e => { e.stopPropagation(); onPrev(); }}><ChevronLeft size={32} /></button>
    <div className="about-lightbox-inner" onClick={e => e.stopPropagation()}>
      <img src={photo.src} alt={photo.title} />
      <div className="about-lightbox-caption">
        <span className="about-photo-badge">{photo.badge}</span>
        <h3>{photo.title}</h3>
        <p>{photo.caption}</p>
      </div>
    </div>
    <button className="about-lightbox-next" onClick={e => { e.stopPropagation(); onNext(); }}><ChevronRight size={32} /></button>
  </div>
);

/* ── Main About Page ── */
const About = () => {
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevPhoto = () => setLightbox(p => (p - 1 + ACHIEVEMENT_PHOTOS.length) % ACHIEVEMENT_PHOTOS.length);
  const nextPhoto = () => setLightbox(p => (p + 1) % ACHIEVEMENT_PHOTOS.length);

  return (
    <div className="about-page">

      {/* ── HERO BANNER ── */}
      <section className="about-hero">
        <div className="about-hero__overlay" />
        <div className="container about-hero__inner">
          <div className="about-hero__photo-wrap">
            <img src="/doctors/mohit.jpg" alt="Dr. Mohit Sharma"
              onError={e => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
            <div className="about-hero__photo-fallback">MS</div>
          </div>
          <div className="about-hero__text">
            <div className="section-label" style={{ color: 'rgba(255,255,255,0.85)', background: 'rgba(255,255,255,0.15)' }}>About the Doctor</div>
            <h1>Dr. Mohit Sharma</h1>
            <p className="about-hero__credentials">MBBS · MS (General Surgery) · MCh (Urology)</p>
            <p className="about-hero__subtitle">Urologist · Researcher · Academician</p>
            <div className="about-hero__tags">
              <span>🏥 AIIMS Bhopal</span>
              <span>🌏 International Speaker</span>
              <span>🏆 Award Winner</span>
              <span>📚 Published Researcher</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
              <a href="https://wa.me/9183570761" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">
                <MessageCircle size={18} /> Book Appointment
              </a>
              <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="btn btn-white btn-lg">
                <ExternalLink size={16} /> Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK STATS ── */}
      <section className="about-stats-bar">
        <div className="container about-stats-bar__grid">
          {[
            { icon: '🏥', value: '5+', label: 'Years Experience' },
            { icon: '⚕️', value: '8000+', label: 'Surgeries Performed' },
            { icon: '📄', value: '10+', label: 'Research Publications' },
            { icon: '🌍', value: '3+', label: 'Countries Presented' },
            { icon: '🏆', value: '5+', label: 'Awards Won' },
          ].map((s, i) => (
            <div key={i} className="about-stat-item">
              <div className="about-stat-icon">{s.icon}</div>
              <div className="about-stat-value">{s.value}</div>
              <div className="about-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── BIOGRAPHY ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-label">Biography</div>
          <h2>About Dr. Mohit Sharma</h2>
          <div className="divider divider-left" />
          <div className="about-bio-text">
            <p>
              Dr. Mohit Sharma is a highly dedicated Urologist with advanced training in General Surgery and Urology from the prestigious <strong>All India Institute of Medical Sciences (AIIMS), Bhopal</strong>. He is committed to providing evidence-based, patient-centered urological care while continuously incorporating the latest advancements in the field into his clinical practice.
            </p>
            <p>
              With a strong academic background and a passion for research, Dr. Sharma has authored and contributed to multiple scientific publications in reputed national and international journals. His work has been recognized at numerous scientific forums, where he has presented innovative research and clinical studies in the field of urology.
            </p>
            <p>
              Dr. Sharma is an active participant in national and international academic conferences and believes that continuous learning is essential for delivering world-class patient care. His dedication to academic excellence has earned him recognition and awards at several prestigious meetings.
            </p>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS & PHOTOS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">Achievements & Conferences</div>
            <h2>Academic Excellence</h2>
            <p>Recognized at national and international forums for outstanding contributions to Urology</p>
          </div>

          <div className="about-photos-grid">
            {ACHIEVEMENT_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                className={`about-photo-card ${photo.type === 'award' ? 'about-photo-card--award' : ''}`}
                onClick={() => openLightbox(idx)}
              >
                <div className="about-photo-img-wrap">
                  <img src={photo.src} alt={photo.title} loading="lazy" />
                  <div className="about-photo-overlay">
                    <ExternalLink size={28} color="white" />
                  </div>
                </div>
                <div className="about-photo-info">
                  <span className="about-photo-badge">{photo.badge}</span>
                  <h4>{photo.title}</h4>
                  <p>{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONFERENCE LIST ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-label">Conference Participation</div>
          <h2>Academic Achievements</h2>
          <div className="divider divider-left" />

          <div className="about-timeline">
            {CONFERENCES.map((conf, i) => (
              <div key={i} className={`about-timeline-item ${conf.type}`}>
                <div className="about-timeline-year">{conf.year}</div>
                <div className="about-timeline-dot" />
                <div className="about-timeline-content">
                  <h4>{conf.event}</h4>
                  <span className="about-timeline-location">📍 {conf.location}</span>
                  {conf.award && <div className="about-timeline-award">{conf.award}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEARCH AREAS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">Research & Publications</div>
            <h2>Areas of Clinical Interest</h2>
            <p>Dr. Sharma contributes to peer-reviewed publications and actively engages in clinical research to improve patient outcomes.</p>
          </div>
          <div className="about-research-grid">
            {RESEARCH_AREAS.map((area, i) => (
              <div key={i} className="about-research-card">
                <span className="about-research-icon">{area.icon}</span>
                <span className="about-research-label">{area.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section className="section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-label">Philosophy of Care</div>
          <h2>Patient-First Approach</h2>
          <div className="divider divider-left" />
          <div className="about-philosophy">
            <div className="about-philosophy-quote">
              <span>"</span>
              Every patient deserves treatment based on the highest international standards.
              <span>"</span>
            </div>
            <p>
              Dr. Mohit Sharma believes in continuous participation in global scientific meetings, research activities, and professional education programs to remain updated with the latest developments in urology. He applies this knowledge to provide comprehensive, ethical, and compassionate care.
            </p>
            <p style={{ marginTop: '16px' }}>
              His mission is not only to treat disease but also to educate patients, promote awareness, and help individuals make informed decisions regarding their health.
            </p>
          </div>
        </div>
      </section>

      {/* ── UROWALA MISSION ── */}
      <section className="section section-alt">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="about-mission-card">
            <div className="about-mission-logo">
              <img src="/logo.png" alt="UroWala" style={{ height: '48px' }} onError={e => e.target.style.display = 'none'} />
            </div>
            <h3>The UroWala Mission</h3>
            <p>
              Through <strong>UroWala</strong>, Dr. Mohit Sharma aims to make reliable, scientifically accurate, and easy-to-understand urological information accessible to everyone. The platform serves as a bridge between modern medical science and the general public, empowering people with knowledge for better health and early disease detection.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '24px' }}>
              <Link to="/services" className="btn btn-primary">Explore Services</Link>
              <a href="https://wa.me/9183570761" target="_blank" rel="noreferrer" className="btn btn-accent">
                <MessageCircle size={16} /> Book Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <Lightbox
          photo={ACHIEVEMENT_PHOTOS[lightbox]}
          onClose={closeLightbox}
          onPrev={prevPhoto}
          onNext={nextPhoto}
        />
      )}
    </div>
  );
};

export default About;

