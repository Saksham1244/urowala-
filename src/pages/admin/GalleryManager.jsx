import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Plus, Trash2, Eye, EyeOff, Image as ImageIcon, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import './GalleryManager.css';

export default function GalleryManager() {
  const [images, setImagesState] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [loading, setLoading] = useState(true);

  // Upload Form
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);
  const [label, setLabel] = useState('');
  const [category, setCategory] = useState('clinic');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [imgs, sets] = await Promise.all([
        api.gallery.getAll(),
        api.settings.getAll()
      ]);
      setImagesState(imgs);
      setShowGallery(sets['show_gallery'] === 'true');
    } catch (err) {
      toast.error('Failed to load gallery data');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleGallery = async () => {
    const newVal = !showGallery;
    try {
      await api.settings.update('show_gallery', newVal.toString());
      setShowGallery(newVal);
      toast.success(`Gallery is now ${newVal ? 'Visible' : 'Hidden'}`);
    } catch (err) {
      toast.error('Failed to update setting');
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      if (selected.size > 5 * 1024 * 1024) {
        toast.error('Image must be under 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFile(reader.result);
      };
      reader.readAsDataURL(selected);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return toast.error('Please select an image');
    if (!label) return toast.error('Please enter a label');

    setUploading(true);
    try {
      const newItem = await api.gallery.upload({
        label,
        category,
        image: file
      });
      setImagesState([newItem, ...images]);
      setFile(null);
      setLabel('');
      toast.success('Image uploaded successfully');
      // Reset file input
      document.getElementById('gallery-file-input').value = '';
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image?')) return;
    try {
      await api.gallery.delete(id);
      setImagesState(images.filter(i => i.id !== id));
      toast.success('Image deleted');
    } catch (err) {
      toast.error('Failed to delete image');
    }
  };

  if (loading) return <div className="admin-loading">Loading Gallery Manager...</div>;

  return (
    <div className="admin-page gallery-manager">
      <div className="admin-header-row">
        <h2>Gallery Manager</h2>
        <button 
          className={`btn ${showGallery ? 'btn-primary' : 'btn-outline'}`}
          onClick={handleToggleGallery}
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          {showGallery ? <Eye size={18} /> : <EyeOff size={18} />}
          {showGallery ? 'Gallery is Visible' : 'Gallery is Hidden'}
        </button>
      </div>

      <div className="gallery-manager-content">
        {/* Upload Form */}
        <div className="gallery-upload-card card">
          <h3>Upload New Image</h3>
          <form onSubmit={handleUpload} className="gallery-upload-form">
            <div className="form-group">
              <label>Select Image (Max 5MB)</label>
              <input 
                type="file" 
                accept="image/*" 
                id="gallery-file-input"
                className="form-control"
                onChange={handleFileChange}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group" style={{flex: 1}}>
                <label>Image Label / Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. Reception Area"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
              <div className="form-group" style={{flex: 1}}>
                <label>Category</label>
                <select 
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="clinic">Clinic</option>
                  <option value="team">Team</option>
                  <option value="procedures">Procedures</option>
                </select>
              </div>
            </div>

            {file && (
              <div className="gallery-preview">
                <img src={file} alt="Preview" />
              </div>
            )}

            <button type="submit" className="btn btn-primary" disabled={uploading || !file}>
              {uploading ? 'Uploading...' : <><Upload size={18}/> Upload Image</>}
            </button>
          </form>
        </div>

        {/* Image Grid */}
        <div className="gallery-grid-section card">
          <h3>Manage Images ({images.length})</h3>
          {images.length === 0 ? (
            <div className="empty-state">
              <ImageIcon size={48} color="var(--border)" />
              <p>No images in gallery yet.</p>
            </div>
          ) : (
            <div className="admin-gallery-grid">
              {images.map(img => (
                <div key={img.id} className="admin-gallery-item">
                  <div className="admin-gallery-img-wrap">
                    <img src={img.image} alt={img.label} />
                    <button className="btn-delete-img" onClick={() => handleDelete(img.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="admin-gallery-info">
                    <strong>{img.label}</strong>
                    <span className="badge">{img.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
