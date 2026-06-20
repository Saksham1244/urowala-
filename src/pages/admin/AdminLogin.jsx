import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';
import './AdminLogin.css';

// ── Admin Credentials (for local testing) ──
const ADMIN_USERNAME = 'urowala_admin';
const ADMIN_PASSWORD = 'urowala@2025';

import { api } from '../../services/api';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('urowala_admin_auth') === 'true' && localStorage.getItem('urowala_token')) {
      navigate('/admin', { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await api.auth.login(form.username, form.password);
      if (data.token) {
        localStorage.setItem('urowala_token', data.token);
        localStorage.setItem('urowala_admin_auth', 'true');
        localStorage.setItem('urowala_admin_user', data.username || 'Urowala Admin');
        navigate('/admin', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
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
              placeholder="Enter admin username"
              required
              autoComplete="username"
            />
          </div>

          <div className="admin-login-field">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                id="password"
                type={showPwd ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter your password"
                required
                autoComplete="current-password"
                style={{ paddingRight: '44px' }}
              />
              <button
                type="button"
                onClick={() => setShowPwd(!showPwd)}
                style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#64748b',
                  padding: 0, display: 'flex'
                }}
              >
                {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <div className="admin-login-error">⚠️ {error}</div>}

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading
              ? <span className="admin-login-spinner" />
              : <><ShieldCheck size={16} /> Sign In</>
            }
          </button>
        </form>

        <p className="admin-login-footer" style={{ marginTop: '20px' }}>
          🔒 Restricted access — Urowala Clinic
        </p>
      </div>
    </div>
  );
}

