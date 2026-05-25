import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import './Procedures.css';

const procedures = [
  {
    id: 1,
    name: 'URS (Ureteroscopy) with Laser Lithotripsy',
    category: 'Stone Surgery',
    icon: '💎',
    color: '#3B82F6',
    desc: 'The gold standard for treating kidney and ureteral stones. A thin flexible ureteroscope is passed through the urinary tract to reach the stone, which is then fragmented using a laser.',
    expect: 'Performed under spinal/general anesthesia. Duration: 30–60 minutes. A ureteral stent may be placed temporarily.',
    recovery: '1–3 days',
    anesthesia: 'Spinal / General',
    hospital: 'Day procedure or overnight',
  },
  {
    id: 2,
    name: 'PCNL (Percutaneous Nephrolithotomy)',
    category: 'Stone Surgery',
    icon: '🔬',
    color: '#8B5CF6',
    desc: 'Minimally invasive surgery for large (>2cm) kidney stones. A small puncture in the back allows direct access to remove stones through a nephroscope.',
    expect: 'Performed under general anesthesia. A temporary nephrostomy tube may be placed. Duration: 60–120 minutes.',
    recovery: '2–4 days in hospital, 1–2 weeks overall',
    anesthesia: 'General',
    hospital: '2–3 nights',
  },
  {
    id: 3,
    name: 'TURP (Transurethral Resection of Prostate)',
    category: 'Prostate Surgery',
    icon: '⚕️',
    color: '#10B981',
    desc: 'The most effective surgical treatment for an enlarged prostate (BPH). Using laser or resectoscope, obstructing prostate tissue is removed to restore normal urine flow.',
    expect: 'No external cuts. Performed through the urethra. Dramatic improvement in urine flow after recovery.',
    recovery: '1–2 days hospital, 2–3 weeks overall',
    anesthesia: 'Spinal / General',
    hospital: '1–2 nights',
  },
  {
    id: 4,
    name: 'Laparoscopic / Robotic Surgery',
    category: 'Minimally Invasive',
    icon: '🤖',
    color: '#F59E0B',
    desc: 'Advanced minimally invasive approach for kidney, prostate and bladder surgeries. 3–4 small cuts instead of a large incision, resulting in faster recovery and less pain.',
    expect: 'Camera and instruments inserted through small ports. Precise, minimal blood loss. Scar barely visible.',
    recovery: '3–5 days hospital, 2–3 weeks overall',
    anesthesia: 'General',
    hospital: '2–4 nights',
  },
  {
    id: 5,
    name: 'Cystoscopy',
    category: 'Diagnostic & Therapeutic',
    icon: '🩺',
    color: '#06B6D4',
    desc: 'A thin, lighted camera (cystoscope) is passed through the urethra to examine the bladder and urethra. Used for diagnosis and some treatments.',
    expect: 'Typically performed with local anesthesia. Mild discomfort. Duration: 10–20 minutes.',
    recovery: 'Same day / Outpatient',
    anesthesia: 'Local / Spinal',
    hospital: 'Day procedure',
  },
  {
    id: 6,
    name: 'Circumcision',
    category: 'Male Health',
    icon: '🏥',
    color: '#EF4444',
    desc: 'Surgical removal of the foreskin of the penis. Performed for medical reasons (phimosis, recurrent infections) or personal preference.',
    expect: 'Short outpatient procedure. Laser-assisted technique available for minimal bleeding and faster healing.',
    recovery: '7–10 days',
    anesthesia: 'Local / General',
    hospital: 'Day procedure',
  },
  {
    id: 7,
    name: 'Varicocelectomy',
    category: 'Male Fertility',
    icon: '👨‍⚕️',
    color: '#2563EB',
    desc: 'Surgical treatment for varicocele (enlarged veins in the scrotum) which can cause male infertility and testicular pain. Microsurgical approach for best results.',
    expect: 'Small incision in the groin. Outpatient procedure. Significant improvement in sperm parameters within 3–6 months.',
    recovery: '3–5 days',
    anesthesia: 'General',
    hospital: 'Day procedure',
  },
  {
    id: 8,
    name: 'Hydrocelectomy',
    category: 'Male Health',
    icon: '🩻',
    color: '#7C3AED',
    desc: 'Surgical treatment of hydrocele — a collection of fluid around the testicle causing scrotal swelling. Simple, effective procedure with excellent outcomes.',
    expect: 'Small incision in the scrotum. Fluid drained and sac removed/stitched. Outpatient surgery.',
    recovery: '3–5 days',
    anesthesia: 'Spinal / General',
    hospital: 'Day procedure',
  },
];

