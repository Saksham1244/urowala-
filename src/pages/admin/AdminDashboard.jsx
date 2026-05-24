import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogsFromStorage } from '../../data/blogs.js';
import './AdminDashboard.css';

function formatDate(dateStr) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', options);
  } catch {
    return dateStr;
  }
}

function LiveClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <span className="dashboard-clock">
      {now.toLocaleString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      })}
    </span>
  );
}

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    setBlogs(getBlogsFromStorage());
  }, []);

  const published = blogs.filter((b) => b.published);
  const drafts = blogs.filter((b) => !b.published);
  const recent = [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  const stats = [
    {
      label: 'Published Blogs',
      value: published.length,
      icon: '📰',
      color: '#41B8C9',
      bg: '#e0f7fa',
    },
    {
      label: 'Draft Blogs',
      value: drafts.length,
      icon: '📝',
      color: '#f59e0b',
      bg: '#fef3c7',
    },
    {
      label: 'Total Doctors',
      value: 3,
      icon: '👨‍⚕️',
      color: '#8B5CF6',
      bg: '#ede9fe',
    },
    {
      label: 'Total Services',
      value: 6,
      icon: '🏥',
      color: '#10b981',
      bg: '#d1fae5',
    },
  ];

  return (
    <div className="admin-dashboard">
      {/* Welcome banner */}
      <div className="dashboard-welcome">
        <div className="dashboard-welcome-text">
          <h1 className="dashboard-welcome-heading">Welcome back, Admin 👋</h1>
          <LiveClock />
        </div>
        <div className="dashboard-welcome-actions">
          <Link to="/admin/blogs" className="dash-action-btn dash-action-btn--primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Blog
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="dash-action-btn dash-action-btn--secondary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Website
          </a>
        </div>
      </div>

      {/* Stats grid */}
      <div className="dashboard-stats">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="stat-card"
            style={{ '--stat-color': stat.color, '--stat-bg': stat.bg }}
          >
            <div className="stat-icon-wrap">
              <span className="stat-icon">{stat.icon}</span>
            </div>
            <div className="stat-info">
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent blogs */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Blogs</h2>
          <Link to="/admin/blogs" className="section-link">
            View All
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">📭</span>
            <p>No blogs yet. <Link to="/admin/blogs">Create your first blog →</Link></p>
          </div>
        ) : (
          <div className="recent-blogs-table-wrap">
            <table className="recent-blogs-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((blog) => (
                  <tr key={blog.id}>
                    <td className="blog-title-cell">
                      <span className="blog-title-text">{blog.title}</span>
                    </td>
                    <td>
                      <span className="category-badge">{blog.category}</span>
                    </td>
                    <td className="blog-date-cell">{formatDate(blog.date)}</td>
                    <td>
                      <span className={`status-badge status-badge--${blog.published ? 'published' : 'draft'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <Link
                        to="/admin/blogs"
                        className="table-action-link"
                      >
                        Edit
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Quick Actions</h2>
        </div>
        <div className="quick-actions-grid">
          <Link to="/admin/blogs" className="quick-action-card">
            <span className="quick-action-icon">✍️</span>
            <div>
              <p className="quick-action-title">Write New Blog</p>
              <p className="quick-action-desc">Create and publish a new article</p>
            </div>
          </Link>
          <Link to="/admin/doctors" className="quick-action-card">
            <span className="quick-action-icon">👨‍⚕️</span>
            <div>
              <p className="quick-action-title">Update Doctor Info</p>
              <p className="quick-action-desc">Edit doctor profiles and details</p>
            </div>
          </Link>
          <Link to="/admin/services" className="quick-action-card">
            <span className="quick-action-icon">🏥</span>
            <div>
              <p className="quick-action-title">Manage Services</p>
              <p className="quick-action-desc">Update clinic service descriptions</p>
            </div>
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-card"
          >
            <span className="quick-action-icon">🌐</span>
            <div>
              <p className="quick-action-title">View Public Website</p>
              <p className="quick-action-desc">See the live patient-facing site</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
