import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services/api';
import './AdminDashboard.css';

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
        setBlogs(b);
        setAppointments(a);
        setContacts(c);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const stats = [
    { label: 'Total Blogs', value: blogs.length, color: '#3B82F6', icon: '📝', sub: `${blogs.filter(b => b.published).length} published` },
    { label: 'Appointments', value: appointments.length, color: '#FF6C00', icon: '📅', sub: `${appointments.filter(a => a.status === 'pending').length} pending` },
    { label: 'Messages', value: contacts.length, color: '#8B5CF6', icon: '💬', sub: `${contacts.filter(c => !c.read).length} unread` },
    { label: 'Doctors', value: 3, color: '#10B981', icon: '👨‍⚕️', sub: 'All active' },
    { label: 'Services', value: 6, color: '#F59E0B', icon: '🏥', sub: 'All active' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Welcome back, {user}! 👋</h1>
          <p className="dashboard-date">{dateStr}</p>
        </div>
        <div className="dashboard-actions">
          <Link to="/admin/blogs" className="dash-btn dash-btn--primary">+ New Blog</Link>
          <a href="/" target="_blank" rel="noreferrer" className="dash-btn dash-btn--outline">View Website ↗</a>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading dashboard...</div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="dashboard-stats">
            {stats.map((s) => (
              <div className="stat-card" key={s.label} style={{ borderLeft: `4px solid ${s.color}` }}>
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent Appointments */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Appointments</h2>
              <Link to="/admin/appointments" className="view-all">View All →</Link>
            </div>
            {appointments.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', padding: '20px' }}>No appointments yet.</p>
            ) : (
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Patient</th>
                      <th>Phone</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.slice(0, 5).map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>{a.phone}</td>
                        <td>{a.doctor || '—'}</td>
                        <td>{a.preferredDate || '—'}</td>
                        <td>
                          <span className={`status-badge status-badge--${a.status}`}>
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent Blogs */}
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Recent Blogs</h2>
              <Link to="/admin/blogs" className="view-all">Manage →</Link>
            </div>
            {blogs.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', padding: '20px' }}>No blogs yet. <Link to="/admin/blogs">Create your first blog →</Link></p>
            ) : (
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td style={{ maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.title}</td>
                        <td>{b.category}</td>
                        <td>{b.author}</td>
                        <td>
                          <span className={`status-badge status-badge--${b.published ? 'confirmed' : 'pending'}`}>
                            {b.published ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td>
                          <Link to="/admin/blogs" className="dash-link">Edit</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Unread Messages */}
          {contacts.filter(c => !c.read).length > 0 && (
            <div className="dashboard-section">
              <div className="section-header">
                <h2>📨 Unread Messages ({contacts.filter(c => !c.read).length})</h2>
                <Link to="/admin/contacts" className="view-all">View All →</Link>
              </div>
              <div className="dashboard-table-wrap">
                <table className="dashboard-table">
                  <thead>
                    <tr><th>Name</th><th>Phone</th><th>Message</th><th>Date</th></tr>
                  </thead>
                  <tbody>
                    {contacts.filter(c => !c.read).slice(0, 3).map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>{c.phone}</td>
                        <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.message}</td>
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
