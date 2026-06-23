import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, Clock, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { api } from '../services/api';
import './Blog.css';

const CATEGORIES = ['All', 'Urology'];
const PER_PAGE = 6;

export default function Blog() {
  const { t } = useTranslation();
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.blogs.getAll()
      .then(data => setAllBlogs(Array.isArray(data) ? data : []))
      .catch(() => setAllBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = allBlogs.filter(b => {
    const matchCat = category === 'All' || b.category === category;
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="blog-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>
            Health Blog
          </div>
          <h1>Medical Insights & Health Tips</h1>
          <p>Expert articles from our specialist doctors to keep you informed and healthy.</p>
          <div className="page-hero__breadcrumb">
            <Link to="/">Home</Link> <span>/</span> <span>Blog</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Search & Filter */}
          <div className="blog-controls">
            <div className="blog-search">
              <Search size={18} className="blog-search__icon"/>
              <input
                className="blog-search__input"
                placeholder="Search articles..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            <div className="blog-categories">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  className={`filter-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => { setCategory(cat); setPage(1); }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          {loading ? (
            <div className="blog-empty">
              <div style={{fontSize:'2rem'}}>⏳</div>
              <h3>Loading articles…</h3>
            </div>
          ) : paginated.length > 0 ? (
            <div className="blog-page-grid">
              {paginated.map(blog => (
                <Link to={`/blog/${blog.slug}`} key={blog.id} className="blog-list-card card">
                  <div className="blog-list-card__img" style={{background: (blog.coverFallbackColor || '#3B82F6') + '22'}}>
                    <img src={blog.coverImage} alt={blog.title}
                      onError={e => { e.target.style.display = 'none'; }}/>
                    <div className="blog-list-card__category">{blog.category}</div>
                  </div>
                  <div className="blog-list-card__body">
                    <div className="blog-list-card__meta">
                      <span className="blog-meta-item"><Clock size={12}/> {blog.readTime} min read</span>
                      <span className="blog-meta-item">{blog.date}</span>
                    </div>
                    <h3>{blog.title}</h3>
                    <p>{blog.excerpt}</p>
                    <div className="blog-list-card__footer">
                      <div className="blog-author">
                        <div className="blog-author__dot"/>
                        <span><User size={12}/> {blog.author}</span>
                      </div>
                      <span className="blog-read-more">
                        {t('blog.readMore')} <ArrowRight size={14}/>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="blog-empty">
              <div style={{fontSize:'3rem'}}>🔍</div>
              <h3>No articles found</h3>
              <p>Try a different search term or category.</p>
              <button className="btn btn-primary" onClick={() => { setSearch(''); setCategory('All'); }}>
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="blog-pagination">
              <button className="page-btn" onClick={() => setPage(p => p - 1)} disabled={page === 1}>
                ← Prev
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`page-btn ${page === i + 1 ? 'page-btn--active' : ''}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button className="page-btn" onClick={() => setPage(p => p + 1)} disabled={page === totalPages}>
                Next →
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
