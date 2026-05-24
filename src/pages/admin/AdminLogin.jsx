import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const ADMIN_USERNAME = 'urowala_admin';
const ADMIN_PASSWORD = 'urowala@2025';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');

  useEffect(() => {
    const isAuth = localStorage.getItem('urowala_admin_auth');
    if (isAuth === 'true') {
      navigate('/admin');
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate a brief loading state
    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('urowala_admin_auth', 'true');
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="admin-login-page">
      {/* Animated background blobs */}
      <div className="login-bg-blob login-bg-blob--1"></div>
      <div className="login-bg-blob login-bg-blob--2"></div>
      <div className="login-bg-blob login-bg-blob--3"></div>

      <div className="admin-login-card">
        {/* Logo */}
        <div className="login-logo-wrap">
          <img
            src={logoSrc}
            alt="Urowala Clinic"
            className="login-logo"
            onError={() => {
              if (logoSrc === '/logo.png') {
                setLogoSrc('/logo.svg');
              }
            }}
          />
        </div>

        {/* Heading */}
        <div className="login-header">
          <h1 className="login-title">Admin Portal</h1>
          <p className="login-subtitle">Urowala Clinic Management System</p>
        </div>

        {/* Form */}
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="login-field">
            <label htmlFor="username" className="login-label">
              Username
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </span>
              <input
                id="username"
                type="text"
                className="login-input"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label htmlFor="password" className="login-label">
              Password
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <input
                id="password"
                type="password"
                className="login-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="login-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`login-btn${loading ? ' login-btn--loading' : ''}`}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="login-spinner"></span>
                Signing In…
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <p className="login-footer-note">
          🔒 Secure admin access · Urowala Clinic
        </p>
      </div>
    </div>
  );
}
