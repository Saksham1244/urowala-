import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { useTranslation } from 'react-i18next';
import services from '../data/services.js';
import './Services.css';

export default function Services() {
  const { t } = useTranslation();
  const [active, setActive] = useState('all');
  const filtered = active === 'all' ? services : services.filter(s => s.id === Number(active));

  return (
    <div className="services-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>Urology Services</div>
          <h1>Our Comprehensive Services</h1>
          <p>Expert urological care covering the full spectrum of conditions and procedures.</p>
          <div className="page-hero__breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Services</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-filter">
            <button className={`filter-btn ${active==='all'?'active':''}`} onClick={()=>setActive('all')}>All Services</button>
            {services.map(s=><button key={s.id} className={`filter-btn ${active===String(s.id)?'active':''}`} onClick={()=>setActive(String(s.id))} style={active===String(s.id)?{borderColor:s.color,color:s.color,background:s.color+'15'}:{}}>{React.createElement(LucideIcons[s.icon], { size: 16 })} {s.title}</button>)}
          </div>
          <div className="services-detail-grid">
            {filtered.map(s=>(
              <div key={s.id} className="service-detail-card card">
                <div className="service-detail-card__header" style={{background: s.color+'15'}}>
                  <div className="service-detail-icon" style={{background:s.color+'25',color:s.color}}>{React.createElement(LucideIcons[s.icon], { size: 40 })}</div>
                  <div>
                    <h2>{s.title}</h2>
                    <p style={{color:'var(--text-muted)'}}>{s.shortDesc}</p>
                  </div>
                </div>
                <div className="service-detail-card__body">
                  <p>{s.description}</p>
                  <div className="service-detail-cols">
                    <div>
                      <h4>Symptoms We Address</h4>
                      <ul className="service-list">
                        {s.symptoms.map((sym,i)=><li key={i}><CheckCircle size={14} color="var(--primary)"/> {sym}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4>Procedures Available</h4>
                      <ul className="service-list service-list--accent">
                        {s.procedures.map((proc,i)=><li key={i}><ArrowRight size={14} color="var(--accent)"/> {proc}</li>)}
                      </ul>
                    </div>
                  </div>
                  <div className="service-detail-card__footer">
                    <span className="recovery-badge"><Clock size={14}/> Recovery: {s.recovery}</span>
                    <Link to={`/services/${s.slug}`} className="btn btn-primary btn-sm" style={{background:s.color}}>Learn More <ArrowRight size={14}/></Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
