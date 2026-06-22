import { useState, useEffect, useCallback, useRef } from 'react';
import { getBlogsFromStorage, addBlog, updateBlog, deleteBlog } from '../../data/blogs.js';
import { api } from '../../services/api';
import './BlogManager.css';

const CATEGORIES = ['Urology'];

const emptyForm = {
  title: '',
  category: 'Urology',
  author: '',
  readTime: 5,
  coverImage: '',
  excerpt: '',
  content: '',
  published: true,
  featured: false,
};

function formatDate(dateStr) {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'short', day: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

/** Convert a File to a base64 data-URL string */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);
  const [blogVisible, setBlogVisible] = useState(false);
  const [savingVisibility, setSavingVisibility] = useState(false);

  // Image upload state
  const [coverUploading, setCoverUploading] = useState(false);
  const [contentUploading, setContentUploading] = useState(false);
  const coverInputRef = useRef(null);
  const contentInputRef = useRef(null);
  const contentTextareaRef = useRef(null);

  const loadBlogs = useCallback(() => {
    setBlogs(getBlogsFromStorage());
  }, []);

  useEffect(() => {
    loadBlogs();
    api.settings.getAll().then(res => {
      setBlogVisible(res.blog_visible === 'true');
    }).catch(() => {});
  }, [loadBlogs]);

  const handleVisibilityToggle = async () => {
    const newVal = !blogVisible;
    setSavingVisibility(true);
    try {
      await api.settings.update('blog_visible', String(newVal));
      setBlogVisible(newVal);
      showMsg('success', `Blog section ${newVal ? 'enabled' : 'hidden'} on website!`);
    } catch {
      showMsg('error', 'Failed to update visibility. Please try again.');
    } finally {
      setSavingVisibility(false);
    }
  };

  const showMsg = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3500);
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('blog-form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const openEditForm = (blog) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title || '',
      category: blog.category || 'Urology',
      author: blog.author || '',
      readTime: blog.readTime || 5,
      coverImage: blog.coverImage || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      published: blog.published !== false,
      featured: blog.featured || false,
    });
    setErrors({});
    setShowForm(true);
    setTimeout(() => {
      document.getElementById('blog-form-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setErrors({});
  };

  const validate = () => {
    const errs = {};
    if (!form.title.trim()) errs.title = 'Title is required.';
    if (!form.content.trim()) errs.content = 'Content is required.';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  // ── Cover Image Upload ──────────────────────────────────────────────────────
  const handleCoverUpload = async (e) => {
    const file = e.target?.files?.[0] || e;
    if (!file || !file.type) return;
    if (!file.type.startsWith('image/')) { showMsg('error', 'Please select a valid image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { showMsg('error', 'Image must be smaller than 5 MB.'); return; }
    setCoverUploading(true);
    try {
      const base64 = await fileToBase64(file);
      setForm((prev) => ({ ...prev, coverImage: base64 }));
    } catch {
      showMsg('error', 'Failed to process image. Try again.');
    } finally {
      setCoverUploading(false);
      if (e.target) e.target.value = '';
    }
  };

  const handleCoverFileInput = (e) => {
    const file = e.target.files?.[0];
    if (file) handleCoverUpload(file);
    e.target.value = '';
  };

  const removeCoverImage = () => setForm((prev) => ({ ...prev, coverImage: '' }));

  // ── Content Image Upload ────────────────────────────────────────────────────
  const handleContentImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showMsg('error', 'Please select a valid image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { showMsg('error', 'Image must be smaller than 5 MB.'); return; }
    setContentUploading(true);
    try {
      const base64 = await fileToBase64(file);
      const altText = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      const markdownImg = `\n![${altText}](${base64})\n`;

      const textarea = contentTextareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const current = form.content;
        const newContent = current.slice(0, start) + markdownImg + current.slice(end);
        setForm((prev) => ({ ...prev, content: newContent }));
        setTimeout(() => {
          textarea.focus();
          const pos = start + markdownImg.length;
          textarea.setSelectionRange(pos, pos);
        }, 50);
      } else {
        setForm((prev) => ({ ...prev, content: prev.content + markdownImg }));
      }
      showMsg('success', 'Image inserted into content!');
    } catch {
      showMsg('error', 'Failed to insert image. Try again.');
    } finally {
      setContentUploading(false);
      e.target.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      if (editingId !== null) {
        const updated = updateBlog(editingId, { ...form, readTime: Number(form.readTime) });
        setBlogs(updated);
        showMsg('success', 'Blog updated successfully!');
      } else {
        const updated = addBlog({ ...form, readTime: Number(form.readTime) });
        setBlogs(updated);
        showMsg('success', 'Blog added successfully!');
      }
      closeForm();
    } catch {
      showMsg('error', 'Something went wrong. Please try again.');
    }
  };

  const handleDelete = (blog) => {
    if (!window.confirm(`Delete "${blog.title}"? This cannot be undone.`)) return;
    try {
      const updated = deleteBlog(blog.id);
      setBlogs(updated);
      showMsg('success', `"${blog.title}" deleted.`);
    } catch {
      showMsg('error', 'Failed to delete blog.');
    }
  };

  return (
    <div className="blog-manager">
      {/* Visibility Toggle */}
      <div className="bm-visibility-card">
        <div className="bm-visibility-info">
          <div className="bm-visibility-icon">{blogVisible ? '🌐' : '🙈'}</div>
          <div>
            <h3 className="bm-visibility-title">Blog Section on Website</h3>
            <p className="bm-visibility-desc">
              {blogVisible ? 'Blog is currently visible to visitors.' : 'Blog is hidden from public.'}
            </p>
          </div>
        </div>
        <button
          className={`bm-visibility-toggle ${blogVisible ? 'bm-visibility-toggle--on' : 'bm-visibility-toggle--off'}`}
          onClick={handleVisibilityToggle}
          disabled={savingVisibility}
        >
          <span className="bm-toggle-knob" />
          <span className="bm-toggle-label-text">{savingVisibility ? 'Saving…' : blogVisible ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="bm-header">
        <div>
          <h1 className="bm-title">Blog Manager</h1>
          <p className="bm-subtitle">{blogs.length} blog{blogs.length !== 1 ? 's' : ''} total</p>
        </div>
        <button className="bm-add-btn" onClick={showForm ? closeForm : openAddForm}>
          {showForm && editingId === null ? (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Cancel</>
          ) : (
            <><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add New Blog</>
          )}
        </button>
      </div>

      {message && (
        <div className={`bm-message bm-message--${message.type}`} role="alert">
          {message.type === 'success' ? '✅' : '❌'} {message.text}
        </div>
      )}

      {/* Form Panel */}
      {showForm && (
        <div className="bm-form-panel" id="blog-form-panel">
          <div className="bm-form-header">
            <h2 className="bm-form-title">{editingId !== null ? '✏️ Edit Blog' : '✍️ Add New Blog'}</h2>
            <button className="bm-close-btn" onClick={closeForm} title="Close">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <form className="bm-form" onSubmit={handleSubmit} noValidate>
            <div className="bm-form-grid">

              {/* Title */}
              <div className={`bm-field bm-field--full ${errors.title ? 'bm-field--error' : ''}`}>
                <label className="bm-label">Title <span className="req">*</span></label>
                <input type="text" name="title" className="bm-input" placeholder="Enter blog title…" value={form.title} onChange={handleChange} />
                {errors.title && <span className="bm-error-msg">{errors.title}</span>}
              </div>

              {/* Category */}
              <div className="bm-field">
                <label className="bm-label">Category</label>
                <select name="category" className="bm-select" value={form.category} onChange={handleChange}>
                  {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              {/* Author */}
              <div className="bm-field">
                <label className="bm-label">Author</label>
                <input type="text" name="author" className="bm-input" placeholder="e.g. Dr. Mohit Sharma" value={form.author} onChange={handleChange} />
              </div>

              {/* Read Time */}
              <div className="bm-field">
                <label className="bm-label">Read Time (minutes)</label>
                <input type="number" name="readTime" className="bm-input" min="1" max="60" value={form.readTime} onChange={handleChange} />
              </div>

              {/* ── COVER IMAGE ─────────────────────────────────────────────────── */}
              <div className="bm-field bm-field--full">
                <label className="bm-label">
                  Cover Image
                  <span className="bm-label-hint"> — shown at the top of the blog post &amp; in the blog listing</span>
                </label>

                {form.coverImage ? (
                  <div className="bm-cover-preview">
                    <img src={form.coverImage} alt="Cover preview" className="bm-cover-img" />
                    <div className="bm-cover-actions">
                      <button type="button" className="bm-img-btn bm-img-btn--change"
                        onClick={() => coverInputRef.current?.click()} disabled={coverUploading}>
                        🔄 Change Image
                      </button>
                      <button type="button" className="bm-img-btn bm-img-btn--remove" onClick={removeCoverImage}>
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="bm-upload-zone"
                    onClick={() => coverInputRef.current?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('bm-upload-zone--drag'); }}
                    onDragLeave={(e) => e.currentTarget.classList.remove('bm-upload-zone--drag')}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('bm-upload-zone--drag');
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleCoverUpload(file);
                    }}
                  >
                    {coverUploading ? (
                      <div className="bm-upload-loading"><div className="bm-spinner" /><span>Processing…</span></div>
                    ) : (
                      <>
                        <div className="bm-upload-icon">🖼️</div>
                        <p className="bm-upload-text"><strong>Click to upload</strong> or drag &amp; drop</p>
                        <p className="bm-upload-hint">PNG, JPG, WebP — max 5 MB</p>
                      </>
                    )}
                  </div>
                )}
                <input ref={coverInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleCoverFileInput} />
              </div>

              {/* Excerpt */}
              <div className="bm-field bm-field--full">
                <label className="bm-label">Excerpt</label>
                <textarea name="excerpt" className="bm-textarea" rows={3} placeholder="Short summary shown in blog listing…" value={form.excerpt} onChange={handleChange} />
              </div>

              {/* ── CONTENT + IMAGE INSERTION ────────────────────────────────────── */}
              <div className={`bm-field bm-field--full ${errors.content ? 'bm-field--error' : ''}`}>
                <label className="bm-label">
                  Content <span className="req">*</span>
                  <span className="bm-label-hint"> (Markdown: ## H2, **bold**, - lists)</span>
                </label>

                <div className="bm-content-toolbar">
                  <button
                    type="button"
                    className="bm-img-insert-btn"
                    onClick={() => contentInputRef.current?.click()}
                    disabled={contentUploading}
                    title="Upload image and insert at cursor"
                  >
                    {contentUploading
                      ? <><div className="bm-spinner bm-spinner--sm" /> Inserting image…</>
                      : <><span>🖼</span> Insert Image at Cursor</>
                    }
                  </button>
                  <span className="bm-toolbar-hint">Click inside the text area first to set cursor position, then click Insert Image</span>
                </div>

                <textarea
                  ref={contentTextareaRef}
                  name="content"
                  className="bm-textarea bm-textarea--content"
                  rows={14}
                  placeholder={"Write blog content here…\n\n## Section Heading\n**Bold text**, - bullet point\n\nClick 'Insert Image at Cursor' above to add photos inside the article."}
                  value={form.content}
                  onChange={handleChange}
                />
                {errors.content && <span className="bm-error-msg">{errors.content}</span>}
                <input ref={contentInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleContentImageUpload} />
              </div>

              {/* Toggles */}
              <div className="bm-field bm-toggles-row">
                <label className="bm-toggle-label">
                  <input type="checkbox" name="published" checked={form.published} onChange={handleChange} className="bm-checkbox" />
                  <span className="bm-toggle-text">
                    <span className="bm-toggle-title">Published</span>
                    <span className="bm-toggle-desc">Show on website</span>
                  </span>
                </label>
                <label className="bm-toggle-label">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} className="bm-checkbox" />
                  <span className="bm-toggle-text">
                    <span className="bm-toggle-title">Featured</span>
                    <span className="bm-toggle-desc">Highlight on homepage</span>
                  </span>
                </label>
              </div>
            </div>

            <div className="bm-form-actions">
              <button type="button" className="bm-btn bm-btn--cancel" onClick={closeForm}>Cancel</button>
              <button type="submit" className="bm-btn bm-btn--save">
                {editingId !== null ? '💾 Update Blog' : '🚀 Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Table */}
      <div className="bm-table-section">
        <div className="bm-table-header">
          <h2 className="bm-section-title">All Blogs</h2>
        </div>
        {blogs.length === 0 ? (
          <div className="bm-empty">
            <span className="bm-empty-icon">📭</span>
            <p>No blogs yet. Click <strong>Add New Blog</strong> to get started.</p>
          </div>
        ) : (
          <div className="bm-table-wrap">
            <table className="bm-table">
              <thead>
                <tr>
                  <th>Cover</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      {blog.coverImage
                        ? <img src={blog.coverImage} alt={blog.title} className="bm-table-thumb" />
                        : <div className="bm-table-thumb-empty">🖼</div>
                      }
                    </td>
                    <td className="bm-td-title">
                      <p className="bm-blog-title">{blog.title}</p>
                      {blog.featured && <span className="featured-badge">⭐ Featured</span>}
                    </td>
                    <td><span className="bm-cat-badge">{blog.category}</span></td>
                    <td className="bm-td-author">{blog.author || '—'}</td>
                    <td className="bm-td-date">{formatDate(blog.date)}</td>
                    <td>
                      <span className={`bm-status ${blog.published ? 'bm-status--pub' : 'bm-status--draft'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td>
                      <div className="bm-actions">
                        <button className="bm-action-btn bm-action-btn--edit" onClick={() => openEditForm(blog)} title="Edit">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          Edit
                        </button>
                        <button className="bm-action-btn bm-action-btn--delete" onClick={() => handleDelete(blog)} title="Delete">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
