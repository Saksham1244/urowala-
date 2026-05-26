import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Star, Award, ChevronRight, CheckCircle } from 'lucide-react';
import { getPhotoPosition } from '../utils/photoPosition';
import './Doctors.css';

const doctors = [
  {
    name: 'Dr. Mohit Sharma',
    title: 'Senior Urologist & Urological Surgeon',
    qualifications: 'MBBS, MS (General Surgery), MCh (Urology)',
    photo: '/doctors/mohit.jpg',
    initials: 'MS',
    photoKey: 'mohit',
    photoPosition: 'bottom left',
    color: '#0f4c5c',
    experience: '5+ Years',
    surgeries: '8,000+',
    certifications: ['MCh Urology', 'Laser Urology', 'Laparoscopy'],
    bio: `Dr. Mohit Sharma is a highly accomplished urologist with over 5 years of experience in managing complex urological conditions. He completed his MCh in Urology from a premier institution and has since dedicated himself to providing the highest standard of urological care to patients in Jaipur and beyond.

Dr. Sharma specializes in minimally invasive and laser-based surgeries, including URS laser stone treatment, PCNL, TURP, laparoscopic urology, and reconstructive urological procedures. His patient-first approach, technical precision, and commitment to continuous learning have earned him the trust of thousands of patients.

He is known for his ability to clearly explain complex conditions in simple terms, ensuring patients are well-informed and comfortable before any procedure.`,
    conditions: [
      'Kidney Stones (URS Laser, PCNL)',
      'Prostate Enlargement (BPH / TURP)',
      'Bladder & Urinary Issues',
      'Laparoscopic Kidney Surgery',
      'Circumcision & Male Urology',
      'Varicocele & Hydrocele',
      'Urinary Tract Infections',
      'Ureteral Stricture & Reconstruction',
    ],
  },
  {
    name: 'Dr. Priyanka Sharma',
    title: 'Dermatologist & Skin Specialist',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy)',
    photo: '/doctors/priyanka.jpg',
    initials: 'PS',
    photoKey: 'priyanka',
    photoPosition: 'top center',
    color: '#7c3aed',
    experience: '10+ Years',
    surgeries: '5,000+',
    certifications: ['MD Dermatology', 'Laser Skin', 'Aesthetic Medicine'],
    bio: `Dr. Priyanka Sharma is a board-certified dermatologist with an MD in Dermatology, Venereology, and Leprosy. With over 10 years of clinical experience, she has treated thousands of patients suffering from a wide range of skin conditions — from common concerns like acne and pigmentation to complex chronic skin disorders.

Dr. Priyanka is passionate about combining evidence-based medicine with the latest aesthetic procedures to help patients achieve healthy, confident skin. She specializes in medical dermatology, laser treatments, and cosmetic procedures.

Her empathetic approach and thorough consultations make every patient feel heard and cared for. She regularly participates in national dermatology conferences and workshops to stay at the forefront of her field.`,
    conditions: [
      'Acne & Acne Scarring',
      'Pigmentation & Melasma',
      'Eczema & Psoriasis',
      'Hair Loss (Alopecia)',
      'Laser Skin Treatments',
      'Anti-Ageing & Botox',
      'Skin Allergies & Rashes',
      'Vitiligo Management',
    ],
  },
  {
    name: 'Dr. Rahul Sharma',
    title: 'Chief Plastic Surgeon',
    qualifications: 'MBBS, MS (General Surgery), MCh (Plastic Surgery)',
    photo: '/doctors/rahul.jpg',
    initials: 'RS',
    photoKey: 'rahul',
    photoPosition: 'top center',
    color: '#8B5CF6',
    experience: '10+ Years',
    surgeries: '5,000+',
    certifications: ['MCh Plastic Surgery', 'Aesthetic Surgery', 'Reconstructive Surgery'],
    bio: `Dr. Rahul Sharma is a board-certified plastic and reconstructive surgeon with over 10 years of experience and over 5,000 successful surgeries. A graduate of SMS Medical College, Jaipur, he specializes in both reconstructive and aesthetic surgical procedures.

His artistic precision and surgical skill have made him one of Rajasthan's most respected plastic surgeons. He is committed to providing life-changing results with a focus on patient safety, minimal scarring, and natural-looking outcomes.

Whether it's reconstructive surgery post-trauma or elective cosmetic procedures, Dr. Rahul ensures every patient receives personalized care and realistic expectations.`,
    conditions: [
      'Reconstructive Surgery',
      'Burn Scars & Trauma',
      'Hair Transplantation',
      'Liposuction & Body Contouring',
      'Rhinoplasty (Nose Reshaping)',
      'Breast Augmentation/Reduction',
      'Facelift & Anti-Aging',
      'Gynecomastia Treatment',
    ],
  },
];

