import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { savePhotoPositions, loadPhotoPositions } from '../../utils/photoPosition';

const DOCTORS = [
  { key: 'mohit',    name: 'Dr. Mohit Sharma',    photo: '/doctors/mohit.jpg',    initials: 'MS', color: '#0f4c5c' },
  { key: 'priyanka', name: 'Dr. Priyanka Sharma', photo: '/doctors/priyanka.jpg', initials: 'PS', color: '#7c3aed' },
  { key: 'rahul',   name: 'Dr. Rahul Sharma',    photo: '/doctors/rahul.jpg',    initials: 'RS', color: '#8B5CF6' },
];

export default function PhotoSettings() {
  const [positions, setPositions] = useState(loadPhotoPositions);
  const [active, setActive] = useState('mohit');
  const [dragging, setDragging] = useState(false);
  const previewRef = useRef(null);

  const doc = DOCTORS.find(d => d.key === active);
  const currentPos = positions[active] || '50% 20%';

  const parsePos = (pos) => {
    const parts = pos.split(' ');
    return { x: parseFloat(parts[0]), y: parseFloat(parts[1]) };
  };
  const { x: dotX, y: dotY } = parsePos(currentPos);

  const handlePreviewClick = (e) => {
    const rect = previewRef.current.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setPositions(prev => ({ ...prev, [active]: `${x}% ${y}%` }));
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    handlePreviewClick(e);
  };

  const handleSave = () => {
    savePhotoPositions(positions);
    toast.success('Photo positions saved! Refresh the Doctors page to see changes.');
  };

  const handleReset = () => {
    const defaults = { mohit: '20% 80%', priyanka: '50% 20%', rahul: '50% 20%' };
    setPositions(prev => ({ ...prev, [active]: defaults[active] }));
    toast('Reset to default position');
  };

  const handleResetAll = () => {
    if (!window.confirm('Reset ALL doctors to default positions?')) return;
    const defaults = { mohit: '20% 80%', priyanka: '50% 20%', rahul: '50% 20%' };
    setPositions(defaults);
    savePhotoPositions(defaults);
    toast.success('All positions reset');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '6px' }}>
          📸 Doctor Photo Settings
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Click anywhere on the photo preview to reposition the focal point. The dot shows where the photo will be centred.
        </p>
      </div>

      {/* Doctor Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {DOCTORS.map(d => (
          <button key={d.key} onClick={() => setActive(d.key)} style={{
            padding: '10px 20px', borderRadius: '100px',
            border: `2px solid ${active === d.key ? d.color : '#e2e8f0'}`,
            background: active === d.key ? d.color : 'white',
            color: active === d.key ? 'white' : 'var(--text-dark)',
            fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
            transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{
              width: 28, height: 28, borderRadius: '50%',
              background: active === d.key ? 'rgba(255,255,255,0.3)' : d.color + '22',
              color: active === d.key ? 'white' : d.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.7rem', fontWeight: 800,
            }}>{d.initials}</span>
            {d.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '24px', alignItems: 'start' }}>

        {/* Photo Preview */}
        <div>
          <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Click or drag on the photo to set the focal point
          </p>
          <div ref={previewRef} onClick={handlePreviewClick}
            onMouseDown={() => setDragging(true)} onMouseUp={() => setDragging(false)}
            onMouseLeave={() => setDragging(false)} onMouseMove={handleMouseMove}
            style={{
              position: 'relative', width: '100%', height: '480px',
              borderRadius: '16px', overflow: 'hidden', cursor: 'crosshair',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)', border: `3px solid ${doc.color}`,
              userSelect: 'none',
            }}>
            <img src={doc.photo} alt={doc.name} draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: currentPos, display: 'block', pointerEvents: 'none' }}
            />
            <div style={{
              position: 'absolute', left: `${dotX}%`, top: `${dotY}%`,
              transform: 'translate(-50%, -50%)', width: '28px', height: '28px',
              borderRadius: '50%', background: doc.color, border: '3px solid white',
              boxShadow: '0 0 0 3px ' + doc.color + '66, 0 4px 12px rgba(0,0,0,0.4)',
              pointerEvents: 'none', transition: dragging ? 'none' : 'left 0.15s, top 0.15s',
            }} />
            <div style={{ position: 'absolute', left: `${dotX}%`, top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.4)', transform: 'translateX(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: `${dotY}%`, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.4)', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: 'white', padding: '6px 14px', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600 }}>
              Focal point: {dotX}% {dotY}%
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-dark)' }}>Quick Presets</h3>
            {[
              { label: '↖ Top Left',   val: '20% 15%' }, { label: '⬆ Top Centre', val: '50% 15%' }, { label: '↗ Top Right',  val: '80% 15%' },
              { label: '◀ Mid Left',   val: '20% 50%' }, { label: '⏺ Centre',      val: '50% 50%' }, { label: '▶ Mid Right',  val: '80% 50%' },
              { label: '↙ Bot Left',   val: '20% 80%' }, { label: '⬇ Bot Centre', val: '50% 80%' }, { label: '↘ Bot Right',  val: '80% 80%' },
            ].map(p => (
              <button key={p.val} onClick={() => setPositions(prev => ({ ...prev, [active]: p.val }))}
                style={{
                  display: 'inline-block', margin: '3px', padding: '6px 10px', borderRadius: '8px',
                  border: `1.5px solid ${currentPos === p.val ? doc.color : '#e2e8f0'}`,
                  background: currentPos === p.val ? doc.color + '18' : 'white',
                  color: currentPos === p.val ? doc.color : 'var(--text-dark)',
                  fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                }}>{p.label}</button>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '16px', color: 'var(--text-dark)' }}>Fine Tune (X / Y %)</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Horizontal (X): {dotX}%</label>
                <input type="range" min="0" max="100" value={dotX}
                  onChange={e => setPositions(prev => ({ ...prev, [active]: `${e.target.value}% ${dotY}%` }))}
                  style={{ width: '100%', accentColor: doc.color }} />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Vertical (Y): {dotY}%</label>
                <input type="range" min="0" max="100" value={dotY}
                  onChange={e => setPositions(prev => ({ ...prev, [active]: `${dotX}% ${e.target.value}%` }))}
                  style={{ width: '100%', accentColor: doc.color }} />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={handleSave} style={{ padding: '12px', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem', background: doc.color, color: 'white', border: 'none', cursor: 'pointer', boxShadow: `0 4px 16px ${doc.color}44` }}>
              💾 Save All Changes
            </button>
            <button onClick={handleReset} style={{ padding: '10px', borderRadius: '12px', fontWeight: 600, fontSize: '0.85rem', background: 'white', color: 'var(--text-muted)', border: '1.5px solid #e2e8f0', cursor: 'pointer' }}>
              ↩ Reset This Doctor
            </button>
            <button onClick={handleResetAll} style={{ padding: '10px', borderRadius: '12px', fontWeight: 600, fontSize: '0.85rem', background: 'white', color: '#ef4444', border: '1.5px solid #fecaca', cursor: 'pointer' }}>
              🗑 Reset All Doctors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
