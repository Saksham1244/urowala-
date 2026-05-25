import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Award, Heart, Shield, Users, MapPin, Stethoscope, Star, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './About.css';

const reasons = [
  { icon: <Award size={28}/>, title: 'Board-Certified Specialists', desc: 'All our doctors hold advanced post-graduate degrees from AIIMS & SMS Jaipur — India\'s top medical institutions.', color: '#3B82F6' },
  { icon: <Zap size={28}/>, title: 'Advanced Technology', desc: 'Equipped with the latest laser, laparoscopic and diagnostic equipment for precise, minimally invasive procedures.', color: '#FF6C00' },
  { icon: <Heart size={28}/>, title: 'Patient-Centered Care', desc: 'We listen, we care, and we treat every patient as family. Your comfort and recovery are our top priorities.', color: '#E879A0' },
  { icon: <Star size={28}/>, title: '10+ Years Excellence', desc: '10 years of combined clinical experience with over 7,000 successful surgeries and 3,00,000+ treatments.', color: '#8B5CF6' },
  { icon: <MapPin size={28}/>, title: 'Two Convenient Locations', desc: 'Two fully equipped clinics in Jaipur — Mansarovar and Sanganer — for maximum accessibility.', color: '#10B981' },
  { icon: <Shield size={28}/>, title: 'Safe & Affordable', desc: 'World-class medical care at transparent, affordable prices with flexible consultation timings.', color: '#F59E0B' },
];

const values = [
  { icon: '🎯', title: 'Excellence', desc: 'We uphold the highest standards in medical care and continuously advance our skills.' },
  { icon: '💙', title: 'Compassion', desc: 'We treat every patient with empathy, dignity, and genuine care.' },
  { icon: '🔬', title: 'Innovation', desc: 'We embrace the latest technologies to deliver the best possible outcomes.' },
  { icon: '🤝', title: 'Integrity', desc: 'We are honest, transparent, and ethical in everything we do.' },
];

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>About Us</div>
          <h1>About Urowala Clinic</h1>
          <p>Jaipur's leading multi-specialty clinic — excellence in Urology, Dermatology & Plastic Surgery since 2015.</p>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container about-mission">
          <div className="about-mission__text">
            <div className="section-label">{t('about.label')}</div>
            <h2>{t('about.title')}</h2>
            <div className="divider divider-left"/>
            <p style={{marginBottom:'20px'}}>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <div style={{display:'flex',gap:'32px',marginTop:'32px',flexWrap:'wrap'}}>
              <div className="about-stat-block"><strong>10+</strong><span>Years Experience</span></div>
              <div className="about-stat-block"><strong>3</strong><span>Specialist Doctors</span></div>
              <div className="about-stat-block"><strong>2</strong><span>Clinic Locations</span></div>
            </div>
          </div>
          <div className="about-mission__visual">
            <div className="about-mission__img-card">
              <div className="about-mission__img-placeholder">
                <Stethoscope size={80} color="var(--primary)" strokeWidth={1.5}/>
                <h3 style={{color:'var(--text-dark)',marginTop:'16px'}}>Urowala Clinic</h3>
                <p>Jaipur, Rajasthan</p>
                <div className="about-mission__stats-row">
                  <div><strong style={{color:'var(--primary)',fontFamily:"'Rethink Sans',sans-serif",fontSize:'1.8rem'}}>3,00,000+</strong><span>Patients Treated</span></div>
                  <div><strong style={{color:'var(--accent)',fontFamily:"'Rethink Sans',sans-serif",fontSize:'1.8rem'}}>7,000+</strong><span>Surgeries</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="about-why-section">
        <div className="container">
          <div className="about-section-header">
            <div className="about-section-badge">Why Choose Us</div>
            <h2 className="about-section-title">{t('about.why')}</h2>
            <p className="about-section-sub">We combine clinical excellence with genuine compassion to deliver outcomes that change lives.</p>
          </div>
          <div className="about-why-grid">
            {reasons.map((r,i) => (
              <div key={i} className="about-why-card">
                <div className="about-why-icon" style={{background: r.color + '18', color: r.color}}>
                  {r.icon}
                </div>
                <h3 className="about-why-title">{r.title}</h3>
                <p className="about-why-desc">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values-section">
        <div className="container">
          <div className="about-section-header">
            <div className="about-section-badge">Our Values</div>
            <h2 className="about-section-title">What We Stand For</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v,i) => (
              <div key={i} className="about-value-card">
                <div className="about-value-body">
                  <div className="about-value-icon" style={{fontSize: '2rem', marginBottom: '16px'}}>{v.icon}</div>
                  <h3 className="about-value-title">{v.title}</h3>
                  <p className="about-value-desc">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section about-cta">
        <div className="container about-cta__inner">
          <div>
            <h2 style={{color:'white'}}>Ready to Experience Expert Care?</h2>
            <p style={{color:'rgba(255,255,255,0.8)'}}>Book a consultation with our specialists today.</p>
          </div>
          <div style={{display:'flex',gap:'16px',flexWrap:'wrap'}}>
            <Link to="/book-appointment" className="btn btn-white btn-lg">
              Book Appointment <ArrowRight size={18}/>
            </Link>
            <Link to="/doctors" className="btn btn-outline btn-lg">
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
