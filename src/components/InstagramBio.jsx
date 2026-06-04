import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import './InstagramBio.css';

// ── Fallback static posts (shown if API fails) ────────────────────────────────
const STATIC_POSTS = [
  { id: 1, imageUrl: null, emoji: '🦠', label: 'Urine Infection\n(UTI) Treatment', bg: '#1e3a5f' },
  { id: 2, imageUrl: null, emoji: '🫘', label: 'Kidney Stone\nLaser Surgery', bg: '#3B82F6' },
  { id: 3, imageUrl: null, emoji: '🔬', label: 'Prostate Health\nTips', bg: '#0f4c5c' },
  { id: 4, imageUrl: null, emoji: '💧', label: 'UTI Prevention\nGuide', bg: '#0f2744' },
  { id: 5, imageUrl: null, emoji: '⚡', label: 'PCNL\nProcedure', bg: '#2d1b69' },
  { id: 6, imageUrl: null, emoji: '🏥', label: 'AIIMS\nBhopal', bg: '#1a3a5c' },
];

// ── Skeleton grid ─────────────────────────────────────────────────────────────
const SkeletonGrid = () => (
  <div className="ig-grid">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="ig-grid-item ig-skeleton-item">
        <div className="ig-skeleton-shimmer" />
      </div>
    ))}
  </div>
);

// ── Format follower count ─────────────────────────────────────────────────────
function formatCount(n) {
  if (!n && n !== 0) return '—';
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  return n.toString();
}

