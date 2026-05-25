import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import './Gallery.css';

const allItems = [
  { id: 1, category: 'clinic', label: 'Reception Area', emoji: '🏥', color: '#0f4c5c', bg: '#e0f2fe' },
  { id: 2, category: 'clinic', label: 'Consultation Room', emoji: '🩺', color: '#2563EB', bg: '#EFF6FF' },
  { id: 3, category: 'clinic', label: 'Operation Theatre', emoji: '⚕️', color: '#134e4a', bg: '#ccfbf1' },
  { id: 4, category: 'team', label: 'Dr. Mohit Sharma', emoji: '👨‍⚕️', color: '#0f4c5c', bg: '#eff6ff' },
  { id: 5, category: 'team', label: 'Dr. Priyanka Sharma', emoji: '👩‍⚕️', color: '#7c3aed', bg: '#f5f3ff' },
  { id: 6, category: 'team', label: 'Dr. Rahul Sharma', emoji: '🧑‍⚕️', color: '#059669', bg: '#ecfdf5' },
  { id: 7, category: 'procedures', label: 'Laser Surgery Setup', emoji: '🔬', color: '#f59e0b', bg: '#fffbeb' },
  { id: 8, category: 'procedures', label: 'Cystoscopy Suite', emoji: '💡', color: '#6366f1', bg: '#eef2ff' },
  { id: 9, category: 'procedures', label: 'Laparoscopy Equipment', emoji: '🔭', color: '#0f4c5c', bg: '#f0f9ff' },
  { id: 10, category: 'clinic', label: 'Waiting Lounge', emoji: '🪑', color: '#2563EB', bg: '#f0fdf4' },
  { id: 11, category: 'team', label: 'Medical Staff', emoji: '👥', color: '#0f4c5c', bg: '#fef2f2' },
  { id: 12, category: 'procedures', label: 'Dermatology Suite', emoji: '✨', color: '#7c3aed', bg: '#fdf4ff' },
];

const categories = ['All', 'Clinic', 'Team', 'Procedures'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    activeFilter === 'All'
      ? allItems
      : allItems.filter((item) => item.category === activeFilter.toLowerCase());

  return (
    <div className="gallery-page">
      {/* Hero */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay" />
        <div className="gallery-hero-content">
          <p className="gallery-hero-sub">Our Clinic</p>
          <h1 className="gallery-hero-title">Gallery</h1>
          <p className="gallery-hero-desc">
            A glimpse into Urowala Clinic — our spaces, our team, and our equipment.
          </p>
          <div className="gallery-hero-divider" />
        </div>
      </section>

      {/* Filters */}
      <section className="gallery-filter-section">
        <div className="gallery-container">
          <div className="gallery-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="gallery-grid-section">
        <div className="gallery-container">
          <div className="gallery-masonry">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="gallery-item"
                style={{ background: item.bg }}
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-item-inner">
                  <div className="gallery-emoji" style={{ color: item.color }}>
                    {item.emoji}
                  </div>
                  <div className="gallery-overlay-info">
                    <span className="gallery-item-label">{item.label}</span>
                    <ZoomIn size={18} color="#fff" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="gallery-empty">No items in this category.</div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <div
            className="gallery-lightbox-inner"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="gallery-lightbox-close" onClick={() => setLightbox(null)}>
              <X size={24} />
            </button>
            <div
              className="gallery-lightbox-img"
              style={{ background: lightbox.bg }}
            >
              <div className="gallery-lightbox-emoji" style={{ color: lightbox.color }}>
                {lightbox.emoji}
              </div>
            </div>
            <div className="gallery-lightbox-caption">
              <span
                className="gallery-lightbox-cat"
                style={{ background: lightbox.color }}
              >
                {lightbox.category}
              </span>
              <h3>{lightbox.label}</h3>
              <p>Urowala Clinic — Jaipur, Rajasthan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
