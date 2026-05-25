import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Phone, MessageCircle, Star, ArrowRight, CheckCircle, Users, Stethoscope, Heart, Award, MapPin, Calendar } from 'lucide-react';
import doctors from '../data/doctors.js';
import testimonials from '../data/testimonials.js';
import { getBlogsFromStorage } from '../data/blogs.js';
import { api } from '../services/api';
import services from '../data/services.js';
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

/* ── Testimonial Carousel ── */
const TestimonialCarousel = ({ items }) => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % items.length), 4500);
    return () => clearInterval(timer);
  }, [items.length]);
  const item = items[idx];
  return (
    <div className="testimonial-carousel">
      <div className="testimonial-card" key={idx}>
        <div className="testimonial-stars">
          {[...Array(item.rating)].map((_,i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B"/>)}
        </div>
        <p className="testimonial-text">"{item.text}"</p>
        <div className="testimonial-author">
          <div className="testimonial-avatar" style={{background: item.avatarColor}}>
            {item.avatar}
          </div>
          <div>
            <strong>{item.name}</strong>
            <span>{item.location} · {item.treatment}</span>
          </div>
        </div>
        <div className="testimonial-tag">{item.doctor}</div>
      </div>
      <div className="testimonial-dots">
        {items.map((_,i) => (
          <button key={i} className={`dot ${i===idx?'dot--active':''}`} onClick={() => setIdx(i)} />
        ))}
      </div>
    </div>
  );
};

/* ── Main Home Page ── */
const Home = () => {
  const { t } = useTranslation();
  const [activeDoc, setActiveDoc] = useState(0);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    api.settings.getAll().then(res => {
      const visible = res.data?.blog_visible === 'true';
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
        <div className="container hero__inner">
          <div className="hero__content">
            <div className="hero__badge">
              <div className="hero__badge-dot" />
              {t('hero.badge')}
            </div>
            <h1 className="hero__title">
              <span>{t('hero.title1')}</span><br/>
              <span className="hero__title-accent">{t('hero.title2')}</span>
            </h1>
            <p className="hero__subtitle">{t('hero.subtitle')}</p>
            <div className="hero__actions">
              <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer"
                className="btn btn-accent btn-lg hero__btn-wa">
                <MessageCircle size={20} /> {t('hero.cta1')}
              </a>
              <Link to="/doctors" className="btn btn-white btn-lg">
                {t('hero.cta2')} <ArrowRight size={18}/>
              </Link>
            </div>
            <div className="hero__mini-stats">
              <div><strong>2,000+</strong><span>Surgeries</span></div>
              <div className="stat-divider"/>
              <div><strong>3,00,000+</strong><span>Treatments</span></div>
              <div className="stat-divider"/>
              <div><strong>10+</strong><span>Years Exp.</span></div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__card hero__card--main">
              <div className="hero__doctors-carousel">
                {doctors.map((doc, i) => (
                  <div key={doc.id} className={`hero__doc-item ${i === activeDoc ? 'hero__doc-item--active' : ''}`}>
                    <div className="hero__doc-photo" style={{background: doc.color + '22', borderColor: doc.color}}>
                      <img src={doc.photo} alt={doc.name}
                        onError={(e) => {
                          e.target.style.display='none';
                          e.target.nextElementSibling.style.display='flex';
                        }}/>
                      <div className="hero__doc-fallback" style={{background: doc.color, display:'none'}}>
                        {doc.photoFallback}
                      </div>
                    </div>
                    <div className="hero__doc-info">
                      <strong>{doc.name}</strong>
                      <span>{doc.title}</span>
                      <div className="hero__doc-badge" style={{background: doc.color + '22', color: doc.color}}>
                        {doc.specialty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="hero__doc-tabs">
                {doctors.map((doc, i) => (
                  <button key={doc.id} className={`hero__doc-tab ${i===activeDoc?'active':''}`}
                    style={i===activeDoc?{background:doc.color,borderColor:doc.color}:{}}
                    onClick={() => setActiveDoc(i)} />
                ))}
              </div>
            </div>
            <div className="hero__floating-card hero__floating-card--1">
              <CheckCircle size={18} color="var(--primary)"/>
              <div>
                <strong>Board Certified</strong>
                <span>All 3 Specialists</span>
              </div>
            </div>
            <div className="hero__floating-card hero__floating-card--2">
              <MapPin size={18} color="var(--accent)"/>
              <div>
                <strong>2 Locations</strong>
                <span>Jaipur, Rajasthan</span>
              </div>
            </div>
          </div>
        </div>
        <a href="#about" className="hero__scroll">
          <ChevronDown size={22}/>
          <span>{t('hero.scroll')}</span>
        </a>
      </section>

      {/* ── STATS BAR ── */}
      <section className="stats-bar">
        <div className="container stats-bar__grid">
          {[
            { icon: <Award size={28}/>, value: '10', suffix: '+', label: t('stats.years') },
            { icon: <Users size={28}/>, value: '3', suffix: '', label: t('stats.doctors') },
            { icon: <Heart size={28}/>, value: '300000', suffix: '+', label: t('stats.patients') },
            { icon: <Stethoscope size={28}/>, value: '7000', suffix: '+', label: t('stats.surgeries') },
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

      {/* ── ABOUT ── */}
      <section id="about" className="section about">
        <div className="container about__inner">
          <div className="about__image-col">
            <div className="about__img-wrap">
              <div className="about__img-main">
                <img src="/clinic/about.jpg" alt="Urowala Clinic"
                  onError={(e) => { e.target.parentNode.classList.add('about__img-fallback'); e.target.style.display='none'; }}/>
                <div className="about__img-placeholder">
                  <Stethoscope size={64} color="var(--primary)"/>
                  <span>Urowala Clinic</span>
                </div>
              </div>
              <div className="about__img-badge">
                <Award size={20} color="var(--accent)"/>
                <div>
                  <strong>10+</strong>
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

      {/* ── SPECIALTIES ── */}
      <section className="section section-alt specialties">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">{t('specialties.label')}</div>
            <h2>{t('specialties.title')}</h2>
            <p>{t('specialties.subtitle')}</p>
          </div>
          <div className="specialties__grid">
            {[
              { key:'urology', icon:'🫁', color:'#3B82F6', path:'/services', doctor: doctors[0] },
              { key:'derm', icon:'✨', color:'#E879A0', path:'/doctors', doctor: doctors[1] },
              { key:'plastic', icon:'🏥', color:'#8B5CF6', path:'/doctors', doctor: doctors[2] },
            ].map(sp => (
              <Link to={sp.path} key={sp.key} className="specialty-card card">
                <div className="specialty-card__icon" style={{background: sp.color + '18', color: sp.color}}>
                  <span>{sp.icon}</span>
                </div>
                <h3>{t(`specialties.${sp.key}.name`)}</h3>
                <p>{t(`specialties.${sp.key}.desc`)}</p>
                <div className="specialty-card__doctor">
                  <div className="specialty-doc-avatar" style={{background: sp.color + '22', borderColor: sp.color}}>
                    <img src={sp.doctor.photo} alt={sp.doctor.name}
                      onError={(e) => {
                        e.target.style.display='none';
                        e.target.nextElementSibling.style.display='flex';
                      }}/>
                    <div style={{display:'none', background:sp.color}} className="doc-avatar-fallback">
                      {sp.doctor.photoFallback}
                    </div>
                  </div>
                  <div>
                    <strong>{sp.doctor.name}</strong>
                    <span>{sp.doctor.title}</span>
                  </div>
                </div>
                <div className="specialty-card__arrow" style={{color: sp.color}}>
                  Learn More <ArrowRight size={14}/>
                </div>
              </Link>
            ))}
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
                {s.icon} {s.title}
              </Link>
            ))}
          </div>
          <div className="services-grid grid-3">
            {services.map(s => (
              <Link to={`/services/${s.slug}`} key={s.id} className="service-card card">
                <div className="service-card__icon" style={{background: s.color + '18', color: s.color}}>
                  <span className="service-icon-emoji">{s.icon}</span>
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

      {/* ── DOCTORS ── */}
      <section className="section section-alt doctors-section">
        <div className="container">
          <div className="section-heading">
            <div className="section-label">{t('doctors.label')}</div>
            <h2>{t('doctors.title')}</h2>
            <p>{t('doctors.subtitle')}</p>
          </div>
          <div className="doctors-grid">
            {doctors.map((doc) => (
              <div key={doc.id} className="doctor-card card">
                <div className="doctor-card__photo-wrap" style={{borderColor: doc.color + '44'}}>
                  <img src={doc.photo} alt={doc.name} className="doctor-card__photo"
                    onError={(e) => {
                      e.target.style.display='none';
                      e.target.nextElementSibling.style.display='flex';
                    }}/>
                  <div className="doctor-card__photo-fallback" style={{background: doc.color, display:'none'}}>
                    {doc.photoFallback}
                  </div>
                  <div className="doctor-card__specialty-badge" style={{background: doc.color}}>
                    {doc.specialty}
                  </div>
                </div>
                <div className="doctor-card__body">
                  <h3 className="doctor-card__name">{doc.name}</h3>
                  <p className="doctor-card__title">{doc.title}</p>
                  <p className="doctor-card__qual">{doc.qualifications}</p>
                  <div className="doctor-card__stats">
                    <div className="doc-stat">
                      <strong>{doc.experience}+</strong>
                      <span>Yrs Exp.</span>
                    </div>
                    {doc.surgeries && (
                      <div className="doc-stat">
                        <strong>{doc.surgeries}</strong>
                        <span>Surgeries</span>
                      </div>
                    )}
                    {doc.treatments && (
                      <div className="doc-stat">
                        <strong>{doc.treatments}</strong>
                        <span>Treatments</span>
                      </div>
                    )}
                  </div>
                  <div className="doctor-card__certs">
                    {doc.certifications.map((c,i) => (
                      <span key={i} className="cert-badge" style={{background: doc.color + '18', color: doc.color}}>
                        ✓ {c}
                      </span>
                    ))}
                  </div>
                  <div className="doctor-card__actions">
                    <a href={`https://wa.me/9039570761?text=I want to book an appointment with ${doc.name}`}
                      target="_blank" rel="noreferrer"
                      className="btn btn-primary btn-sm" style={{flex:1, justifyContent:'center', background: doc.color}}>
                      <Calendar size={14}/> Book
                    </a>
                    <Link to={`/doctors`} className="btn btn-sm" style={{flex:1, justifyContent:'center', background: doc.color + '15', color: doc.color}}>
                      Profile
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="container">
          <div className="testimonials__inner">
            <div className="testimonials__left">
              <div className="section-label">{t('testimonials.label')}</div>
              <h2>{t('testimonials.title')}</h2>
              <div className="divider divider-left"/>
              <p>{t('testimonials.subtitle')}</p>
              <div className="testimonials__trust">
                <div className="trust-item">
                  <Star size={20} fill="#F59E0B" color="#F59E0B"/>
                  <span><strong>4.9/5</strong> Average Rating</span>
                </div>
                <div className="trust-item">
                  <CheckCircle size={20} color="var(--primary)"/>
                  <span><strong>300,000+</strong> Happy Patients</span>
                </div>
              </div>
              <Link to="/experiences" className="btn btn-primary" style={{marginTop:'24px'}}>
                View All Stories <ArrowRight size={16}/>
              </Link>
            </div>
            <div className="testimonials__right">
              <TestimonialCarousel items={testimonials} />
            </div>
          </div>
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
            <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer"
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
