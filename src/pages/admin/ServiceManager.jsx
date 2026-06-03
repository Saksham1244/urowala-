import { useState, useEffect } from 'react';
import { getServicesFromStorage, saveServicesToStorage, addService, updateService, deleteService } from '../../data/services.js';
import './ServiceManager.css';

export default function ServiceManager() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setServices(getServicesFromStorage());
  }, []);

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const openEdit = (service = null) => {
    if (service) {
      setEditingId(service.id);
      setForm({
        ...service,
        symptoms: service.symptoms.join('\n'),
        procedures: service.procedures.join('\n')
      });
    } else {
      setEditingId('new');
      setForm({
        title: '', titleHi: '', shortDesc: '', description: '',
        icon: 'Activity', color: '#3B82F6', image: '/services/kidney-stones.jpg',
        symptoms: '', procedures: '', recovery: ''
      });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      symptoms: form.symptoms.split('\n').filter(x => x.trim() !== ''),
      procedures: form.procedures.split('\n').filter(x => x.trim() !== '')
    };

    if (editingId === 'new') {
      const updated = addService(payload);
      setServices(updated);
      showMsg('success', 'Service added successfully!');
    } else {
      const updated = updateService(editingId, payload);
      setServices(updated);
      showMsg('success', 'Service updated successfully!');
    }
    cancelEdit();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const updated = deleteService(id);
      setServices(updated);
      showMsg('success', 'Service deleted successfully!');
    }
  };

  return (
    <div className="service-manager">
      <div className="sm-header" style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div>
          <h1 className="sm-title">Service Manager</h1>
          <p className="sm-subtitle">Manage clinic services displayed on the website.</p>
        </div>
        {!editingId && (
          <button className="sm-save-btn" onClick={() => openEdit(null)}>
            + Add New Service
          </button>
        )}
      </div>

      {message && (
        <div className={`sm-message sm-message--${message.type}`}>
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {editingId ? (
        <div className="sm-edit-form-full">
          <h3>{editingId === 'new' ? 'Add New Service' : 'Edit Service'}</h3>
          <form onSubmit={handleSave} className="sm-form-grid">
            <div className="sm-field">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} required />
            </div>
            <div className="sm-field">
              <label>Title (Hindi)</label>
              <input name="titleHi" value={form.titleHi} onChange={handleChange} />
            </div>
            <div className="sm-field">
              <label>Icon Name (Lucide)</label>
              <input name="icon" value={form.icon} onChange={handleChange} required />
            </div>
            <div className="sm-field">
              <label>Theme Color (Hex)</label>
              <input type="color" name="color" value={form.color} onChange={handleChange} style={{height:'40px', padding:0}}/>
            </div>
            <div className="sm-field sm-col-span-2">
              <label>Short Description</label>
              <input name="shortDesc" value={form.shortDesc} onChange={handleChange} required />
            </div>
            <div className="sm-field sm-col-span-2">
              <label>Full Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows="4" required />
            </div>
            <div className="sm-field">
              <label>Symptoms (One per line)</label>
              <textarea name="symptoms" value={form.symptoms} onChange={handleChange} rows="4" />
            </div>
            <div className="sm-field">
              <label>Procedures (One per line)</label>
              <textarea name="procedures" value={form.procedures} onChange={handleChange} rows="4" />
            </div>
            <div className="sm-field">
              <label>Recovery Time</label>
              <input name="recovery" value={form.recovery} onChange={handleChange} />
            </div>
            <div className="sm-field">
              <label>Image Path</label>
              <input name="image" value={form.image} onChange={handleChange} />
            </div>
            
            <div className="sm-form-actions sm-col-span-2">
              <button type="submit" className="sm-save-btn">Save Service</button>
              <button type="button" className="sm-discard-btn" onClick={cancelEdit}>Cancel</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="sm-grid">
          {services.map(service => (
            <div key={service.id} className="sm-service-card" style={{borderTop: `4px solid ${service.color}`}}>
              <div className="sm-card-meta">
                <h3 className="sm-service-title">{service.title}</h3>
                <p className="sm-service-short">{service.shortDesc}</p>
              </div>
              <div className="sm-card-actions">
                <button className="sm-edit-btn" onClick={() => openEdit(service)}>Edit</button>
                <button className="sm-delete-btn" onClick={() => handleDelete(service.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
