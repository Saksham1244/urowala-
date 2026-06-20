// ── Urowala Clinic — Doctor Data ──
const doctors = [
  {
    "id": 1,
    "slug": "dr-mohit-sharma",
    "name": "Dr. Mohit Sharma",
    "title": "Senior Urologist & Urological Surgeon",
    "specialty": "Urology & Andrology",
    "specialtyIcon": "Activity",
    "qualifications": "M.B.B.S., MS (General Surgery), MCh Urology (AIIMS)",
    "certifications": [
      "MCh Urology – AIIMS",
      "Laser Urology",
      "Laparoscopy",
      "Andrology"
    ],
    "experience": 5,
    "surgeries": "8,000+",
    "treatments": null,
    "photo": "/doctors/mohit-main.jpg",
    "photoCircle": "/doctors/mohit-circle.jpg",
    "photoPosition": "54% 10%",
    "photoFallback": "MS",
    "color": "#3B82F6",
    "instagram": "https://www.instagram.com/dr.mohit_urowala/",
    "facebook": "https://www.facebook.com/profile.php?id=61584123434000&mibextid=wwXIfr&rdid=kukWtU9x4tlXyP08&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1CqaHPv8uM%2F%3Fmibextid%3DwwXIfr#",
    "bio": "Dr. Mohit Sharma is a highly accomplished urologist with over 5 years of experience in managing complex urological conditions. He completed his MCh in Urology from AIIMS — one of India's premier medical institutions — and has since dedicated himself to providing the highest standard of urological care to patients in Jaipur and beyond. Dr. Sharma specializes in minimally invasive and laser-based surgeries, including URS laser stone treatment, PCNL, TURP, laparoscopic urology, and reconstructive urological procedures.",
    "conditions": [
      "Kidney Stones (URS Laser, PCNL)",
      "Prostate Enlargement (BPH / TURP)",
      "Bladder & Urinary Issues",
      "Laparoscopic Kidney Surgery",
      "Circumcision & Male Urology",
      "Varicocele & Hydrocele",
      "Urinary Tract Infections",
      "Ureteral Stricture & Reconstruction",
      "Male Infertility & Andrology",
      "Urological Cancers"
    ],
    "procedures": [
      "URS (Ureteroscopy) & Laser Stone Surgery",
      "PCNL (Kidney Stone Surgery)",
      "TURP (Prostate Surgery)",
      "Laparoscopic Urology",
      "Cystoscopy",
      "Circumcision",
      "Vasectomy & Reversal",
      "Varicocelectomy & Hydrocelectomy"
    ],
    "availability": "Mon–Sat: 10 AM – 8 PM (Mansarovar)\nMon–Sat: 9–10 AM & 3–5 PM (Sanganer)",
    "photoKey": "mohit"
  },
  {
    "id": 2,
    "slug": "sadas",
    "name": "sadas",
    "title": "sadas",
    "qualifications": "dasd",
    "experience": 33,
    "surgeries": "44444",
    "treatments": "",
    "bio": "asdasdas",
    "photo": "/doctors/nzusicon-1781985395236.jpeg",
    "color": "#0f4c5c"
  }
];

export function getMergedDoctors() {
  let overrides = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem('urowala_doctors_overrides');
      overrides = raw ? JSON.parse(raw) : {};
    } catch (e) {
      // Ignore error
    }
  }

  return doctors.map(doctor => {
    const override = overrides[doctor.id] || {};
    return { ...doctor, ...override };
  });
}

export default doctors;
