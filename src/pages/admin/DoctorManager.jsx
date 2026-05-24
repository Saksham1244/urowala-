import { useState, useEffect } from 'react';
import defaultDoctors from '../../data/doctors.js';
import './DoctorManager.css';

const STORAGE_KEY = 'urowala_doctors_overrides';

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

function mergeDoctor(doctor, overrides) {
  const override = overrides[doctor.id] || {};
  return { ...doctor, ...override };
}

export default function DoctorManager() {
  const [overrides, setOverrides] = useState({});
  const [doctors, setDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const stored = getOverrides();
    setOverrides(stored);
    setDoctors(defaultDoctors.map((d) => mergeDoctor(d, stored)));
  }, []);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const openEdit = (doctor) => {
    setEditingId(doctor.id);
    setForm({
      name: doctor.name || '',
      title: doctor.title || '',
      qualifications: doctor.qualifications || '',
      experience: doctor.experience || '',
      surgeries: doctor.surgeries || '',
      treatments: doctor.treatments || '',
      bio: doctor.bio || '',
      photo: doctor.photo || '',
    });
    setTimeout(() => {
      document.getElementById(`doctor-form-${doctor.id}`)?.scrollIntoView({
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

  const handleSave = (doctorId) => {
    const updates = {
      ...form,
      experience: form.experience !== '' ? Number(form.experience) : form.experience,
    };
    const newOverrides = { ...overrides, [doctorId]: updates };
    saveOverrides(newOverrides);
    setOverrides(newOverrides);
    setDoctors(defaultDoctors.map((d) => mergeDoctor(d, newOverrides)));
    setEditingId(null);
    setForm({});
    showMsg('success', `Dr. ${updates.name || ''}'s profile saved successfully!`);
  };

  return (
    <div className="doctor-manager">
      {/* Header */}
      <div className="dm-header">
        <div>
          <h1 className="dm-title">Doctor Manager</h1>
          <p className="dm-subtitle">Edit doctor profiles. Changes are saved to browser storage.</p>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`dm-message dm-message--${message.type}`} role="alert">
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* Doctor cards */}
      <div className="dm-cards-grid">
        {doctors.map((doctor) => (
          <div key={doctor.id} className="dm-doctor-card">
            {/* Card header */}
            <div className="dm-card-header" style={{ background: `linear-gradient(135deg, ${doctor.color}22, ${doctor.color}11)`, borderColor: `${doctor.color}33` }}>
              <div className="dm-photo-wrap">
                {doctor.photo ? (
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="dm-photo"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div
                  className="dm-photo-fallback"
                  style={{ background: doctor.color, display: doctor.photo ? 'none' : 'flex' }}
                >
                  {doctor.photoFallback || doctor.name.slice(0, 2)}
                </div>
              </div>
              <div className="dm-card-info">
                <h3 className="dm-doctor-name" style={{ color: doctor.color }}>{doctor.name}</h3>
                <p className="dm-doctor-title">{doctor.title}</p>
                <p className="dm-doctor-quals">{doctor.qualifications}</p>
                <div className="dm-doctor-stats">
                  {doctor.experience && (
                    <span className="dm-stat-chip">{doctor.experience}+ yrs exp</span>
                  )}
                  {doctor.surgeries && (
                    <span className="dm-stat-chip">{doctor.surgeries} surgeries</span>
                  )}
                  {doctor.treatments && (
                    <span className="dm-stat-chip">{doctor.treatments} treatments</span>
                  )}
                </div>
              </div>
            </div>

            {/* Bio preview */}
            <div className="dm-bio-preview">
              <p>{doctor.bio?.slice(0, 180)}{doctor.bio?.length > 180 ? '…' : ''}</p>
            </div>

            {/* Edit button */}
            {editingId !== doctor.id && (
              <div className="dm-card-actions">
                <button
                  className="dm-edit-btn"
                  onClick={() => openEdit(doctor)}
                  style={{ background: doctor.color }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                  </svg>
                  Edit Profile
                </button>
              </div>
            )}

            {/* Inline edit form */}
            {editingId === doctor.id && (
              <div className="dm-edit-form" id={`doctor-form-${doctor.id}`}>
                <div className="dm-edit-form-header">
                  <h4 className="dm-form-title">✏️ Editing: {doctor.name}</h4>
                  <button className="dm-cancel-btn" onClick={cancelEdit}>✕ Cancel</button>
                </div>

                <div className="dm-form-grid">
                  <div className="dm-field">
                    <label className="dm-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="dm-input"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Dr. Full Name"
                    />
                  </div>

                  <div className="dm-field">
                    <label className="dm-label">Title / Specialty</label>
                    <input
                      type="text"
                      name="title"
                      className="dm-input"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="e.g. Chief Urology Surgeon"
                    />
                  </div>

                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Qualifications</label>
                    <input
                      type="text"
                      name="qualifications"
                      className="dm-input"
                      value={form.qualifications}
                      onChange={handleChange}
                      placeholder="e.g. M.B.B.S., MS, MCh (AIIMS)"
                    />
                  </div>

                  <div className="dm-field">
                    <label className="dm-label">Experience (years)</label>
                    <input
                      type="number"
                      name="experience"
                      className="dm-input"
                      value={form.experience}
                      onChange={handleChange}
                      min="0"
                      placeholder="e.g. 10"
                    />
                  </div>

                  <div className="dm-field">
                    <label className="dm-label">Surgeries Performed</label>
                    <input
                      type="text"
                      name="surgeries"
                      className="dm-input"
                      value={form.surgeries}
                      onChange={handleChange}
                      placeholder="e.g. 2,000+"
                    />
                  </div>

                  <div className="dm-field">
                    <label className="dm-label">Treatments (if applicable)</label>
                    <input
                      type="text"
                      name="treatments"
                      className="dm-input"
                      value={form.treatments}
                      onChange={handleChange}
                      placeholder="e.g. 3,00,000+"
                    />
                  </div>

                  <div className="dm-field">
                    <label className="dm-label">Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      className="dm-input"
                      value={form.photo}
                      onChange={handleChange}
                      placeholder="/doctors/photo.jpg"
                    />
                  </div>

                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Bio</label>
                    <textarea
                      name="bio"
                      className="dm-textarea"
                      rows={5}
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Doctor biography…"
                    />
                  </div>
                </div>

                <div className="dm-form-actions">
                  <button className="dm-save-btn" onClick={() => handleSave(doctor.id)} style={{ background: doctor.color }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                      <polyline points="17 21 17 13 7 13 7 21"/>
                      <polyline points="7 3 7 8 15 8"/>
                    </svg>
                    Save Changes
                  </button>
                  <button className="dm-discard-btn" onClick={cancelEdit}>
                    Discard
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Info note */}
      <div className="dm-info-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Changes are stored in this browser's local storage under <code>urowala_doctors_overrides</code>. They persist across page refreshes on the same device/browser.
      </div>
    </div>
  );
}
