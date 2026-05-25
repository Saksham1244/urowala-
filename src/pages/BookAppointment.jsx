import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, Phone, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import doctors from '../data/doctors.js';
import { api } from '../services/api';
import './BookAppointment.css';

const timeSlots = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','12:00 PM','3:00 PM','3:30 PM','4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM'];

export default function BookAppointment() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name:'',phone:'',doctor:'',date:'',time:'',reason:'' });
  const [submitted, setSubmitted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    try {
      await api.appointments.book({
        name: form.name,
        phone: form.phone,
        doctor: form.doctor,
        preferredDate: form.date,
        preferredTime: form.time,
        reason: form.reason
      });
      // Optionally still open WhatsApp for instant chat (uncomment below if desired)
      // const msg = `Hello Urowala Clinic! I would like to book an appointment.%0A%0AName: ${form.name}%0APhone: ${form.phone}%0ADoctor: ${form.doctor}%0ADate: ${form.date}%0ATime: ${form.time}%0AReason: ${form.reason}`;
      // window.open(`https://wa.me/9039570761?text=${msg}`, '_blank');
      setSubmitted(true);
    } catch (err) {
      alert('Failed to send request: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appt-page">
      <section className="page-hero">
        <div className="container">
          <div className="section-label" style={{background:'rgba(255,255,255,0.15)',color:'white',display:'inline-flex',margin:'0 auto 16px'}}>
            <Calendar size={14}/> Book Now
          </div>
          <h1>Book an Appointment</h1>
          <p>Schedule a consultation with our expert specialists. Available 7 days a week.</p>
          <div className="page-hero__breadcrumb"><Link to="/">Home</Link> <span>/</span> <span>Book Appointment</span></div>
        </div>
      </section>

      <section className="section">
        <div className="container appt-container">
          <div className="appt-form-col">
            {!submitted ? (
              <>
                <h2>Fill in Your Details</h2>
                <p style={{color:'var(--text-muted)',marginBottom:'32px'}}>We'll confirm your appointment via WhatsApp within a few hours.</p>
                <form onSubmit={handleSubmit} className="appt-form">
                  <div className="appt-form__row">
                    <div className="form-group">
                      <label><User size={14}/> {t('appointment.name')} *</label>
                      <input className="form-control" placeholder={t('appointment.namePlaceholder')} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/>
                    </div>
                    <div className="form-group">
                      <label><Phone size={14}/> {t('appointment.phone')} *</label>
                      <input className="form-control" type="tel" placeholder={t('appointment.phonePlaceholder')} value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required/>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('appointment.doctor')}</label>
                    <select className="form-control" value={form.doctor} onChange={e=>setForm({...form,doctor:e.target.value})}>
                      <option value="">{t('appointment.selectDoctor')}</option>
                      {doctors.map(d=><option key={d.id} value={d.name}>{d.name} — {d.title}</option>)}
                    </select>
                  </div>
                  <div className="appt-form__row">
                    <div className="form-group">
                      <label><Calendar size={14}/> {t('appointment.date')}</label>
                      <input className="form-control" type="date" value={form.date} min={new Date().toISOString().split('T')[0]} onChange={e=>setForm({...form,date:e.target.value})}/>
                    </div>
                    <div className="form-group">
                      <label><Clock size={14}/> {t('appointment.time')}</label>
                      <select className="form-control" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}>
                        <option value="">{t('appointment.selectTime')}</option>
                        {timeSlots.map(s=><option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>{t('appointment.reason')}</label>
                    <textarea className="form-control" rows={4} placeholder={t('appointment.reasonPlaceholder')} value={form.reason} onChange={e=>setForm({...form,reason:e.target.value})}/>
                  </div>
                  <button type="submit" className="btn btn-accent btn-lg" style={{width:'100%',justifyContent:'center'}} disabled={loading}>
                    {loading ? 'Sending...' : <><MessageCircle size={20}/> {t('appointment.submit')}</>}
                  </button>
                </form>
              </>
            ) : (
              <div className="appt-success">
                <div className="appt-success__icon"><CheckCircle size={64} color="var(--primary)"/></div>
                <h2>Appointment Request Sent!</h2>
                <p>Your appointment request has been sent via WhatsApp. Our team will confirm your slot shortly.</p>
                <button onClick={()=>setSubmitted(false)} className="btn btn-primary">Book Another Appointment</button>
                <Link to="/" className="btn btn-outline" style={{borderColor:'var(--primary)',color:'var(--primary)'}}>Back to Home</Link>
              </div>
            )}
          </div>
          <div className="appt-info-col">
            <div className="appt-info-card">
              <h3>Contact Details</h3>
              <div className="appt-contacts">
                <div className="appt-contact-item">
                  <strong>Mansarovar Clinic</strong>
                  <a href="tel:+91 90395 70761"><Phone size={14}/> +91 90395 70761</a>
                  <a href="tel:+917976219661"><Phone size={14}/> +91 79762 19661</a>
                  <div className="appt-hours"><Clock size={12}/> Mon–Sat: 10 AM–8 PM | Sun: 10 AM–2 PM</div>
                </div>
                <div className="appt-contact-item">
                  <strong>Sanganer Clinic</strong>
                  <a href="tel:+919414002993"><Phone size={14}/> +91 94140 02993</a>
                  <div className="appt-hours"><Clock size={12}/> Mon–Sat: 9–10 AM &amp; 3–5 PM | Sun: Closed</div>
                </div>
              </div>
              <a href="https://wa.me/9039570761" target="_blank" rel="noreferrer"
                className="btn btn-accent" style={{width:'100%',justifyContent:'center',marginTop:'20px'}}>
                <MessageCircle size={16}/> WhatsApp Us Directly
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
