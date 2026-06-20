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
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const stored = getOverrides();
    setOverrides(stored);
    setDoctors(defaultDoctors.map((d) => mergeDoctor(d, stored)));
  }, []);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 4000);
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
      color: doctor.color || '#3B82F6',
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

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const res = await fetch('http://localhost:3001/api/admin/upload-doctor', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.photoUrl) {
        setForm(prev => ({ ...prev, photo: data.photoUrl }));
        showMsg('success', 'Photo uploaded successfully!');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (err) {
      showMsg('error', err.message);
    }
  };

  const handleSaveLocal = (doctorId) => {
    const updates = {
      ...form,
      experience: form.experience !== '' ? Number(form.experience) : form.experience,
    };
    
    // If it's a new doctor (id 'new')
    if (doctorId === 'new') {
      const newId = doctors.length ? Math.max(...doctors.map(d => d.id)) + 1 : 1;
      const newDoctor = {
        id: newId,
        slug: (form.name || 'new-doctor').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...updates
      };
      
      const newDocs = [...doctors, newDoctor];
      setDoctors(newDocs);
      
      // Update overrides
      const newOverrides = { ...overrides, [newId]: newDoctor };
      saveOverrides(newOverrides);
      setOverrides(newOverrides);
    } else {
      const newOverrides = { ...overrides, [doctorId]: updates };
      saveOverrides(newOverrides);
      setOverrides(newOverrides);
      
      // We manually build the list to preserve new doctors added locally
      setDoctors(doctors.map(d => d.id === doctorId ? { ...d, ...updates } : d));
    }
    
    setEditingId(null);
    setForm({});
    showMsg('success', `Saved locally. Click "Save to Source Code" to make it permanent!`);
  };

  const deleteDoctor = (id) => {
    if (!window.confirm("Are you sure you want to delete this doctor?")) return;
    
    const newDocs = doctors.filter(d => d.id !== id);
    setDoctors(newDocs);
    
    const newOverrides = { ...overrides };
    delete newOverrides[id];
    setOverrides(newOverrides);
    saveOverrides(newOverrides);
    
    showMsg('success', 'Doctor deleted locally. Click "Save to Source Code" to make it permanent.');
  };

  const addNewDoctor = () => {
    setEditingId('new');
    setForm({
      name: '',
      title: '',
      qualifications: '',
      experience: '',
      surgeries: '',
      treatments: '',
      bio: '',
      photo: '',
      color: '#0f4c5c',
      instagram: '',
      facebook: '',
    });
  };

  const saveToSourceCode = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/admin/save-doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ doctors })
      });
      const data = await res.json();
      if (data.success) {
        // Clear local storage since it's now in source code
        localStorage.removeItem(STORAGE_KEY);
        setOverrides({});
        showMsg('success', '✅ Doctors permanently saved to source code! You can now commit to GitHub.');
      } else {
        throw new Error(data.error || 'Failed to save');
      }
    } catch (err) {
      showMsg('error', err.message);
    }
    setIsSaving(false);
  };

  return (
    <div className="doctor-manager">
      {/* Header */}
      <div className="dm-header">
        <div>
          <h1 className="dm-title">Doctor Manager</h1>
          <p className="dm-subtitle">Add new doctors and edit profiles.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline" onClick={addNewDoctor} style={{borderColor: '#10B981', color: '#10B981'}}>
            + Add New Doctor
          </button>
          <button className="btn btn-primary" onClick={saveToSourceCode} disabled={isSaving}>
            {isSaving ? 'Saving...' : '💾 Save to Source Code'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`dm-message dm-message--${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      {/* Doctor cards */}
      <div className="dm-cards-grid">
        {/* Render 'new' form if active */}
        {editingId === 'new' && (
          <div className="dm-doctor-card dm-doctor-card--new" id="doctor-form-new" style={{ border: '2px dashed #10B981' }}>
            <div className="dm-edit-form">
                <div className="dm-edit-form-header">
                  <h4 className="dm-form-title" style={{color: '#10B981'}}>✨ Adding New Doctor</h4>
                  <button className="dm-cancel-btn" onClick={cancelEdit}>✕ Cancel</button>
                </div>
                
                <div className="dm-form-grid">
                  <div className="dm-field">
                    <label className="dm-label">Full Name</label>
                    <input type="text" name="name" className="dm-input" value={form.name} onChange={handleChange} placeholder="Dr. Full Name" />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label">Title / Specialty</label>
                    <input type="text" name="title" className="dm-input" value={form.title} onChange={handleChange} placeholder="e.g. Chief Urology Surgeon" />
                  </div>
                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Qualifications</label>
                    <input type="text" name="qualifications" className="dm-input" value={form.qualifications} onChange={handleChange} placeholder="e.g. M.B.B.S., MS" />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label">Experience (years)</label>
                    <input type="number" name="experience" className="dm-input" value={form.experience} onChange={handleChange} />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label">Surgeries Performed</label>
                    <input type="text" name="surgeries" className="dm-input" value={form.surgeries} onChange={handleChange} />
                  </div>
                  
                  <div className="dm-field">
                    <label className="dm-label">Instagram Link</label>
                    <input type="text" name="instagram" className="dm-input" value={form.instagram || ''} onChange={handleChange} placeholder="https://instagram.com/..." />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label">Facebook Link</label>
                    <input type="text" name="facebook" className="dm-input" value={form.facebook || ''} onChange={handleChange} placeholder="https://facebook.com/..." />
                  </div>

                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Upload Photo</label>
                    <input type="file" accept="image/*" onChange={handleFileUpload} className="dm-input" style={{padding: '8px'}} />
                    {form.photo && <p style={{fontSize: '12px', color: '#10B981', marginTop: '4px'}}>Current Photo URL: {form.photo}</p>}
                  </div>

                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Bio</label>
                    <textarea name="bio" className="dm-textarea" rows={4} value={form.bio} onChange={handleChange} />
                  </div>
                </div>

                <div className="dm-form-actions">
                  <button className="dm-save-btn" onClick={() => handleSaveLocal('new')} style={{ background: '#10B981' }}>
                    Save Doctor
                  </button>
                  <button className="dm-discard-btn" onClick={cancelEdit}>Discard</button>
                </div>
            </div>
          </div>
        )}

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
                <div className="dm-photo-fallback" style={{ background: doctor.color, display: doctor.photo ? 'none' : 'flex' }}>
                  {doctor.photoFallback || (doctor.name ? doctor.name.slice(0, 2) : 'DR')}
                </div>
              </div>
              <div className="dm-card-info">
                <h3 className="dm-doctor-name" style={{ color: doctor.color }}>{doctor.name}</h3>
                <p className="dm-doctor-title">{doctor.title}</p>
                <p className="dm-doctor-quals">{doctor.qualifications}</p>
                <div className="dm-doctor-stats">
                  {doctor.experience && <span className="dm-stat-chip">{doctor.experience}+ yrs exp</span>}
                  {doctor.surgeries && <span className="dm-stat-chip">{doctor.surgeries} surgeries</span>}
                </div>
              </div>
            </div>

            {/* Inline edit form */}
            {editingId === doctor.id ? (
              <div className="dm-edit-form" id={`doctor-form-${doctor.id}`}>
                <div className="dm-edit-form-header">
                  <h4 className="dm-form-title">✏️ Editing: {doctor.name}</h4>
                  <button className="dm-cancel-btn" onClick={cancelEdit}>✕ Cancel</button>
                </div>

                <div className="dm-form-grid">
                  <div className="dm-field">
                    <label className="dm-label">Full Name</label>
                    <input type="text" name="name" className="dm-input" value={form.name} onChange={handleChange} />
                  </div>
                  <div className="dm-field">
                    <label className="dm-label">Title / Specialty</label>
                    <input type="text" name="title" className="dm-input" value={form.title} onChange={handleChange} />
                  </div>
                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Qualifications</label>
                    <input type="text" name="qualifications" className="dm-input" value={form.qualifications} onChange={handleChange} />
                  </div>
                  
                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Upload New Photo</label>
                    <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                      <input type="file" accept="image/*" onChange={handleFileUpload} className="dm-input" style={{padding: '8px', flex: 1}} />
                    </div>
                    {form.photo && <p style={{fontSize: '12px', color: '#64748b', marginTop: '4px'}}>Current: {form.photo}</p>}
                  </div>

                  <div className="dm-field dm-field--full">
                    <label className="dm-label">Bio</label>
                    <textarea name="bio" className="dm-textarea" rows={5} value={form.bio} onChange={handleChange} />
                  </div>
                </div>

                <div className="dm-form-actions">
                  <button className="dm-save-btn" onClick={() => handleSaveLocal(doctor.id)} style={{ background: doctor.color }}>
                    Save Locally
                  </button>
                  <button className="dm-discard-btn" onClick={cancelEdit}>Discard</button>
                </div>
              </div>
            ) : (
              <div className="dm-card-actions" style={{padding: '16px', display: 'flex', gap: '8px'}}>
                <button className="dm-edit-btn" onClick={() => openEdit(doctor)} style={{ background: doctor.color }}>
                  Edit Profile
                </button>
                <button className="dm-discard-btn" onClick={() => deleteDoctor(doctor.id)} style={{ color: '#ef4444', borderColor: '#ef4444', backgroundColor: 'transparent' }}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="dm-info-note">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Edits are saved locally. You MUST click "Save to Source Code" for them to become permanent.
      </div>
    </div>
  );
}
