// Centralised API client for Urowala backend
const API_BASE = '/api';

function getToken() {
  return localStorage.getItem('urowala_token');
}

function authHeaders() {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(method, path, body = null) {
  const opts = {
    method,
    headers: authHeaders(),
  };
  if (body) opts.body = JSON.stringify(body);

  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
  return data;
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const api = {
  auth: {
    login: (username, password) =>
      request('POST', '/auth/login', { username, password }),
    verify: (token) =>
      request('POST', '/auth/verify', { token }),
    logout: () => {
      localStorage.removeItem('urowala_token');
      localStorage.removeItem('urowala_admin_auth');
    },
  },

  // ── Blogs ───────────────────────────────────────────────────────────────────
  blogs: {
    getAll: () => request('GET', '/blogs'),
    getAllAdmin: () => request('GET', '/blogs/all'),
    getBySlug: (slug) => request('GET', `/blogs/${slug}`),
    create: (data) => request('POST', '/blogs', data),
    update: (id, data) => request('PUT', `/blogs/${id}`, data),
    delete: (id) => request('DELETE', `/blogs/${id}`),
  },

  // ── Appointments ────────────────────────────────────────────────────────────
  appointments: {
    book: (data) => request('POST', '/appointments', data),
    getAll: () => request('GET', '/appointments'),
    updateStatus: (id, status) => request('PUT', `/appointments/${id}`, { status }),
    delete: (id) => request('DELETE', `/appointments/${id}`),
  },

  // ── Contacts ────────────────────────────────────────────────────────────────
  contacts: {
    send: (data) => request('POST', '/contacts', data),
    getAll: () => request('GET', '/contacts'),
    markRead: (id) => request('PUT', `/contacts/${id}/read`),
    delete: (id) => request('DELETE', `/contacts/${id}`),
  },

  // ── Doctors ─────────────────────────────────────────────────────────────────
  doctors: {
    getAll: () => request('GET', '/doctors'),
    getBySlug: (slug) => request('GET', `/doctors/${slug}`),
    update: (id, data) => request('PUT', `/doctors/${id}`, data),
  },

  // ── Services ────────────────────────────────────────────────────────────────
  services: {
    getAll: () => request('GET', '/services'),
    getBySlug: (slug) => request('GET', `/services/${slug}`),
    update: (id, data) => request('PUT', `/services/${id}`, data),
  },
};

export default api;
