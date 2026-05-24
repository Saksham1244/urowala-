import { useState } from 'react';
import { MapPin, Phone, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import './Contact.css';

const locations = [
  {
    id: 1,
    name: 'Mansarovar Clinic',
    address: '122, Mohan Nagar Gate No. 8, Mansarovar Link Road, near Mangalam Electronic Market, Ridhhi Sidhhi Circle, Jaipur 302018',
    phones: ['+91 9414780777', '+91 7976219661'],
    hours: [
      { day: 'Mon – Sat', time: '10:00 AM – 8:00 PM' },
      { day: 'Sunday', time: '10:00 AM – 2:00 PM' },
    ],
    color: '#0f4c5c',
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.5!2d75.7!3d26.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU0JzAwLjAiTiA3NcKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1000000000000!5m2!1sen!2sin',
    mapLink: 'https://maps.app.goo.gl/eG3XoKtF89FdqCxt6',
  },
  {
    id: 2,
    name: 'Sanganer Clinic',
    address: '21, G P Colony, New Sanganer Road, near Pradhan Vatika Marriage Garden, Mansarovar, Sanganer, Jaipur 302020',
    phones: ['+91 9414002993', '+91 7976173504'],
    hours: [
      { day: 'Mon – Sat', time: '9:00 AM – 10:00 AM & 3:00 PM – 5:00 PM' },
      { day: 'Sunday', time: 'Closed' },
    ],
    color: '#0d9488',
    mapLink: 'https://maps.google.com/?q=Sanganer+Jaipur',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: '', phone: '', message: '' });
    }, 1200);
  };

  return (
    <div className="contact-page">
      {/* Hero */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <div className="contact-hero-content">
          <p className="contact-hero-sub">Get in Touch</p>
          <h1 className="contact-hero-title">Contact Urowala Clinic</h1>
          <p className="contact-hero-desc">
            Visit us at either of our two Jaipur locations or get in touch via phone or WhatsApp.
            We're here to help.
          </p>
          <div className="contact-hero-divider" />
        </div>
      </section>

      {/* Location Cards */}
      <section className="contact-locations-section">
        <div className="contact-container">
          <div className="contact-locations-grid">
            {locations.map((loc) => (
              <div className="contact-location-card" key={loc.id} style={{ borderTop: `4px solid ${loc.color}` }}>
                <div className="contact-loc-header">
                  <div className="contact-loc-icon" style={{ background: loc.color }}>
                    <MapPin size={20} color="#fff" />
                  </div>
                  <h2 className="contact-loc-name" style={{ color: loc.color }}>{loc.name}</h2>
                </div>
                <p className="contact-loc-address">{loc.address}</p>

                <div className="contact-loc-detail">
                  <Phone size={16} color={loc.color} />
                  <div>
                    {loc.phones.map((p, i) => (
                      <a key={i} href={`tel:${p.replace(/\s/g, '')}`} className="contact-loc-phone">
                        {p}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="contact-loc-hours">
                  <div className="contact-loc-hours-header">
                    <Clock size={16} color={loc.color} />
                    <span>Clinic Hours</span>
                  </div>
                  {loc.hours.map((h, i) => (
                    <div key={i} className="contact-loc-hour-row">
                      <span className="contact-loc-day">{h.day}</span>
                      <span className="contact-loc-time" style={{ color: loc.color }}>{h.time}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={loc.mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-loc-directions"
                  style={{ color: loc.color, borderColor: loc.color }}
                >
                  <MapPin size={14} /> Get Directions
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="contact-map-section">
        <div className="contact-container">
          <h2 className="contact-map-title">Find Our Mansarovar Clinic</h2>
          <div className="contact-map-wrap">
            <iframe
              title="Urowala Clinic Mansarovar"
              src="https://maps.google.com/maps?q=Mansarovar+Link+Road+Jaipur+Mohan+Nagar&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="380"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="contact-map-note">
            🗺 For exact directions, use:{' '}
            <a href="https://maps.app.goo.gl/eG3XoKtF89FdqCxt6" target="_blank" rel="noopener noreferrer">
              Open in Google Maps
            </a>
          </p>
        </div>
      </section>

      {/* Contact Form + WhatsApp */}
      <section className="contact-form-section">
        <div className="contact-container">
          <div className="contact-form-layout">
            {/* Form */}
            <div className="contact-form-card">
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-sub">
                Fill in the form below and our team will get back to you shortly.
              </p>

              {submitted ? (
                <div className="contact-success">
                  <CheckCircle size={48} color="#10b981" />
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll contact you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="contact-send-again">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      required
                    />
                  </div>
                  <div className="contact-form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows={4}
                    />
                  </div>
                  <button type="submit" className="contact-submit-btn" disabled={loading}>
                    {loading ? (
                      <span className="contact-spinner" />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* WhatsApp Quick Contact */}
            <div className="contact-whatsapp-card">
              <div className="contact-wa-icon">
                <MessageCircle size={40} color="#25D366" fill="#25D366" />
              </div>
              <h3>Quick Contact via WhatsApp</h3>
              <p>
                The fastest way to reach us! Chat with our team directly on WhatsApp and get a
                response within minutes.
              </p>
              <a
                href="https://wa.me/9039570761"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-wa-btn"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              <div className="contact-quick-phones">
                <p className="contact-quick-phones-label">Or call us directly:</p>
                <a href="tel:+919414780777" className="contact-quick-phone">
                  <Phone size={15} /> +91 9414780777
                </a>
                <a href="tel:+919039570761" className="contact-quick-phone">
                  <Phone size={15} /> +91 9039570761
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
