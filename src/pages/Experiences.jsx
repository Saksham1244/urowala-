import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Star, CheckCircle, MessageCircle, Heart, ArrowRight, Phone } from 'lucide-react';
import testimonials from '../data/testimonials.js';
import './Experiences.css';

export default function Experiences() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? testimonials : testimonials.filter(t => t.doctor.toLowerCase().includes(filter));

  return (
    <div className="experiences-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>
            <Heart size={14}/> Patient Stories
          </div>
          <h1>Real Stories. Real Results.</h1>
          <p>Hear from the thousands of patients who trusted Urowala Clinic with their health and wellbeing.</p>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Patient Stories</span>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <section className="exp-trust section-sm">
        <div className="container exp-trust__grid">
          {[
            { icon: '⭐', value: '4.9/5', label: 'Average Rating' },
            { icon: '👥', value: '3,00,000+', label: 'Happy Patients' },
            { icon: '✅', value: '7,000+', label: 'Successful Surgeries' },
            { icon: '🏥', value: '10+', label: 'Years of Excellence' },
          ].map((stat, i) => (
            <div key={i} className="exp-trust__item">
              <div className="exp-trust__icon">{stat.icon}</div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="section">
        <div className="container">
          <div className="exp-filter">
            <button className={`filter-btn ${filter==='all'?'active':''}`} onClick={()=>setFilter('all')}>All Stories</button>
            <button className={`filter-btn ${filter==='mohit'?'active':''}`} onClick={()=>setFilter('mohit')}>Dr. Mohit (Urology)</button>
            <button className={`filter-btn ${filter==='priyanka'?'active':''}`} onClick={()=>setFilter('priyanka')}>Dr. Priyanka (Dermatology)</button>
            <button className={`filter-btn ${filter==='rahul'?'active':''}`} onClick={()=>setFilter('rahul')}>Dr. Rahul (Plastic Surgery)</button>
          </div>

          <div className="exp-grid">
            {filtered.map(item => (
              <div key={item.id} className="exp-card card">
                <div className="exp-card__stars">
                  {[...Array(item.rating)].map((_,i) => (
                    <Star key={i} size={18} fill="#F59E0B" color="#F59E0B"/>
                  ))}
                </div>
                <p className="exp-card__text">"{item.text}"</p>
                <div className="exp-card__footer">
                  <div className="exp-avatar" style={{background: item.avatarColor}}>
                    {item.avatar}
                  </div>
                  <div className="exp-author">
                    <strong>{item.name}</strong>
                    <span>{item.location}</span>
                    <span className="exp-treatment">
                      <CheckCircle size={12} color="var(--primary)"/> {item.treatment}
                    </span>
                  </div>
                </div>
                <div className="exp-card__doctor-tag" style={{background:'rgba(65,184,201,0.1)',color:'var(--primary-dark)'}}>
                  Treated by {item.doctor} · {item.date}
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Story */}
          <div className="exp-share-cta">
            <div>
              <h3>Had a great experience at Urowala?</h3>
              <p>We'd love to hear your story and share it to help other patients make informed decisions.</p>
            </div>
            <a href="https://wa.me/9039570761?text=I want to share my experience at Urowala Clinic"
              target="_blank" rel="noreferrer" className="btn btn-accent">
              <MessageCircle size={16}/> Share Your Story
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{background:'var(--primary-bg)'}}>
        <div className="container" style={{textAlign:'center'}}>
          <h2>Join Our Growing Family of Satisfied Patients</h2>
          <p style={{marginBottom:'32px',maxWidth:'500px',margin:'16px auto 32px'}}>
            Experience the same world-class care that thousands of patients trust.
          </p>
          <div style={{display:'flex',gap:'16px',justifyContent:'center',flexWrap:'wrap'}}>
            <Link to="/book-appointment" className="btn btn-primary btn-lg">
              Book an Appointment <ArrowRight size={18}/>
            </Link>
            <a href="tel:+919414780777" className="btn btn-lg" style={{background:'white',color:'var(--text-dark)',boxShadow:'var(--shadow-sm)'}}>
              <Phone size={18}/> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
