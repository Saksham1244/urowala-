import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './AdminDashboard.css';

export default function ContactManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.contacts.getAll();
      setMessages(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    try {
      await api.contacts.markRead(id);
      setMessages(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const deleteMsg = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await api.contacts.delete(id);
      load();
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const filtered = filter === 'unread' ? messages.filter(m => !m.read)
                 : filter === 'read' ? messages.filter(m => m.read)
                 : messages;

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>💬 Contact Messages</h1>
          <p className="dashboard-date">{messages.length} total · {messages.filter(m => !m.read).length} unread</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'unread', 'read'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: filter === f ? '#8B5CF6' : 'transparent', borderColor: filter === f ? '#8B5CF6' : '#ddd', color: filter === f ? 'white' : '#666' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>No messages found.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((m) => (
            <div key={m.id} style={{
              background: m.read ? 'white' : '#F0F9FF',
              border: `1px solid ${m.read ? '#eee' : '#BAE6FD'}`,
              borderLeft: `4px solid ${m.read ? '#ddd' : '#8B5CF6'}`,
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem' }}>{m.name}</span>
                  {!m.read && <span style={{ background: '#8B5CF6', color: 'white', borderRadius: '12px', padding: '2px 10px', fontSize: '0.72rem', fontWeight: 700 }}>NEW</span>}
                  <span style={{ color: '#999', fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <a href={`tel:${m.phone}`} style={{ color: '#3B82F6', fontWeight: 600, display: 'block', marginBottom: '8px', textDecoration: 'none' }}>📞 {m.phone}</a>
                <p style={{ color: '#444', lineHeight: 1.6, margin: 0 }}>{m.message || '(no message)'}</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                <a href={`https://wa.me/${m.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer"
                  style={{ padding: '6px 14px', background: '#25D366', color: 'white', borderRadius: '8px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, textAlign: 'center' }}>
                  WhatsApp
                </a>
                {!m.read && (
                  <button onClick={() => markRead(m.id)}
                    style={{ padding: '6px 14px', background: '#EDE9FE', color: '#7C3AED', border: '1px solid #C4B5FD', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                    Mark Read
                  </button>
                )}
                <button onClick={() => deleteMsg(m.id)}
                  style={{ padding: '6px 14px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: '8px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