function DoctorCard({ doc }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="doctor-card">
      <div className="doctor-card-inner">
        {/* Photo */}
        <div className="doctor-photo-wrap">
          {!imgError ? (
            <img
              src={doc.photo}
              alt={doc.name}
              className="doctor-photo"
              style={{ objectPosition: getPhotoPosition(doc.photoKey, doc.photoPosition) }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className="doctor-initials"
              style={{ background: doc.color }}
            >
              {doc.initials}
            </div>
          )}
          <div className="doctor-experience-badge">
            <Star size={14} fill="#f97316" color="#f97316" />
            {doc.experience}
          </div>
        </div>

        {/* Info */}
        <div className="doctor-info">
          <div className="doctor-certs">
            {doc.certifications.map((c, i) => (
              <span key={i} className="doctor-cert-badge">
                <Award size={12} /> {c}
              </span>
            ))}
          </div>

          <h2 className="doctor-name">{doc.name}</h2>
          <p className="doctor-title">{doc.title}</p>
          <p className="doctor-quals">{doc.qualifications}</p>

          <div className="doctor-stats">
            <div className="doctor-stat">
              <span className="doctor-stat-num">{doc.experience}</span>
              <span className="doctor-stat-lbl">Experience</span>
            </div>
            <div className="doctor-stat-divider" />
            <div className="doctor-stat">
              <span className="doctor-stat-num">{doc.surgeries}</span>
              <span className="doctor-stat-lbl">Procedures</span>
            </div>
          </div>

          <div className="doctor-bio">
            {doc.bio.split('\n\n').map((para, i) => (
              <p key={i}>{para.trim()}</p>
            ))}
          </div>

          {doc.conditions && (
            <div className="doctor-conditions">
              <h4 className="doctor-conditions-title">Conditions Treated</h4>
              <div className="doctor-conditions-grid">
                {doc.conditions.map((c, i) => (
                  <div key={i} className="doctor-condition-item">
                    <CheckCircle size={14} color="var(--primary, #0f4c5c)" />
                    <span>{c}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <a
            href="https://wa.me/9039570761"
            target="_blank"
            rel="noopener noreferrer"
            className="doctor-book-btn"
          >
            <MessageCircle size={18} />
            Book Appointment via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  return (
    <div className="doctors-page">
      {/* Hero */}
      <section className="doctors-hero">
        <div className="doctors-hero-overlay" />
        <div className="doctors-hero-content">
          <p className="doctors-hero-sub">Our Team</p>
          <h1 className="doctors-hero-title">Meet Our Specialist Doctors</h1>
          <p className="doctors-hero-desc">
            Experienced, compassionate, and board-certified — our doctors are dedicated to delivering
            the best outcomes for every patient at Urowala Clinic.
          </p>
          <div className="doctors-hero-divider" />
        </div>
      </section>

      {/* Doctors */}
      <section className="doctors-section">
        <div className="doctors-container">
          {doctors.map((doc, i) => (
            <DoctorCard key={i} doc={doc} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="doctors-cta">
        <div className="doctors-cta-inner">
          <h2 className="doctors-cta-title">Ready to consult our specialists?</h2>
          <p className="doctors-cta-desc">
            Book your appointment easily via WhatsApp or visit either of our two clinics in Jaipur.
          </p>
          <div className="doctors-cta-btns">
            <a
              href="https://wa.me/9039570761"
              target="_blank"
              rel="noopener noreferrer"
              className="doctors-cta-btn-primary"
            >
              <MessageCircle size={18} />
              WhatsApp Us
            </a>
            <Link to="/contact" className="doctors-cta-btn-secondary">
              Find Our Clinics <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