// ── Main Component ────────────────────────────────────────────────────────────
const InstagramBio = ({ compact = false }) => {
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.instagram.getFeed()
      .then(data => {
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, compact ? 3 : 6));
          setProfile(data.profile);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const displayPosts = (posts.length > 0 ? posts : STATIC_POSTS).slice(0, compact ? 3 : 6);
  const totalPosts = profile?.mediaCount || 87;
  const followers = profile ? formatCount(profile.followersCount) : '21.7K';
  const profilePic = profile?.profilePicture || null;

  if (compact) {
    return (
      <div className="ig-compact">
        {/* Compact Header */}
        <div className="ig-compact-header">
          <div className="ig-compact-pic">
            {profilePic ? (
              <img src={profilePic} alt="Dr. Mohit Sharma" onError={(e) => { e.target.style.display='none'; }} />
            ) : (
              <img src="/doctors/mohit.jpg" alt="Dr. Mohit Sharma" onError={(e) => { e.target.src=''; }} />
            )}
          </div>
          <div className="ig-compact-info">
            <div className="ig-compact-username-row">
              <span className="ig-compact-username">{profile?.username || 'dr.mohit_urowala'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
                <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {!error && !loading && <span className="ig-live-badge" style={{fontSize:'11px',padding:'2px 8px'}}>🟢 Live</span>}
              <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-follow-btn" style={{padding:'4px 14px', fontSize:'12px'}}>Follow</a>
            </div>
            <div className="ig-compact-stats">
              <span><strong>{totalPosts}</strong> posts</span>
              <span><strong>{followers}</strong> followers</span>
              <span><strong>2</strong> following</span>
            </div>
            <div className="ig-compact-bio">Dr. Mohit Sharma AIIMS · Urologist · AIIMS Bhopal</div>
          </div>
        </div>

        {/* Compact 3-post grid */}
        {loading ? (
          <div className="ig-compact-grid">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="ig-compact-item ig-skeleton-item"><div className="ig-skeleton-shimmer"/></div>
            ))}
          </div>
        ) : (
          <div className="ig-compact-grid">
            {displayPosts.map((post, i) => (
              <a key={post.id || i} href={post.permalink || 'https://www.instagram.com/dr.mohit_urowala'} target="_blank" rel="noreferrer" className="ig-compact-item">
                {post.imageUrl ? (
                  <img src={post.imageUrl} alt={post.caption || ''} loading="lazy" onError={(e) => { e.target.style.display='none'; }} />
                ) : (
                  <div style={{width:'100%',height:'100%',background:post.bg,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:'8px'}}>
                    <span style={{fontSize:'2rem'}}>{post.emoji}</span>
                  </div>
                )}
                {post.mediaType === 'VIDEO' && (
                  <div className="ig-video-badge"><svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg></div>
                )}
                <div className="ig-grid-overlay">
                  {post.likeCount > 0 && <span className="ig-overlay-likes"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {formatCount(post.likeCount)}</span>}
                </div>
              </a>
            ))}
          </div>
        )}

        <div style={{textAlign:'center', marginTop:'14px'}}>
          <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer"
            style={{display:'inline-flex',alignItems:'center',gap:'6px',padding:'9px 22px',
            background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
            color:'white',borderRadius:'30px',fontWeight:700,textDecoration:'none',fontSize:'13px'}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            View all {totalPosts} posts on Instagram
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="ig-container">
      <div className="ig-header">

        {/* Profile Picture */}
        <div className="ig-profile-pic">
          {profilePic ? (
            <img src={profilePic} alt="Dr. Mohit Sharma"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextElementSibling.style.display = 'flex';
              }} />
          ) : (
            <img src="/doctors/mohit.jpg" alt="Dr. Mohit Sharma"
              onError={(e) => { e.target.src = ''; e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#3B82F6,#1e40af);color:white;font-size:2rem;font-weight:800">MS</div>'; }} />
          )}
          <div style={{display:'none', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#3B82F6,#1e40af)', color:'white', fontSize:'2rem', fontWeight:800, borderRadius:'50%'}}>MS</div>
        </div>

        {/* Profile Info (desktop) */}
        <div className="ig-profile-info">
          <div className="ig-username-row">
            <h2 className="ig-username">{profile?.username || 'dr.mohit_urowala'}</h2>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{flexShrink:0}}>
              <circle cx="12" cy="12" r="12" fill="#3B82F6"/>
              <path d="M7 12.5l3.5 3.5 6.5-7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-follow-btn">Follow</a>
            <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-external-btn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
            {!error && !loading && (
              <span className="ig-live-badge">🟢 Live</span>
            )}
          </div>

          <div className="ig-stats">
            <div className="ig-stat"><strong>{totalPosts}</strong><span>posts</span></div>
            <div className="ig-stat"><strong>{followers}</strong><span>followers</span></div>
            <div className="ig-stat"><strong>2</strong><span>following</span></div>
          </div>

          <div className="ig-bio">
            <h1 className="ig-name">Dr. Mohit Sharma AIIMS</h1>
            <div className="ig-category">Urologist</div>
            <p className="ig-bio-text">
              {profile?.bio || <>Helping you understand Kidney &amp; Urology health<br/>Stones | Prostate | UTIs | Men's health | Transplant<br/>AIIMS Bhopal</>}
            </p>
            <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer" className="ig-link">
              🔗 wa.me/9039570761
            </a>
          </div>
        </div>
      </div>

      {/* Mobile bio */}
      <div className="ig-bio-mobile">
        <h1 className="ig-name">Dr. Mohit Sharma AIIMS</h1>
        <div className="ig-category">Urologist</div>
        <p className="ig-bio-text">
          {profile?.bio || <>Helping you understand Kidney &amp; Urology health<br/>Stones | Prostate | UTIs | Men's health | Transplant<br/>AIIMS Bhopal</>}
        </p>
        <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer" className="ig-link">
          🔗 wa.me/9039570761
        </a>
      </div>

      {/* Story Highlights */}
      <div className="ig-highlights">
        {[
          { label: 'Kidney', emoji: '🫘' },
          { label: 'Prostate', emoji: '🔬' },
          { label: 'UTI', emoji: '💧' },
          { label: 'Laser', emoji: '⚡' },
          { label: 'AIIMS', emoji: '🏥' },
        ].map((h, i) => (
          <a key={i} href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-highlight">
            <div className="ig-highlight-circle"><span>{h.emoji}</span></div>
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

      {/* Post Grid */}
      {loading ? (
        <SkeletonGrid />
      ) : (
        <div className="ig-grid">
          {displayPosts.map((post, i) => (
            post.imageUrl ? (
              /* Real Instagram Post */
              <a key={post.id} href={post.permalink || 'https://www.instagram.com/dr.mohit_urowala'} target="_blank" rel="noreferrer" className="ig-grid-item ig-grid-real">
                <img
                  src={post.imageUrl}
                  alt={post.caption || `Post ${i + 1}`}
                  className="ig-grid-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.style.background = '#1e3a5f';
                  }}
                />
                {post.mediaType === 'VIDEO' && (
                  <div className="ig-video-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
                  </div>
                )}
                {post.mediaType === 'CAROUSEL_ALBUM' && (
                  <div className="ig-carousel-badge">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><rect x="2" y="5" width="14" height="14" rx="2" fill="none" stroke="white" strokeWidth="2"/><rect x="6" y="2" width="14" height="14" rx="2" fill="none" stroke="white" strokeWidth="2"/></svg>
                  </div>
                )}
                <div className="ig-grid-overlay">
                  {post.likeCount > 0 && (
                    <span className="ig-overlay-likes">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                      {formatCount(post.likeCount)}
                    </span>
                  )}
                  {post.caption && (
                    <span className="ig-overlay-caption">{post.caption.slice(0, 60)}{post.caption.length > 60 ? '…' : ''}</span>
                  )}
                </div>
              </a>
            ) : (
              /* Static fallback card */
              <a key={post.id} href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer" className="ig-grid-item" style={{background: post.bg, textDecoration: 'none'}}>
                <div className="ig-grid-emoji">{post.emoji}</div>
                <div className="ig-grid-text">{post.label.split('\n').map((t, j) => <span key={j}>{t}<br/></span>)}</div>
                <div className="ig-grid-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </div>
              </a>
            )
          ))}
        </div>
      )}

      <div style={{textAlign:'center', marginTop:'20px'}}>
        <a href="https://www.instagram.com/dr.mohit_urowala" target="_blank" rel="noreferrer"
          style={{display:'inline-flex', alignItems:'center', gap:'8px', padding:'12px 28px',
          background:'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
          color:'white', borderRadius:'30px', fontWeight:700, textDecoration:'none', fontSize:'15px'}}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          View all {totalPosts} posts on Instagram
        </a>
      </div>
    </div>
  );
};

export default InstagramBio;
