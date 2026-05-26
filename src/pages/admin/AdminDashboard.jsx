import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './AdminDashboard.css';

const QUICK_LINKS = [
  { to: '/admin/blogs',        emoji: '📝', label: 'Blog Manager',      color: '#3B82F6' },
  { to: '/admin/appointments', emoji: '📅', label: 'Appointments',      color: '#FF6C00' },
  { to: '/admin/contacts',     emoji: '💬', label: 'Messages',          color: '#8B5CF6' },
  { to: '/admin/doctors',      emoji: '👨‍⚕️', label: 'Doctor Manager',    color: '#10B981' },
  { to: '/admin/services',     emoji: '🏥', label: 'Service Manager',   color: '#F59E0B' },
  { to: '/admin/photo-settings', emoji: '📸', label: 'Photo Settings', color: '#EC4899' },
];

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = localStorage.getItem('urowala_admin_user') || 'Admin';

  useEffect(() => {
    async function loadStats() {
      try {
        const [b, a, c] = await Promise.all([
          api.blogs.getAllAdmin(),
          api.appointments.getAll(),
          api.contacts.getAll(),
        ]);
        setBlogs(b); setAppointments(a); setContacts(c);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadStats();
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats = [
    { label: 'Total Blogs',    value: blogs.length,         color: '#3B82F6', bg: '#EFF6FF', icon: '📝', sub: `${blogs.filter(b => b.published).length} published` },
    { label: 'Appointments',   value: appointments.length,  color: '#FF6C00', bg: '#FFF7ED', icon: '📅', sub: `${appointments.filter(a => a.status === 'pending').length} pending` },
    { label: 'Messages',       value: contacts.length,      color: '#8B5CF6', bg: '#F5F3FF', icon: '💬', sub: `${contacts.filter(c => !c.read).length} unread` },
    { label: 'Active Doctors', value: 3,                    color: '#10B981', bg: '#ECFDF5', icon: '👨‍⚕️', sub: 'All active' },
    { label: 'Services',       value: 6,                    color: '#F59E0B', bg: '#FFFBEB', icon: '🏥', sub: 'All active' },
  ];

  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dash-header">
        <div className="dash-header__left">
          <p className="dash-header__date">{dateStr}</p>
          <h1 className="dash-header__title">Welcome back, <span>{user}</span> 👋</h1>
          <p className="dash-header__sub">Here's what's happening at Urowala Clinic today.</p>
        </div>
        <div className="dash-header__actions">
          <Link to="/admin/blogs" className="dash-btn dash-btn--primary">＋ New Blog</Link>
          <a href="/" target="_blank" rel="noreferrer" className="dash-btn dash-btn--outline">View Website ↗</a>
        </div>
      </div>

      {loading ? (
        <div className="dash-loading">
          <div className="dash-spinner" />
          <span>Loading dashboard…</span>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="dash-stats">
            {stats.map(s => (
              <div className="dash-stat" key={s.label} style={{ '--stat-color': s.color, '--stat-bg': s.bg }}>
                <div className="dash-stat__icon">{s.icon}</div>
                <div className="dash-stat__body">
                  <div className="dash-stat__value">{s.value}</div>
                  <div className="dash-stat__label">{s.label}</div>
                  <div className="dash-stat__sub">{s.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="dash-section">
            <h2 className="dash-section__title">Quick Access</h2>
            <div className="dash-quick-grid">
              {QUICK_LINKS.map(q => (
                <Link to={q.to} key={q.to} className="dash-quick" style={{ '--q-color': q.color }}>
                  <span className="dash-quick__icon">{q.emoji}</span>
                  <span className="dash-quick__label">{q.label}</span>
                  <span className="dash-quick__arrow">→</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Appointments */}
          <div className="dash-section">
            <div className="dash-section__head">
              <h2 className="dash-section__title">Recent Appointments</h2>
              <Link to="/admin/appointments" className="dash-view-all">View All →</Link>
            </div>
            {appointments.length === 0 ? (
              <div className="dash-empty">No appointments yet.</div>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Patient</th><th>Phone</th><th>Doctor</th><th>Date</th><th>Status</th></tr></thead>
                  <tbody>
                    {appointments.slice(0, 5).map(a => (
                      <tr key={a.id}>
                        <td><strong>{a.name}</strong></td>
                        <td>{a.phone}</td>
                        <td>{a.doctor || '—'}</td>
                        <td>{a.preferredDate || '—'}</td>
                        <td><span className={`dash-badge dash-badge--${a.status}`}>{a.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Blogs */}
          <div className="dash-section">
            <div className="dash-section__head">
              <h2 className="dash-section__title">Recent Blogs</h2>
              <Link to="/admin/blogs" className="dash-view-all">Manage →</Link>
            </div>
            {blogs.length === 0 ? (
              <div className="dash-empty">No blogs yet. <Link to="/admin/blogs">Create your first →</Link></div>
            ) : (
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Title</th><th>Category</th><th>Author</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {blogs.slice(0, 5).map(b => (
                      <tr key={b.id}>
                        <td className="dash-table__title">{b.title}</td>
                        <td>{b.category}</td>
                        <td>{b.author}</td>
                        <td><span className={`dash-badge dash-badge--${b.published ? 'confirmed' : 'pending'}`}>{b.published ? 'Published' : 'Draft'}</span></td>
                        <td><Link to="/admin/blogs" className="dash-link">Edit</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Unread messages */}
          {contacts.filter(c => !c.read).length > 0 && (
            <div className="dash-section">
              <div className="dash-section__head">
                <h2 className="dash-section__title">📨 Unread Messages ({contacts.filter(c => !c.read).length})</h2>
                <Link to="/admin/contacts" className="dash-view-all">View All →</Link>
              </div>
              <div className="dash-table-wrap">
                <table className="dash-table">
                  <thead><tr><th>Name</th><th>Phone</th><th>Message</th><th>Date</th></tr></thead>
                  <tbody>
                    {contacts.filter(c => !c.read).slice(0, 3).map(c => (
                      <tr key={c.id}>
                        <td><strong>{c.name}</strong></td>
                        <td>{c.phone}</td>
                        <td className="dash-table__title">{c.message}</td>
                        <td>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
