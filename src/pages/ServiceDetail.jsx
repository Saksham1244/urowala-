import React, { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Phone, MessageCircle, ChevronDown, Calendar } from 'lucide-react';
import services from '../data/services.js';
import './ServiceDetail.css';

const faqs = {
  'kidney-stones': [
    { q: 'How long does kidney stone surgery take?', a: 'URS laser surgery typically takes 30-60 minutes. PCNL may take 60-90 minutes. Both are performed under anesthesia.' },
    { q: 'Will I need to stay in hospital?', a: 'URS is often a day procedure. PCNL may require 1-2 nights. Dr. Mohit Sharma will advise based on your stone size and location.' },
    { q: 'How can I prevent kidney stones from coming back?', a: 'Drink 2.5-3 litres of water daily, reduce salt intake, limit oxalate-rich foods, and follow Dr. Sharma\'s dietary recommendations.' },
  ],
  default: [
    { q: 'How do I book a consultation?', a: 'You can book via WhatsApp at +91 9039570761 or call our clinic directly. We offer consultations 7 days a week.' },
    { q: 'What should I bring to my first appointment?', a: 'Please bring any previous test reports, medication lists, and your ID. Arriving 10 minutes early is recommended.' },
    { q: 'Are the procedures covered by insurance?', a: 'Many procedures are covered by health insurance. Our team can help you with pre-authorization. Please call us for details.' },
  ],
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const service = services.find(s => s.slug === slug);
  const [openFaq, setOpenFaq] = useState(null);
  if (!service) return <Navigate to="/services" replace />;
  const faqList = faqs[slug] || faqs.default;

  return (
    <div className="service-detail-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>{service.icon} {service.title}</div>
          <h1>{service.title}</h1>
          <p>{service.shortDesc}</p>
          <div className="page-hero__breadcrumb"><Link to="/">Home</Link> <span>/</span> <Link to="/services">Services</Link> <span>/</span> <span>{service.title}</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container sd-layout">
          <div className="sd-main">
            <div className="sd-card card">
              <h2>Overview</h2>
              <p>{service.description}</p>

              <div className="sd-two-col">
                <div>
                  <h3>Symptoms We Treat</h3>
                  <ul className="sd-list">
                    {service.symptoms.map((s,i)=><li key={i}><CheckCircle size={16} color="var(--primary)"/> {s}</li>)}
                  </ul>
                </div>
                <div>
                  <h3>Available Procedures</h3>
                  <ul className="sd-list sd-list--accent">
                    {service.procedures.map((p,i)=><li key={i}><ArrowRight size={16} color="var(--accent)"/> {p}</li>)}
                  </ul>
                </div>
              </div>

              <div className="sd-recovery">
                <strong>Typical Recovery Time:</strong> {service.recovery}
              </div>
            </div>

            <div className="sd-card card" style={{marginTop:'32px'}}>
              <h2>Frequently Asked Questions</h2>
              <div className="faq-list">
                {faqList.map((faq,i)=>(
                  <div key={i} className="faq-item">
                    <button className="faq-question" onClick={()=>setOpenFaq(openFaq===i?null:i)}>
                      <span>{faq.q}</span>
                      <ChevronDown size={18} className={openFaq===i?'faq-arrow open':'faq-arrow'}/>
                    </button>
                    {openFaq===i && <div className="faq-answer">{faq.a}</div>}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sd-sidebar">
            <div className="sd-doctor-card card">
              <h4>Treated by</h4>
              <div className="sd-doctor">
                <div className="sd-doc-photo">MS</div>
                <div>
                  <strong>Dr. Mohit Sharma</strong>
                  <span>Chief Urology Surgeon</span>
                  <span>MBBS, MS, MCh Urology (AIIMS Bhopal)</span>
                </div>
              </div>
              <a href="https://wa.me/9039570761?text=I need a consultation for " className="btn btn-accent" style={{width:'100%',justifyContent:'center',marginTop:'16px'}} target="_blank" rel="noreferrer">
                <MessageCircle size={16}/> Book Consultation
              </a>
              <a href="tel:+91 90395 70761" className="btn" style={{width:'100%',justifyContent:'center',marginTop:'10px',background:'var(--primary-bg)',color:'var(--primary)'}}>
                <Phone size={16}/> +91 90395 70761
              </a>
            </div>
            <div className="sd-cta-card">
              <h4>Other Services</h4>
              {services.filter(s=>s.slug!==slug).map(s=>(
                <Link key={s.id} to={`/services/${s.slug}`} className="sd-other-service">
                  {s.icon} {s.title} <ArrowRight size={14}/>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
