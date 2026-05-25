import React from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Clock, User, ArrowLeft, Share2, MessageCircle, ArrowRight } from 'lucide-react';
import { getBlogsFromStorage } from '../data/blogs.js';
import './BlogDetail.css';

// Simple markdown-like renderer
const renderContent = (content) => {
  if (!content) return [];
  const lines = content.trim().split('\n');
  const elements = [];
  let listItems = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="blog-content__list">
          {listItems.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList();
      return;
    }
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(<h2 key={idx} className="blog-content__h2">{trimmed.slice(3)}</h2>);
    } else if (trimmed.startsWith('### ')) {
      flushList();
      elements.push(<h3 key={idx} className="blog-content__h3">{trimmed.slice(4)}</h3>);
    } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      // Render bold inside list items
      const text = trimmed.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      listItems.push(<span key={idx} dangerouslySetInnerHTML={{__html: text}}/>);
    } else {
      flushList();
      const html = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(<p key={idx} className="blog-content__p" dangerouslySetInnerHTML={{__html: html}}/>);
    }
  });
  flushList();
  return elements;
};

export default function BlogDetail() {
  const { slug } = useParams();
  const allBlogs = getBlogsFromStorage();
  const blog = allBlogs.find(b => b.slug === slug);

  if (!blog) return <Navigate to="/blog" replace />;

  const related = allBlogs.filter(b => b.slug !== slug && b.published).slice(0, 3);

  const shareWA = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this article from Urowala Clinic: ${blog.title}`);
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied!');
  };

  return (
    <div className="blog-detail-page">
      {/* Hero */}
      <section className="blog-detail__hero" style={{background: (blog.coverFallbackColor || '#3B82F6') + '22'}}>
        <div className="blog-detail__hero-bg" style={{background: (blog.coverFallbackColor || '#3B82F6')}}/>
        {blog.coverImage && (
          <img src={blog.coverImage} alt={blog.title} className="blog-detail__hero-img"
            onError={e => { e.target.style.display = 'none'; }}/>
        )}
        <div className="container blog-detail__hero-content">
          <Link to="/blog" className="blog-back-btn">
            <ArrowLeft size={16}/> Back to Blog
          </Link>
          <div className="blog-detail__category">{blog.category}</div>
          <h1>{blog.title}</h1>
          <div className="blog-detail__meta">
            <span className="meta-chip"><User size={14}/> {blog.author}</span>
            <span className="meta-chip"><Clock size={14}/> {blog.readTime} min read</span>
            <span className="meta-chip">{blog.date}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container blog-detail__layout">
          <article className="blog-detail__article">
            <div className="blog-detail__content">
              {renderContent(blog.content)}
            </div>

            {/* Tags */}
            {blog.tags && (
              <div className="blog-detail__tags">
                {blog.tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            )}

            {/* Share */}
            <div className="blog-detail__share">
              <span>Share this article:</span>
              <button className="share-btn share-btn--wa" onClick={shareWA}>
                <MessageCircle size={16}/> WhatsApp
              </button>
              <button className="share-btn share-btn--copy" onClick={copyLink}>
                <Share2 size={16}/> Copy Link
              </button>
            </div>

            {/* Author Card */}
            <div className="blog-author-card">
              <div className="blog-author-card__avatar">
                {blog.author.split(' ').map(n => n[0]).join('').slice(0,2)}
              </div>
              <div>
                <strong>{blog.author}</strong>
                <span>{blog.authorTitle || 'Specialist, Urowala Clinic'}</span>
                <p>Expert specialist at Urowala Clinic, Jaipur. Committed to patient education and evidence-based medicine.</p>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="blog-detail__sidebar">
            <div className="blog-sidebar-cta">
              <h4>Need a Consultation?</h4>
              <p>Book an appointment with our specialists today.</p>
              <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer"
                className="btn btn-accent" style={{width:'100%',justifyContent:'center'}}>
                <MessageCircle size={16}/> Book via WhatsApp
              </a>
            </div>
            {related.length > 0 && (
              <div className="blog-related">
                <h4>Related Articles</h4>
                {related.map(b => (
                  <Link key={b.id} to={`/blog/${b.slug}`} className="blog-related-item">
                    <div className="related-cat">{b.category}</div>
                    <strong>{b.title}</strong>
                    <span><Clock size={12}/> {b.readTime} min read</span>
                    <ArrowRight size={14} className="related-arrow"/>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}
