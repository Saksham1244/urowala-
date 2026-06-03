import React from 'react';
import './InstagramBio.css';

const InstagramBio = () => {
  return (
    <div className="ig-container">
      <div className="ig-header">

        {/* Profile Picture */}
        <div className="ig-profile-pic">
          <img src="/doctors/mohit.jpg" alt="Dr. Mohit Sharma"
            onError={(e) => { e.target.src = ''; e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#3B82F6,#1e40af);color:white;font-size:2rem;font-weight:800">MS</div>'; }} />
        </div>

        {/* Username + Stats + Bio (desktop) */}
        <div className="ig-profile-info">

          {/* Row 1: Handle + Follow */}
          <div className="ig-username-row">
            <h2 className="ig-username">dr.mohit_urowala</h2>
            {/* Verified badge */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
              <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
              <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-follow-btn">
              Follow
            </a>
            <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-external-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>

          {/* Row 2: Stats */}
          <div className="ig-stats">
            <div className="ig-stat"><strong>87</strong><span>posts</span></div>
            <div className="ig-stat"><strong>21.7K</strong><span>followers</span></div>
            <div className="ig-stat"><strong>2</strong><span>following</span></div>
          </div>

          {/* Row 3: Bio */}
          <div className="ig-bio">
            <h1 className="ig-name">Dr. Mohit Sharma AIIMS</h1>
            <div className="ig-category">Urologist</div>
            <p className="ig-bio-text">
              Helping you understand Kidney & Urology health<br/>
              Stones | Prostate | UTIs | Men's health | Transplant<br/>
              AIIMS Bhopal
            </p>
            <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer" className="ig-link">
              🔗 wa.me/9039570761
            </a>
          </div>
        </div>
      </div>

      {/* Mobile-only bio block */}
      <div className="ig-bio-mobile">
        <h1 className="ig-name">Dr. Mohit Sharma AIIMS</h1>
        <div className="ig-category">Urologist</div>
        <p className="ig-bio-text">
          Helping you understand Kidney & Urology health<br/>
          Stones | Prostate | UTIs | Men's health | Transplant<br/>
          AIIMS Bhopal
        </p>
        <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer" className="ig-link">
          🔗 wa.me/9039570761
        </a>
      </div>

      {/* Story highlights */}
      <div className="ig-highlights">
        {[
          { label: 'Kidney', emoji: '🫘' },
          { label: 'Prostate', emoji: '🔬' },
          { label: 'UTI', emoji: '💧' },
          { label: 'Laser', emoji: '⚡' },
          { label: 'AIIMS', emoji: '🏥' },
        ].map((h, i) => (
          <a key={i} href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-highlight">
            <div className="ig-highlight-circle">
              <span>{h.emoji}</span>
            </div>
            <span className="ig-highlight-label">{h.label}</span>
          </a>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="ig-tabs">
        <div className="ig-tab active">
          <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>
          <span>POSTS</span>
        </div>
        <div className="ig-tab">
          <svg aria-label="" fill="currentColor" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>
          <span>REELS</span>
        </div>
      </div>

      {/* Post Grid — links to actual Instagram */}
      <div className="ig-grid">
        {[
          { bg: '#1e3a5f', emoji: '🦠', label: 'Urine Infection\n(UTI) Treatment' },
          { bg: '#0f2744', emoji: '🛡️', label: '100% Protection\nAgainst Proteus' },
          { bg: '#1a3a5c', emoji: '💊', label: 'Nitrofurantoin\nwith Alkapac' },
          { bg: '#3B82F6', emoji: '🫘', label: 'Kidney Stone\nLaser Surgery' },
          { bg: '#0f4c5c', emoji: '🔬', label: 'Prostate Health\nTips' },
          { bg: '#2d1b69', emoji: '⚡', label: 'PCNL\nProcedure' },
        ].map((post, i) => (
          <a key={i} href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-grid-item" style={{background: post.bg, textDecoration: 'none'}}>
            <div className="ig-grid-emoji">{post.emoji}</div>
            <div className="ig-grid-text">{post.label.split('\n').map((t,j) => <span key={j}>{t}<br/></span>)}</div>
            <div className="ig-grid-overlay">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </div>
          </a>
        ))}
      </div>

      <div style={{textAlign:'center', marginTop:'20px'}}>
        <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer"
          style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px',
          background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
          color:'white', borderRadius:'30px', fontWeight:700, textDecoration:'none', fontSize:'15px'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          View all 87 posts on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramBio;
