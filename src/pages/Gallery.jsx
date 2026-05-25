import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ZoomIn } from 'lucide-react';
import { api } from '../services/api';
import './Gallery.css';

const categories = ['All', 'Clinic', 'Team', 'Procedures'];

export default function Gallery() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imgs, sets] = await Promise.all([
          api.gallery.getAll(),
          api.settings.getAll()
        ]);
        if (sets['show_gallery'] !== 'true') {
          navigate('/', { replace: true });
          return;
        }
        setItems(imgs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  const filtered =
    activeFilter === 'All'
      ? items
      : items.filter((item) => item.category.toLowerCase() === activeFilter.toLowerCase());

  if (loading) return <div className="gallery-page" style={{minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>Loading...</div>;

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
                style={{ background: '#f8fafc' }}
                onClick={() => setLightbox(item)}
              >
                <div className="gallery-item-inner">
                  <img src={item.image} alt={item.label} className="gallery-real-img" />
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
            <div className="gallery-lightbox-img">
              <img src={lightbox.image} alt={lightbox.label} style={{width: '100%', height: '100%', objectFit: 'contain'}} />
            </div>
            <div className="gallery-lightbox-caption">
              <span
                className="gallery-lightbox-cat"
                style={{ background: 'var(--primary)' }}
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
