import { useState, useEffect } from 'react';
import defaultServices from '../../data/services.js';
import './ServiceManager.css';

const STORAGE_KEY = 'urowala_services_overrides';

function getOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveOverrides(overrides) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

function mergeService(service, overrides) {
  const override = overrides[service.id] || {};
  return { ...service, ...override };
}

export default function ServiceManager() {
  const [overrides, setOverrides] = useState({});
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const stored = getOverrides();
    setOverrides(stored);
    setServices(defaultServices.map((s) => mergeService(s, stored)));
  }, []);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const openEdit = (service) => {
    setEditingId(service.id);
    setForm({
      title: service.title || '',
      shortDesc: service.shortDesc || '',
      description: service.description || '',
    });
    setTimeout(() => {
      document.getElementById(`service-form-${service.id}`)?.scrollIntoView({
        behavior: 'smooth', block: 'center',
      });
    }, 100);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (serviceId) => {
    const newOverrides = { ...overrides, [serviceId]: { ...form } };
    saveOverrides(newOverrides);
    setOverrides(newOverrides);
    setServices(defaultServices.map((s) => mergeService(s, newOverrides)));
    setEditingId(null);
    setForm({});
    showMsg('success', `Service "${form.title}" updated successfully!`);
  };

  return (
    <div className="service-manager">
      {/* Header */}
      <div className="sm-header">
        <div>
          <h1 className="sm-title">Service Manager</h1>
          <p className="sm-subtitle">
            {services.length} services · Edit titles and descriptions. Add/delete is not supported (services are fixed).
          </p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`sm-message sm-message--${message.type}`} role="alert">
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* Services grid */}
      <div className="sm-grid">
        {services.map((service) => (
          <div key={service.id} className="sm-service-card">
            {/* Card top */}
            <div className="sm-card-top" style={{ borderLeftColor: service.color }}>
              <div className="sm-icon-wrap" style={{ background: `${service.color}18` }}>
                <span className="sm-icon">{service.icon}</span>
              </div>
              <div className="sm-card-meta">
                <h3 className="sm-service-title" style={{ color: service.color }}>
                  {service.title}
                </h3>
                <p className="sm-service-short">{service.shortDesc}</p>
              </div>
            </div>

            {/* Description preview */}
            <div className="sm-desc-preview">
              <p>{service.description?.slice(0, 150)}{service.description?.length > 150 ? '…' : ''}</p>
            </div>

            {/* Edit button */}
            {editingId !== service.id && (
              <div className="sm-card-actions">
                <button
                  className="sm-edit-btn"
                  style={{ color: service.color, borderColor: `${service.color}55`, background: `${service.color}10` }}
                  onClick={() => openEdit(service)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit
                </button>
              </div>
            )}

            {/* Inline edit form */}
            {editingId === service.id && (
              <div className="sm-edit-form" id={`service-form-${service.id}`} style={{ borderTopColor: service.color }}>
                <div className="sm-form-header">
                  <h4 className="sm-form-title">✏️ Editing: {service.title}</h4>
                  <button className="sm-cancel-btn" onClick={cancelEdit}>✕</button>
                </div>

                <div className="sm-form-fields">
                  {/* Title */}
                  <div className="sm-field">
                    <label className="sm-label">Service Title</label>
                    <input
                      type="text"
                      name="title"
                      className="sm-input"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Service title…"
                    />
                  </div>

                  {/* Short desc */}
                  <div className="sm-field">
                    <label className="sm-label">Short Description</label>
                    <input
                      type="text"
                      name="shortDesc"
                      className="sm-input"
                      value={form.shortDesc}
                      onChange={handleChange}
                      placeholder="One-line summary shown on cards…"
                    />
                  </div>

                  {/* Full description */}
                  <div className="sm-field">
                    <label className="sm-label">Full Description</label>
                    <textarea
                      name="description"
                      className="sm-textarea"
                      rows={5}
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Detailed description of this service…"
                    />
                  </div>
                </div>

                <div className="sm-form-actions">
                  <button
                    className="sm-save-btn"
                    style={{ background: service.color }}
                    onClick={() => handleSave(service.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save
                  </button>
                  <button className="sm-discard-btn" onClick={cancelEdit}>
                    Discard
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="sm-info-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span>
          Service overrides are stored in <code>urowala_services_overrides</code> in localStorage.
          Icons, colors, symptoms, procedures, and recovery time can only be changed in the source code (<code>src/data/services.js</code>).
        </span>
      </div>
    </div>
  );
}
