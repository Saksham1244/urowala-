import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import './AdminLogin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('urowala_token');
    if (token) navigate('/admin', { replace: true });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { token, username } = await api.auth.login(form.username, form.password);
      localStorage.setItem('urowala_token', token);
      localStorage.setItem('urowala_admin_auth', 'true');
      localStorage.setItem('urowala_admin_user', username);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-logo">
          <img src="/logo.png" alt="Urowala" onError={(e) => { e.target.src = '/logo.svg'; }} />
        </div>
        <h1 className="admin-login-title">Admin Portal</h1>
        <p className="admin-login-sub">Urowala Clinic Management System</p>

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-login-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="Enter username"
              required
              autoComplete="username"
            />
          </div>
          <div className="admin-login-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter password"
              required
              autoComplete="current-password"
            />
          </div>

          {error && <div className="admin-login-error">⚠️ {error}</div>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? <span className="admin-login-spinner" /> : 'Sign In'}
          </button>
        </form>

        <p className="admin-login-footer">
          🔒 Secure admin access — Urowala Clinic
        </p>
      </div>
    </div>
  );
}
