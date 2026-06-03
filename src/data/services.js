// ── Urowala Clinic — Urology Services Data ──
const defaultServices = [
  {
    id: 1,
    slug: 'kidney-stones',
    icon: 'Activity',
    title: 'Kidney Stones',
    titleHi: 'गुर्दे की पथरी',
    shortDesc: 'Advanced laser and surgical techniques for complete kidney stone removal with minimal recovery time.',
    description: 'Kidney stones are one of the most common urological conditions. At Urowala Clinic, Dr. Mohit Sharma uses the latest laser lithotripsy (URS) and PCNL techniques to remove stones of all sizes with high success rates and minimal pain.',
    symptoms: ['Severe back/flank pain', 'Blood in urine', 'Nausea and vomiting', 'Frequent urination', 'Burning sensation while urinating'],
    procedures: ['URS (Ureteroscopy) with Laser', 'PCNL (Percutaneous Nephrolithotomy)', 'ESWL (Shock Wave Therapy)', 'Mini PCNL'],
    recovery: '1–5 days (depending on procedure)',
    image: '/services/kidney-stones.jpg',
    color: '#3B82F6',
  },
  {
    id: 2,
    slug: 'prostate-conditions',
    icon: 'Microscope',
    title: 'Prostate Conditions',
    titleHi: 'प्रोस्टेट रोग',
    shortDesc: 'Expert diagnosis and treatment of prostate enlargement, prostate cancer and related conditions.',
    description: 'Prostate conditions affect millions of men. Our expert team offers comprehensive evaluation and treatment for BPH (enlarged prostate), prostate cancer, and prostatitis using the latest minimally invasive techniques.',
    symptoms: ['Frequent urination especially at night', 'Weak urine stream', 'Difficulty starting urination', 'Blood in urine or semen', 'Pelvic discomfort'],
    procedures: ['TURP (Laser Prostate Surgery)', 'Transperineal Prostate Biopsy', 'Holmium Laser Enucleation', 'Laparoscopic Radical Prostatectomy'],
    recovery: '2–7 days',
    image: '/services/prostate.jpg',
    color: '#8B5CF6',
  },
  {
    id: 3,
    slug: 'bladder-disorders',
    icon: 'Droplets',
    title: 'Bladder Disorders',
    titleHi: 'मूत्राशय रोग',
    shortDesc: 'Complete care for bladder conditions including bladder cancer, overactive bladder, and incontinence.',
    description: 'Bladder disorders range from mild inconveniences to serious conditions requiring specialist care. We diagnose and treat the full spectrum of bladder conditions with individualized treatment plans.',
    symptoms: ['Urinary urgency/frequency', 'Urinary incontinence', 'Painful urination', 'Blood in urine', 'Incomplete bladder emptying'],
    procedures: ['Flexible Cystoscopy', 'TURBT (Bladder Tumor Resection)', 'Urodynamic Studies', 'Bladder Instillations'],
    recovery: '1–7 days',
    image: '/services/bladder.jpg',
    color: '#F59E0B',
  },
  {
    id: 4,
    slug: 'male-health',
    icon: 'UserPlus',
    title: 'Male Health & Fertility',
    titleHi: 'पुरुष स्वास्थ्य',
    shortDesc: 'Comprehensive men\'s health services including male infertility, erectile dysfunction, and andrology.',
    description: 'We offer complete men\'s health services with a compassionate, confidential approach. From fertility evaluation to advanced surgical treatments, our team provides evidence-based care for all aspects of male health.',
    symptoms: ['Male infertility', 'Erectile dysfunction', 'Premature ejaculation', 'Low testosterone', 'Scrotal pain/swelling'],
    procedures: ['TESA/PESA (Sperm Retrieval)', 'Varicocelectomy', 'Hydrocelectomy', 'Circumcision', 'Vasectomy'],
    recovery: '1–5 days',
    image: '/services/male-health.jpg',
    color: '#10B981',
  },
  {
    id: 5,
    slug: 'kidney-cancer',
    icon: 'ShieldAlert',
    title: 'Kidney & Urological Cancer',
    titleHi: 'किडनी कैंसर',
    shortDesc: 'Advanced oncological urology with laparoscopic and robotic surgery for kidney, bladder and prostate cancers.',
    description: 'Early detection and expert surgical treatment are key to successful cancer outcomes. Dr. Mohit Sharma specializes in minimally invasive oncological surgery including laparoscopic and robotic techniques for the best possible outcomes.',
    symptoms: ['Blood in urine', 'Unexplained weight loss', 'Persistent back pain', 'Fatigue', 'Abdominal lump'],
    procedures: ['Laparoscopic Nephrectomy', 'Robotic Surgery', 'Radical Cystectomy', 'Retroperitoneal Lymph Node Dissection'],
    recovery: '5–14 days',
    image: '/services/cancer.jpg',
    color: '#EF4444',
  },
  {
    id: 6,
    slug: 'urinary-tract',
    icon: 'Syringe',
    title: 'Urinary Tract Infections',
    titleHi: 'मूत्र पथ संक्रमण',
    shortDesc: 'Expert management of recurrent UTIs, urethral strictures, and urinary tract abnormalities.',
    description: 'Recurrent urinary tract infections and structural abnormalities require specialist evaluation. We provide comprehensive assessment and treatment to resolve persistent infections and anatomical issues.',
    symptoms: ['Burning urination', 'Frequent urination', 'Cloudy or foul-smelling urine', 'Lower abdominal pain', 'Fever with chills'],
    procedures: ['Cystoscopy', 'Urethroplasty', 'Urethral Dilation', 'Antibiotic Management', 'Internal Urethrotomy'],
    recovery: '1–3 days',
    image: '/services/uti.jpg',
    color: '#06B6D4',
  },
];

// ── Services Store (localStorage-backed) ──
export const getServicesFromStorage = () => {
  try {
    const stored = localStorage.getItem('urowala_services_v2');
    if (stored) return JSON.parse(stored);
    
    // Check old overrides to migrate
    const oldOverridesStr = localStorage.getItem('urowala_services_overrides');
    let initialServices = [...defaultServices];
    if (oldOverridesStr) {
      try {
        const oldOverrides = JSON.parse(oldOverridesStr);
        initialServices = initialServices.map(s => ({ ...s, ...(oldOverrides[s.id] || {}) }));
      } catch (e) {
        console.error(e);
      }
    }

    localStorage.setItem('urowala_services_v2', JSON.stringify(initialServices));
    return initialServices;
  } catch {
    return [...defaultServices];
  }
};

export const saveServicesToStorage = (services) => {
  localStorage.setItem('urowala_services_v2', JSON.stringify(services));
};

export const addService = (service) => {
  const services = getServicesFromStorage();
  const newService = {
    ...service,
    id: Date.now(),
    slug: service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  };
  const updated = [...services, newService];
  saveServicesToStorage(updated);
  return updated;
};

export const updateService = (id, updates) => {
  const services = getServicesFromStorage();
  const updated = services.map(s => s.id === id ? { ...s, ...updates } : s);
  saveServicesToStorage(updated);
  return updated;
};

export const deleteService = (id) => {
  const services = getServicesFromStorage();
  const updated = services.filter(s => s.id !== id);
  saveServicesToStorage(updated);
  return updated;
};

export default defaultServices;
