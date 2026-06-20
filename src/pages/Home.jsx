import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Phone, MessageCircle, Star, ArrowRight, CheckCircle, Users, Stethoscope, Heart, Award, MapPin, Calendar } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getMergedDoctors } from '../data/doctors.js';
import InstagramBio from '../components/InstagramBio.jsx';
import { getBlogsFromStorage } from '../data/blogs.js';
import { api } from '../services/api';
import { getServicesFromStorage } from '../data/services.js';
import './Home.css';

/* ── Animated Counter ── */
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        const num = parseInt(target.replace(/\D/g,''));
        let start = 0;
        const step = Math.ceil(num / 60);
        const timer = setInterval(() => {
          start += step;
          if (start >= num) { setCount(num); clearInterval(timer); }
          else setCount(start);
        }, 30);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count.toLocaleString('en-IN')}{suffix}</span>;
};

/* ── Main Home Page ── */
const Home = () => {
  const { t, i18n } = useTranslation();
  const doctors = getMergedDoctors();
  const [activeDoc, setActiveDoc] = useState(0);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    setServices(getServicesFromStorage());
    api.settings.getAll().then(res => {
      const visible = res.blog_visible === 'true';
      setShowBlog(visible);
      if (visible) {
        setBlogs(getBlogsFromStorage().filter(b => b.published).slice(0, 3));
      }
    }).catch(() => {});
  }, []);

  return (
    <div className="home">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero__bg"></div>
        <div className="hero__particles">
          {[...Array(6)].map((_,i) => <div key={i} className={`particle particle--${i+1}`}/>)}
        </div>
        <div className="container hero__new-layout">

          {/* ── Brand Block ── */}
          <div className="hero__brand-block">
            {/* Left: Logo */}
            <div className="hero__brand-left">
              <img src="/logo.png" alt="Urowala" className="hero__brand-logo"
                onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} />
            </div>
            {/* Centre: Name + tagline */}
            <div className="hero__brand-center">
              <span className="hero__brand-name">UROWALA</span>
              <span className="hero__brand-tagline">Advanced Care. Trusted Specialists.</span>
            </div>
            {/* Right: spacer */}
            <div className="hero__brand-right" />
          </div>

          {/* ── Main Headline ── */}
          <div className="hero__headline-block">
            <h1 className="hero__main-headline">
              Advanced Urology Care<br/>
              <span className="hero__headline-accent">You Can Trust</span>
            </h1>
            <p className="hero__main-sub">
              Expert surgical care by a urologist trained from <strong>AIIMS, Bhopal</strong>. {doctors[0].surgeries} successful procedures.
            </p>
          </div>

          {/* ── Single Doctor Card ── */}
          <div className="hero__doctors-row hero__doctors-row--center">
            <div className="hero__doc-card" style={{'--doc-color': doctors[0].color}}>
              <div className="hero__doc-card-photo" style={{borderColor: doctors[0].color, background: doctors[0].color + '22'}}>
                <img src={doctors[0].photo} alt={doctors[0].name}
                  onError={(e) => { e.target.style.display='none'; e.target.nextElementSibling.style.display='flex'; }}/>
                <div className="hero__doc-card-fallback" style={{background: doctors[0].color}}>{doctors[0].photoFallback}</div>
              </div>
              <div className="hero__doc-card-info">
                <strong>{doctors[0].name}</strong>
                <em style={{color: doctors[0].color}}>MCh Urology – AIIMS, Bhopal</em>
                <span>Senior Urologist & Urological Surgeon</span>
              </div>
            </div>
          </div>

          {/* ── CTA Row ── */}
          <div className="hero__cta-row">
            <a href="https://wa.me/9183570761" target="_blank" rel="noreferrer"
              className="btn btn-accent btn-lg hero__btn-wa">
              <MessageCircle size={20} /> Book Appointment
            </a>
            <Link to="/doctors" className="btn btn-white btn-lg">
              Meet Our Doctors <ArrowRight size={18}/>
            </Link>
            <div className="hero__inline-stats">
              <div><strong>{doctors[0].surgeries}</strong><span>Procedures</span></div>
              <div className="stat-divider"/>
              <div><strong>{doctors[0].experience}+</strong><span>Years Exp.</span></div>
              <div className="stat-divider"/>
              <div><strong>AIIMS</strong><span>Trained</span></div>
            </div>
          </div>

        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats-bar">
        <div className="container stats-bar__grid">
          {[
            { icon: <Award size={28}/>, value: doctors[0].experience.toString(), suffix: '+', label: t('stats.years') },
            { icon: <Stethoscope size={28}/>, value: doctors[0].surgeries.replace(/\D/g, ''), suffix: '+', label: 'Procedures' },
            { icon: <MapPin size={28}/>, value: '2', suffix: '', label: t('stats.locations') },
          ].map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSTAGRAM COMPACT ── */}
      <section className="section" style={{padding:'32px 0', background:'#fafafa'}}>
        <div className="container" style={{maxWidth:'860px'}}>
          <InstagramBio compact />
        </div>
      </section>

      {/* ── HIGHLIGHTED ACHIEVEMENTS ── */}
      <section className="section" style={{background: '#fff'}}>
        <div className="container">
          <div className="section-heading" style={{textAlign: 'center', marginBottom: '40px'}}>
            <div className="section-label">Achievements</div>
            <h2 style={{fontSize: '2rem'}}>Global Recognition & Awards</h2>
          </div>
          <div style={{display: 'flex', gap: '32px', flexWrap: 'wrap', justifyContent: 'center'}}>
            
            {/* Japan Photo */}
            <div style={{width: '320px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', background: '#fff', transition: 'transform 0.3s'}}>
              <div style={{height: '240px'}}>
                <img src="/achievements/jua-kyoto.jpg" alt="Japan Urology Association" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{padding: '24px'}}>
                <span style={{display: 'inline-block', padding: '4px 12px', background: 'var(--primary)', color: '#fff', fontSize: '12px', fontWeight: '600', borderRadius: '20px', marginBottom: '12px'}}>🌏 International</span>
                <h4 style={{fontSize: '18px', marginBottom: '8px', color: '#111'}}>Japan Urology Association (JUA) 2026</h4>
                <p style={{fontSize: '14px', color: '#666', lineHeight: '1.5'}}>Presenting research at the Annual Meeting of the Japan Urological Association in Kyoto, Japan.</p>
              </div>
            </div>

            {/* Best Paper Photo */}
            <div style={{width: '320px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(0,0,0,0.06)', background: '#fff', transition: 'transform 0.3s'}}>
              <div style={{height: '240px'}}>
                <img src="/achievements/recon-award.jpg" alt="RECON 2025 Award" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div style={{padding: '24px'}}>
                <span style={{display: 'inline-block', padding: '4px 12px', background: '#f59e0b', color: '#fff', fontSize: '12px', fontWeight: '600', borderRadius: '20px', marginBottom: '12px'}}>🏆 1st Prize</span>
                <h4 style={{fontSize: '18px', marginBottom: '8px', color: '#111'}}>RECON 2025 — Best Paper Award</h4>
                <p style={{fontSize: '14px', color: '#666', lineHeight: '1.5'}}>Receiving 1st Prize for Best Poster Presentation at RECON 2025, AIIMS Bhubaneswar.</p>
              </div>
            </div>

          </div>
          <div style={{textAlign: 'center', marginTop: '40px'}}>
            <Link to="/about" className="btn btn-primary btn-lg">View All Achievements <ArrowRight size={18} style={{marginLeft: '8px'}}/></Link>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="section about">
        <div className="container about__inner">
          <div className="about__image-col">
            <div className="about__img-wrap">
              <div className="about__img-main" style={{padding:0, overflow:'hidden'}}>
                <img src="/doctors/mohit-main.jpg" alt="Dr. Mohit Sharma"
                  style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
                  onError={(e) => { e.target.parentNode.classList.add('about__img-fallback'); e.target.style.display='none'; }}/>
                <div className="about__img-placeholder">
                  <Stethoscope size={64} color="var(--primary)"/>
                  <span>Urowala Clinic</span>
                </div>
              </div>
              <div className="about__img-badge">
                <Award size={20} color="var(--accent)"/>
                <div>
                  <strong>5+</strong>
                  <span>Years of Excellence</span>
                </div>
              </div>
            </div>
          </div>
          <div className="about__text-col">
            <div className="section-label">{t('about.label')}</div>
            <h2>{t('about.title')}</h2>
            <div className="divider divider-left"/>
            <p>{t('about.p1')}</p>
            <p style={{marginTop:'16px'}}>{t('about.p2')}</p>
            <div className="about__reasons">
              <h4>{t('about.why')}</h4>
              <div className="about__reasons-grid">
                {t('about.reasons', {returnObjects:true}).map((r,i) => (
                  <div key={i} className="about__reason">
                    <CheckCircle size={16} color="var(--primary)"/>
                    <span>{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <Link to="/about" className="btn btn-primary" style={{marginTop:'28px'}}>
              {t('about.cta')} <ArrowRight size={16}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHAT WE TREAT ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">{t('specialties.label')}</div>
            <h2>Conditions We Treat</h2>
            <p>Dr. Mohit Sharma specializes in the full spectrum of urological conditions with minimally invasive techniques.</p>
          </div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'16px', marginTop:'40px'}}>
            {[
              { icon: '🫘', label: 'Kidney Stones', sub: 'URS Laser · PCNL', path: '/services/kidney-stones' },
              { icon: '🔬', label: 'Prostate (BPH)', sub: 'TURP · Laser Surgery', path: '/services/prostate-conditions' },
              { icon: '💧', label: 'Bladder Issues', sub: 'Cystoscopy · TURBT', path: '/services/bladder-disorders' },
              { icon: '⚡', label: 'Kidney Cancer', sub: 'Laparoscopic Surgery', path: '/services/kidney-cancer' },
              { icon: '♂️', label: 'Male Health', sub: 'Varicocele · Andrology', path: '/services/male-health' },
              { icon: '🦠', label: 'Urinary Infections', sub: 'UTI · Stricture', path: '/services/urinary-tract' },
              { icon: '✂️', label: 'Circumcision', sub: 'Minimally Invasive', path: '/procedures' },
              { icon: '🔭', label: 'Laparoscopy', sub: 'Kidney · Adrenal', path: '/procedures' },
            ].map((item, i) => (
              <Link to={item.path} key={i} style={{
                display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                background:'white', borderRadius:'16px', padding:'28px 16px', textAlign:'center',
                textDecoration:'none', color:'inherit', border:'1.5px solid #e2e8f0',
                transition:'all 0.25s ease', gap:'8px',
                boxShadow:'0 2px 8px rgba(0,0,0,0.04)'
              }}
              onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'}
              onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                <span style={{fontSize:'2rem'}}>{item.icon}</span>
                <strong style={{fontSize:'14px', color:'var(--text-dark)'}}>{item.label}</strong>
                <span style={{fontSize:'12px', color:'var(--primary)', fontWeight:600}}>{item.sub}</span>
              </Link>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:'32px'}}>
            <Link to="/services" className="btn btn-primary">View All Services <ArrowRight size={16}/></Link>
          </div>
        </div>
      </section>

      {/* ── UROLOGY SERVICES ── */}
      <section className="section services-preview">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">{t('services.label')}</div>
            <h2>{t('services.title')}</h2>
            <p>{t('services.subtitle')}</p>
          </div>
          <div className="services-tags">
            {services.map(s => (
              <Link to={`/services/${s.slug}`} key={s.id} className="pill-tag">
                {React.createElement(LucideIcons[s.icon], { size: 16 })} {s.title}
              </Link>
            ))}
          </div>
          <div className="services-grid grid-3">
            {services.map(s => (
              <Link to={`/services/${s.slug}`} key={s.id} className="service-card card">
                <div className="service-card__icon" style={{background: s.color + '18', color: s.color}}>
                  {React.createElement(LucideIcons[s.icon], { size: 32 })}
                </div>
                <h4>{s.title}</h4>
                <p>{s.shortDesc}</p>
                <span className="service-card__link" style={{color: s.color}}>
                  {t('services.learnMore')} <ArrowRight size={14}/>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOCTOR ── */}
      <section className="section section-alt doctors-section">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">{t('doctors.label')}</div>
            <h2>{t('doctors.title')}</h2>
            <p>{t('doctors.subtitle')}</p>
          </div>
          {doctors.map((doc) => (
            <div key={doc.id} className="doctor-card-h" style={{borderTop: `4px solid ${doc.color}`}}>
              <div className="doctor-card-h__photo-col">
                <div className="doctor-card-h__photo-wrap" style={{borderColor: doc.color + '55'}}>
                  <img src={doc.photo} alt={doc.name} className="doctor-card-h__photo"
                    onError={(e) => {
                      e.target.style.display='none';
                      e.target.nextElementSibling.style.display='flex';
                    }}/>
                  <div className="doctor-card-h__photo-fallback" style={{background: doc.color}}>{doc.photoFallback}</div>
                </div>
                <div className="doctor-card-h__badge" style={{background: doc.color}}>{doc.specialty}</div>
              </div>
              <div className="doctor-card-h__info">
                <div className="doctor-card-h__top">
                  <div>
                    <h3 className="doctor-card-h__name">{doc.name}</h3>
                    <p className="doctor-card-h__title" style={{color: doc.color}}>{doc.title}</p>
                    <p className="doctor-card-h__qual">{doc.qualifications}</p>
                  </div>
                  <div className="doctor-card-h__stats">
                    <div className="doc-stat-h"><strong>{doc.experience}+</strong><span>Yrs Exp.</span></div>
                    {doc.surgeries && <div className="doc-stat-h"><strong>{doc.surgeries}</strong><span>Procedures</span></div>}
                  </div>
                </div>
                {doc.bio && <p className="doctor-card-h__bio">{doc.bio}</p>}
                {doc.conditions && (
                  <div className="doctor-card-h__conditions">
                    <strong>Conditions Treated:</strong>
                    <div className="doctor-card-h__cond-grid">
                      {doc.conditions.slice(0, 6).map((c, i) => (
                        <span key={i} className="cond-pill" style={{background: doc.color + '15', color: doc.color, border: `1px solid ${doc.color}33`}}>✓ {c}</span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="doctor-card-h__certs">
                  {doc.certifications.map((c,i) => (
                    <span key={i} className="cert-badge" style={{background: doc.color + '18', color: doc.color}}>✓ {c}</span>
                  ))}
                </div>
                <div className="doctor-card-h__actions">
                  <a href={`https://wa.me/9183570761?text=I want to book an appointment with ${doc.name}`}
                    target="_blank" rel="noreferrer"
                    className="btn btn-primary" style={{background: doc.color}}>
                    <Calendar size={16}/> Book Appointment
                  </a>
                  <Link to="/doctors" className="btn btn-sm" style={{background: doc.color + '15', color: doc.color, padding:'12px 24px'}}>
                    Full Profile →
                  </Link>
                  <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer"
                    className="btn btn-sm" style={{background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)', color:'white', padding:'12px 20px'}}>
                    📸 Instagram
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>





      {/* ── BLOG PREVIEW — only shown when admin enables it ── */}
      {showBlog && blogs.length > 0 && (
        <section className="section section-alt blog-preview">
          <div className="container">
            <div className="section-heading" style={{display:'flex',alignItems:'flex-end',justifyContent:'space-between',textAlign:'left',maxWidth:'100%'}}>
              <div>
                <div className="section-label">{t('blog.label')}</div>
                <h2>{t('blog.title')}</h2>
              </div>
              <Link to="/blog" className="btn btn-primary">{t('blog.viewAll')} <ArrowRight size={16}/></Link>
            </div>
            <div className="blog-grid grid-3">
              {blogs.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-card card">
                  <div className="blog-card__img" style={{background: blog.coverFallbackColor + '22'}}>
                    <img src={blog.coverImage} alt={blog.title}
                      onError={(e) => { e.target.style.display='none'; }}/>
                    <div className="blog-card__category">{blog.category}</div>
                  </div>
                  <div className="blog-card__body">
                    <div className="blog-card__meta">
                      <span>{blog.date}</span>
                      <span>·</span>
                      <span>{blog.readTime} {t('blog.minRead')}</span>
                    </div>
                    <h4>{blog.title}</h4>
                    <p>{blog.excerpt}</p>
                    <div className="blog-card__author">
                      <div className="blog-author-dot"/>
                      <span>{blog.author}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="appt-cta">
        <div className="container appt-cta__inner">
          <div className="appt-cta__text">
            <div className="section-label" style={{color:'rgba(255,255,255,0.9)',background:'rgba(255,255,255,0.15)'}}>
              {t('appointment.label')}
            </div>
            <h2 style={{color:'white'}}>{t('appointment.title')}</h2>
            <p style={{color:'rgba(255,255,255,0.8)'}}>{t('appointment.subtitle')}</p>
          </div>
          <div className="appt-cta__actions">
            <a href="https://wa.me/9183570761" target="_blank" rel="noreferrer"
              className="btn btn-white btn-lg">
              <MessageCircle size={20}/> {t('appointment.cta')}
            </a>
            <a href="tel:+91 90395 70761" className="btn btn-outline btn-lg">
              <Phone size={20}/> {t('appointment.call')}
            </a>
          </div>
        </div>
        {/* Decorative */}
        <div className="appt-cta__deco appt-cta__deco--1"/>
        <div className="appt-cta__deco appt-cta__deco--2"/>
      </section>
    </div>
  );
};

export default Home;


