import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Award, Heart, Shield, Users, MapPin, Stethoscope, Star, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getMergedDoctors } from '../data/doctors.js';
import './About.css';



const values = [
  { icon: '🎯', title: 'Excellence', desc: 'We uphold the highest standards in medical care and continuously advance our skills.' },
  { icon: '💙', title: 'Compassion', desc: 'We treat every patient with empathy, dignity, and genuine care.' },
  { icon: '🔬', title: 'Innovation', desc: 'We embrace the latest technologies to deliver the best possible outcomes.' },
  { icon: '🤝', title: 'Integrity', desc: 'We are honest, transparent, and ethical in everything we do.' },
];

export default function About() {
  const { t } = useTranslation();
  const doctors = getMergedDoctors();

  const reasons = [
    { icon: <Award size={28}/>, title: 'AIIMS-Trained Urologist', desc: 'Dr. Mohit Sharma holds an MCh in Urology from AIIMS, Bhopal — one of India\'s most prestigious medical institutions.', color: '#3B82F6' },
    { icon: <Zap size={28}/>, title: 'Laser & Laparoscopic Surgery', desc: 'Equipped with the latest laser, PCNL, URS, and laparoscopic equipment for precise, minimally invasive procedures.', color: '#FF6C00' },
    { icon: <Heart size={28}/>, title: 'Patient-Centered Care', desc: 'We listen, we care, and we treat every patient as family. Your comfort and recovery are our top priorities.', color: '#E879A0' },
    { icon: <Star size={28}/>, title: `${doctors[0].surgeries} Procedures`, desc: `${doctors[0].experience}+ years of specialized urological experience with over ${doctors[0].surgeries} successful procedures and thousands of satisfied patients.`, color: '#8B5CF6' },
    { icon: <MapPin size={28}/>, title: 'Two Convenient Locations', desc: 'Two fully equipped clinics in Jaipur — Mansarovar and Sanganer — for maximum accessibility.', color: '#10B981' },
    { icon: <Shield size={28}/>, title: 'Safe & Affordable', desc: 'World-class urological care at transparent, affordable prices with flexible consultation timings.', color: '#F59E0B' },
  ];

  return (
    <div className="about-page">
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>About Us</div>
          <h1>Jaipur's Premier Urology Clinic</h1>
          <p>Expert, compassionate urological care by Dr. Mohit Sharma — MCh Urology, AIIMS Bhopal.</p>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>About</span>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container about-mission">
          <div className="about-mission__text">
            <div className="section-label">Who We Are</div>
            <h2>Urology Expertise You Can Trust</h2>
            <div className="divider divider-left"/>
            <p style={{marginBottom:'20px'}}>Urowala Clinic is Jaipur's dedicated urology centre, built around the expertise of <strong>Dr. Mohit Sharma</strong> — a Senior Urologist & Urological Surgeon trained at AIIMS, Bhopal. We combine cutting-edge surgical technology with compassionate, patient-centered care.</p>
            <p>Located at two convenient clinics in Jaipur — Mansarovar and Sanganer — we are dedicated to delivering world-class urological outcomes using minimally invasive laser and laparoscopic techniques.</p>
            <div style={{display:'flex',gap:'32px',marginTop:'32px',flexWrap:'wrap'}}>
              <div className="about-stat-block"><strong>{doctors[0].experience}+</strong><span>Years Experience</span></div>
              <div className="about-stat-block"><strong>{doctors[0].surgeries}</strong><span>Procedures Done</span></div>
              <div className="about-stat-block"><strong>2</strong><span>Clinic Locations</span></div>
            </div>
          </div>
          <div className="about-mission__visual">
            <div className="about-mission__img-card" style={{padding:0, overflow:'hidden', minHeight:'360px'}}>
              <img src="/clinic/doctor-hero.png" alt="Dr. Mohit Sharma - Urologist at Urowala Clinic"
                style={{width:'100%', height:'100%', objectFit:'cover', display:'block', minHeight:'360px'}}
                onError={(e) => {
                  e.target.style.display='none';
                  e.target.parentNode.innerHTML = `<div style='display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px;gap:16px;height:100%'><div style='color:#3B82F6;font-size:80px'>🏥</div><h3 style='margin:0'>Urowala Clinic</h3><p style='margin:0;color:#64748b'>Jaipur, Rajasthan</p><div style='display:flex;gap:24px;margin-top:16px'><div><strong style='color:#3B82F6;font-size:1.8rem'>${doctors[0].surgeries}</strong><br/><span style='color:#64748b'>Procedures</span></div><div><strong style='color:#FF6C00;font-size:1.8rem'>${doctors[0].experience}+</strong><br/><span style='color:#64748b'>Yrs Exp.</span></div></div></div>`;
                }}/>
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
      <section className="about-cta-section">
        <div className="about-cta-overlay"></div>
        <div className="container about-cta-inner">
          <h2 className="about-cta-title">Ready to Experience Expert Care?</h2>
          <p className="about-cta-desc">Book a consultation with our specialists today.</p>
          
          <div className="about-cta-btns">
            <Link to="/book-appointment" className="about-cta-btn-primary">
              Book Appointment <ArrowRight size={18} />
            </Link>
            <Link to="/doctors" className="about-cta-btn-secondary">
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