const categories = ['All', ...new Set(procedures.map(p => p.category))];

export default function Procedures() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [openId, setOpenId] = useState(null);

  const filtered = activeCategory === 'All'
    ? procedures
    : procedures.filter(p => p.category === activeCategory);

  return (
    <div className="procedures-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>
            Our Procedures
          </div>
          <h1>Urology Procedures</h1>
          <p>World-class minimally invasive surgical and non-surgical procedures performed by expert urologists.</p>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Procedures</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container proc-layout">
          {/* Sidebar */}
          <aside className="proc-sidebar">
            <div className="proc-sidebar__card">
              <h4>Procedure Categories</h4>
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`proc-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                  <ArrowRight size={14}/>
                </button>
              ))}
            </div>
            <div className="proc-sidebar__cta">
              <h4>Have Questions?</h4>
              <p>Our team is happy to explain any procedure in detail.</p>
              <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer"
                className="btn btn-accent" style={{width:'100%',justifyContent:'center'}}>
                <MessageCircle size={16}/> Ask on WhatsApp
              </a>
              <a href="tel:+91 90395 70761"
                className="btn" style={{width:'100%',justifyContent:'center',marginTop:'10px',background:'var(--primary-bg)',color:'var(--primary)'}}>
                <Phone size={16}/> Call Us
              </a>
            </div>
          </aside>

          {/* Main Content */}
          <main className="proc-main">
            <p className="proc-result-count">{filtered.length} procedure{filtered.length !== 1 ? 's' : ''} found</p>
            <div className="proc-list">
              {filtered.map(proc => (
                <div key={proc.id} className={`proc-item card ${openId === proc.id ? 'proc-item--open' : ''}`}>
                  <button
                    className="proc-item__header"
                    onClick={() => setOpenId(openId === proc.id ? null : proc.id)}
                  >
                    <div className="proc-item__left">
                      <div className="proc-icon" style={{background: proc.color + '18', color: proc.color}}>
                        <span>{proc.icon}</span>
                      </div>
                      <div>
                        <h3>{proc.name}</h3>
                        <span className="proc-category-tag" style={{background: proc.color + '18', color: proc.color}}>
                          {proc.category}
                        </span>
                      </div>
                    </div>
                    <div className="proc-item__right">
                      <div className="proc-meta">
                        <span>Recovery: <strong>{proc.recovery}</strong></span>
                      </div>
                      <ChevronDown size={20} className={`proc-arrow ${openId === proc.id ? 'open' : ''}`}/>
                    </div>
                  </button>
                  {openId === proc.id && (
                    <div className="proc-item__body">
                      <p className="proc-desc">{proc.desc}</p>
                      <div className="proc-detail-grid">
                        <div className="proc-detail-item">
                          <h4>What to Expect</h4>
                          <p>{proc.expect}</p>
                        </div>
                        <div className="proc-detail-item">
                          <h4>Key Facts</h4>
                          <ul>
                            <li><strong>Anesthesia:</strong> {proc.anesthesia}</li>
                            <li><strong>Hospital Stay:</strong> {proc.hospital}</li>
                            <li><strong>Recovery Time:</strong> {proc.recovery}</li>
                          </ul>
                        </div>
                      </div>
                      <a href={`https://wa.me/9039570761?text=I want to know more about ${proc.name}`}
                        target="_blank" rel="noreferrer"
                        className="btn btn-primary btn-sm">
                        <MessageCircle size={14}/> Book Consultation for {proc.name}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}
