import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, Phone, Globe } from 'lucide-react';
import { api } from '../services/api';
import './Navbar.css';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const location = useLocation();
  const dropRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    // Fetch settings on mount
    api.settings.getAll().then(sets => {
      setShowGallery(sets['show_gallery'] === 'true');
    }).catch(console.error);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('urowala_lang', newLang);
  };

  const isActive = (path) => location.pathname === path;

  const services = [
    { name: 'Kidney Stones', path: '/services/kidney-stones' },
    { name: 'Prostate Conditions', path: '/services/prostate-conditions' },
    { name: 'Bladder Disorders', path: '/services/bladder-disorders' },
    { name: 'Male Health & Fertility', path: '/services/male-health' },
    { name: 'Urological Cancers', path: '/services/kidney-cancer' },
    { name: 'Urinary Tract Infections', path: '/services/urinary-tract' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <div className="navbar__inner container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            <img src="/logo.png" alt="Urowala Clinic" className="navbar__logo-img"
              onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} />
          </Link>

          {/* Desktop Nav */}
          <div className="navbar__links">
            <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
              {t('nav.home')}
            </Link>
            <Link to="/about" className={`navbar__link ${isActive('/about') ? 'navbar__link--active' : ''}`}>
              {t('nav.about')}
            </Link>

            {/* Services Dropdown */}
            <div className="navbar__dropdown" ref={dropRef}>
              <button
                className={`navbar__link navbar__link--drop ${location.pathname.startsWith('/services') ? 'navbar__link--active' : ''}`}
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                {t('nav.services')} <ChevronDown size={14} className={`drop-arrow ${servicesOpen ? 'open' : ''}`} />
              </button>
              {servicesOpen && (
                <div className="navbar__dropdown-menu">
                  {services.map(s => (
                    <Link key={s.path} to={s.path} className="navbar__dropdown-item"
                      onClick={() => setServicesOpen(false)}>
                      {s.name}
                    </Link>
                  ))}
                  <Link to="/procedures" className="navbar__dropdown-item navbar__dropdown-item--all"
                    onClick={() => setServicesOpen(false)}>
                    All Procedures →
                  </Link>
                </div>
              )}
            </div>

            <Link to="/doctors" className={`navbar__link ${isActive('/doctors') ? 'navbar__link--active' : ''}`}>
              {t('nav.doctors')}
            </Link>
            {showGallery && (
              <Link to="/gallery" className={`navbar__link ${isActive('/gallery') ? 'navbar__link--active' : ''}`}>
                {t('nav.gallery')}
              </Link>
            )}
            <Link to="/blog" className={`navbar__link ${isActive('/blog') ? 'navbar__link--active' : ''}`}>
              {t('nav.blog')}
            </Link>
            <Link to="/contact" className={`navbar__link ${isActive('/contact') ? 'navbar__link--active' : ''}`}>
              {t('nav.contact')}
            </Link>
          </div>

          {/* Actions */}
          <div className="navbar__actions">
            <button className="navbar__lang-btn" onClick={toggleLang} title="Toggle Language">
              <Globe size={16} />
              <span>{i18n.language === 'en' ? 'हिन्दी' : 'EN'}</span>
            </button>
            <a href="tel:+919414780777" className="navbar__phone">
              <Phone size={14} />
              <span>+91 94147 80777</span>
            </a>
            <Link to="/book-appointment" className="btn btn-primary btn-sm">
              {t('nav.bookAppointment')}
            </Link>
          </div>

          {/* Hamburger */}
          <button className="navbar__hamburger" onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'mobile-menu--open' : ''}`}>
        <div className="mobile-menu__header">
          <img src="/logo.png" alt="Urowala" className="navbar__logo-img"
            onError={(e) => { e.target.onerror = null; e.target.src = '/logo.svg'; }} />
          <button onClick={() => setMobileOpen(false)}><X size={24} /></button>
        </div>
        <nav className="mobile-menu__nav">
          <Link to="/" className="mobile-menu__link">{t('nav.home')}</Link>
          <Link to="/about" className="mobile-menu__link">{t('nav.about')}</Link>
          <div className="mobile-menu__section">
            <span className="mobile-menu__label">{t('nav.services')}</span>
            {services.map(s => (
              <Link key={s.path} to={s.path} className="mobile-menu__link mobile-menu__link--sub">
                {s.name}
              </Link>
            ))}
          </div>
          <Link to="/doctors" className="mobile-menu__link">{t('nav.doctors')}</Link>
          {showGallery && <Link to="/gallery" className="mobile-menu__link">{t('nav.gallery')}</Link>}
          <Link to="/blog" className="mobile-menu__link">{t('nav.blog')}</Link>
          <Link to="/experiences" className="mobile-menu__link">{t('nav.experiences')}</Link>
          <Link to="/contact" className="mobile-menu__link">{t('nav.contact')}</Link>
        </nav>
        <div className="mobile-menu__footer">
          <button className="btn btn-outline" onClick={toggleLang} style={{borderColor:'var(--primary)',color:'var(--primary)'}}>
            <Globe size={16} />
            {i18n.language === 'en' ? 'हिन्दी में देखें' : 'View in English'}
          </button>
          <Link to="/book-appointment" className="btn btn-primary" style={{width:'100%',justifyContent:'center'}}>
            {t('nav.bookAppointment')}
          </Link>
          <a href="tel:+919414780777" className="btn btn-accent" style={{width:'100%',justifyContent:'center'}}>
            <Phone size={16} /> +91 94147 80777
          </a>
        </div>
      </div>
      {mobileOpen && <div className="mobile-overlay" onClick={() => setMobileOpen(false)} />}
    </>
  );
};

export default Navbar;
