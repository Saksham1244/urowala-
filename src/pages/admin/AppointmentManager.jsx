import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import './AdminDashboard.css';

const STATUS_COLORS = {
  pending: '#F59E0B',
  confirmed: '#10B981',
  cancelled: '#EF4444',
};

export default function AppointmentManager() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    setLoading(true);
    try {
      const data = await api.appointments.getAll();
      setAppointments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.appointments.updateStatus(id, status);
      load();
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const deleteAppt = async (id) => {
    if (!confirm('Delete this appointment?')) return;
    try {
      await api.appointments.delete(id);
      load();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const [viewMode, setViewMode] = useState('list'); // 'list' | 'calendar'
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const getWhatsAppLink = (a) => {
    let msg = '';
    if (a.status === 'confirmed') {
      const timeStr = a.preferredTime && a.preferredDate ? `${a.preferredTime} on ${a.preferredDate}` : (a.preferredTime || 'your requested time');
      const docStr = a.doctor || 'our doctor';
      msg = `Hello ${a.name}, your appointment is confirmed at ${timeStr} for ${docStr}. Please arrive 20 min prior to the appointment.`;
    } else {
      msg = `Hello ${a.name}, regarding your appointment request at Urowala Clinic...`;
    }
    return `https://wa.me/${a.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);

  // Calendar Logic
  const nextMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  const prevMonth = () => setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
  
  const renderCalendar = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const cells = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let i = 1; i <= daysInMonth; i++) cells.push(new Date(year, month, i));

    // Pad end
    while (cells.length % 7 !== 0) cells.push(null);

    return (
      <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #eee', overflowX: 'auto' }}>
        <div style={{ minWidth: '700px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <button onClick={prevMonth} className="dash-btn dash-btn--outline" style={{ padding: '6px 12px' }}>← Prev</button>
            <h2 style={{ margin: 0, fontSize: '1.2rem' }}>
              {calendarMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <button onClick={nextMonth} className="dash-btn dash-btn--outline" style={{ padding: '6px 12px' }}>Next →</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', fontWeight: 'bold', marginBottom: '8px', color: '#666' }}>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => <div key={d}>{d}</div>)}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
            {cells.map((date, idx) => {
              if (!date) return <div key={idx} style={{ padding: '40px 8px', background: '#f9f9f9', borderRadius: '8px' }} />;
              
              // local format to YYYY-MM-DD to match preferredDate
              const dateStr = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
              const dayAppts = filtered.filter(a => a.preferredDate === dateStr);
              
              const isToday = new Date().toDateString() === date.toDateString();

              return (
                <div key={idx} style={{ padding: '8px', minHeight: '100px', background: isToday ? '#e0f2fe' : 'white', border: `1px solid ${isToday ? '#7dd3fc' : '#eee'}`, borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem', color: isToday ? '#0284c7' : '#333' }}>{date.getDate()}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto', flex: 1 }}>
                    {dayAppts.map(a => (
                      <div key={a.id} style={{ padding: '4px', fontSize: '0.7rem', background: STATUS_COLORS[a.status] + '20', borderLeft: `3px solid ${STATUS_COLORS[a.status]}`, borderRadius: '4px', textAlign: 'left', lineHeight: 1.2 }}>
                        <strong style={{ color: STATUS_COLORS[a.status] }}>{a.preferredTime || '?'}</strong><br/>
                        {a.name.split(' ')[0]} ({a.doctor ? a.doctor.split(' ')[1] : ''})
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>📅 Appointment Requests</h1>
          <p className="dashboard-date">{appointments.length} total · {appointments.filter(a => a.status === 'pending').length} pending</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => setViewMode('list')} className={`dash-btn ${viewMode === 'list' ? 'dash-btn--primary' : 'dash-btn--outline'}`}>📝 List View</button>
          <button onClick={() => setViewMode('calendar')} className={`dash-btn ${viewMode === 'calendar' ? 'dash-btn--primary' : 'dash-btn--outline'}`}>🗓️ Calendar View</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {['all', 'pending', 'confirmed', 'cancelled'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            style={{ padding: '6px 16px', borderRadius: '20px', border: '2px solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', background: filter === f ? '#3B82F6' : 'transparent', borderColor: filter === f ? '#3B82F6' : '#ddd', color: filter === f ? 'white' : '#666' }}>
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f !== 'all' && <span style={{ marginLeft: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '10px', padding: '0 6px', fontSize: '0.75rem' }}>{appointments.filter(a => a.status === f).length}</span>}
          </button>
        ))}
      </div>

      {loading ? <p>Loading...</p> : appointments.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#999' }}>No appointments found.</div>
      ) : viewMode === 'calendar' ? (
        renderCalendar()
      ) : (
        <div className="dashboard-table-wrap">
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Patient</th>
                <th>Phone</th>
                <th>Doctor</th>
                <th>Preferred Date</th>
                <th>Time</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td style={{ color: '#999', fontSize: '0.8rem' }}>#{a.id}</td>
                  <td style={{ fontWeight: 600 }}>{a.name}</td>
                  <td><a href={`tel:${a.phone}`} style={{ color: '#3B82F6' }}>{a.phone}</a></td>
                  <td>{a.doctor || '—'}</td>
                  <td>{a.preferredDate || '—'}</td>
                  <td>{a.preferredTime || '—'}</td>
                  <td style={{ maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.reason || '—'}</td>
                  <td>
                    <select
                      value={a.status}
                      onChange={(e) => updateStatus(a.id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '8px', border: `2px solid ${STATUS_COLORS[a.status] || '#ddd'}`, color: STATUS_COLORS[a.status] || '#333', fontWeight: 700, cursor: 'pointer', background: 'white', fontSize: '0.8rem' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ display: 'flex', gap: '8px' }}>
                    <a href={getWhatsAppLink(a)} target="_blank" rel="noreferrer"
                      style={{ padding: '4px 10px', background: '#25D366', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '0.8rem', fontWeight: 600 }}>
                      WhatsApp
                    </a>
                    <button onClick={() => deleteAppt(a.id)}
                      style={{ padding: '4px 10px', background: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
