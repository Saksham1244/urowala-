import 'dotenv/config';
import { db } from './db/index.js';
import { doctors, services, blogs, admins } from './db/schema.js';
import bcrypt from 'bcryptjs';

async function seed() {
  console.log('🌱 Seeding database...');

  // ── Create admin ──────────────────────────────────────────────────────────
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  await db.insert(admins).values({
    username: process.env.ADMIN_USERNAME,
    passwordHash: hash,
  }).onConflictDoNothing();
  console.log('✅ Admin created');

  // ── Seed Doctors ──────────────────────────────────────────────────────────
  await db.insert(doctors).values([
    {
      slug: 'dr-mohit-sharma',
      name: 'Dr. Mohit Sharma',
      title: 'Chief Urology Surgeon',
      specialty: 'Urology',
      specialtyIcon: '🫀',
      qualifications: 'M.B.B.S., MS, MCh Urology (AIIMS Bhopal)',
      certifications: ['Board Certified Kidney and Stones Specialist'],
      experience: 5,
      surgeries: '2,000+',
      treatments: null,
      photo: '/doctors/mohit.jpg',
      photoFallback: 'MS',
      color: '#41B8C9',
      bio: 'Dr. Mohit Sharma is a highly accomplished urological surgeon with a specialization in kidney and stone disease management. A graduate of AIIMS Bhopal with an MCh in Urology, he has performed over 2,000 successful surgeries. His expertise spans laser stone surgery (URS), PCNL, TURP, and advanced laparoscopic urology procedures.',
      conditions: ['Kidney Stones', 'Urinary Tract Infections', 'Prostate Enlargement (BPH)', 'Urinary Incontinence', 'Bladder Issues', 'Male Infertility', 'Erectile Dysfunction', 'Hematuria (Blood in Urine)'],
      procedures: ['URS Laser Stone Surgery', 'PCNL', 'TURP', 'Cystoscopy', 'Circumcision', 'Varicocelectomy'],
      availability: 'Mon–Sat: 10 AM – 8 PM (Mansarovar) | 9–10 AM & 3–5 PM (Sanganer)',
    },
    {
      slug: 'dr-priyanka-sharma',
      name: 'Dr. Priyanka Sharma',
      title: 'Chief Dermatologist',
      specialty: 'Dermatology',
      specialtyIcon: '✨',
      qualifications: 'M.B.B.S., MD (SMS Jaipur)',
      certifications: ['Board Certified Skin and Hair Specialist'],
      experience: 11,
      surgeries: null,
      treatments: '3,00,000+',
      photo: '/doctors/priyanka.jpg',
      photoFallback: 'PS',
      color: '#FF6C00',
      bio: 'Dr. Priyanka Sharma is a board-certified dermatologist with 11 years of experience and over 3,00,000 successful treatments. A graduate of SMS Medical College, Jaipur, she specializes in comprehensive skin and hair care including advanced laser treatments, hair restoration, and cosmetic dermatology.',
      conditions: [],
      procedures: [],
      availability: 'Mon–Sat: 10 AM – 8 PM',
    },
    {
      slug: 'dr-rahul-sharma',
      name: 'Dr. Rahul Sharma',
      title: 'Chief Plastic Surgeon',
      specialty: 'Plastic Surgery',
      specialtyIcon: '🏥',
      qualifications: 'M.B.B.S., MS, MCh Plastic Surgery (SMS Jaipur)',
      certifications: ['Board Certified Skin and Hair Specialist'],
      experience: 10,
      surgeries: '5,000+',
      treatments: null,
      photo: '/doctors/rahul.jpg',
      photoFallback: 'RS',
      color: '#8B5CF6',
      bio: 'Dr. Rahul Sharma is a board-certified plastic and reconstructive surgeon with 10 years of experience and over 5,000 successful surgeries. A graduate of SMS Medical College, Jaipur, he specializes in both reconstructive and aesthetic surgical procedures.',
      conditions: [],
      procedures: [],
      availability: 'Mon–Sat: 10 AM – 8 PM (Mansarovar)',
    },
  ]).onConflictDoNothing();
  console.log('✅ Doctors seeded');

  // ── Seed Services ─────────────────────────────────────────────────────────
  await db.insert(services).values([
    {
      slug: 'kidney-stone-treatment',
      icon: '🫀',
      title: 'Kidney Stone Treatment',
      shortDesc: 'Advanced laser and surgical treatment for kidney stones with minimal recovery time.',
      description: 'We offer comprehensive kidney stone management from diagnosis to treatment. Our advanced laser lithotripsy and PCNL procedures ensure complete stone clearance with minimal downtime.',
      symptoms: ['Severe back or side pain', 'Pain radiating to groin', 'Blood in urine', 'Nausea/vomiting', 'Frequent urination', 'Burning sensation while urinating'],
      procedures: ['URS Laser Stone Surgery', 'PCNL (Percutaneous Nephrolithotomy)', 'ESWL (Shock Wave Lithotripsy)', 'Medical Expulsive Therapy'],
      recovery: '1–3 days for laser, 1 week for PCNL',
      color: '#41B8C9',
    },
    {
      slug: 'prostate-treatment',
      icon: '🎯',
      title: 'Prostate Treatment',
      shortDesc: 'Expert diagnosis and treatment for all prostate conditions including BPH and prostate cancer.',
      description: 'Our urologists specialize in managing all prostate conditions using the latest minimally invasive techniques. TURP and laser prostatectomy are performed with precision.',
      symptoms: ['Frequent urination (especially at night)', 'Weak urine stream', 'Difficulty starting urination', 'Inability to completely empty bladder', 'Blood in urine or semen'],
      procedures: ['TURP (Transurethral Resection)', 'Laser Prostatectomy', 'Prostate Biopsy', 'PSA Testing'],
      recovery: '1–2 weeks',
      color: '#FF6C00',
    },
    {
      slug: 'urinary-disorders',
      icon: '💧',
      title: 'Urinary Disorders',
      shortDesc: 'Complete care for UTIs, bladder dysfunction, incontinence and other urinary conditions.',
      description: 'We provide comprehensive evaluation and treatment for all urinary tract disorders including infections, incontinence, bladder dysfunction, and structural abnormalities.',
      symptoms: ['Urinary incontinence', 'Painful urination', 'Frequent UTIs', 'Bladder spasms', 'Overactive bladder', 'Hematuria'],
      procedures: ['Cystoscopy', 'Urodynamic Testing', 'Bladder Instillation', 'Antibiotic Therapy', 'Surgical Correction'],
      recovery: 'Varies by condition',
      color: '#06B6D4',
    },
    {
      slug: 'male-reproductive-health',
      icon: '♂️',
      title: 'Male Reproductive Health',
      shortDesc: 'Specialised treatment for male infertility, erectile dysfunction and sexual health.',
      description: 'Our team provides sensitive and expert care for all male reproductive health concerns, from infertility evaluation to surgical treatment of varicocele and hydrocele.',
      symptoms: ['Infertility', 'Erectile dysfunction', 'Varicocele', 'Hydrocele', 'Penile disorders', 'Testicular pain'],
      procedures: ['Varicocelectomy', 'Hydrocelectomy', 'Vasectomy/Reversal', 'Sperm Analysis', 'Testosterone Testing'],
      recovery: '1–2 weeks for surgical procedures',
      color: '#8B5CF6',
    },
    {
      slug: 'laparoscopic-urology',
      icon: '🔬',
      title: 'Laparoscopic Urology',
      shortDesc: 'Minimally invasive keyhole surgery for complex urological conditions.',
      description: 'Advanced laparoscopic techniques allow complex urological surgeries through tiny incisions, reducing pain, scarring and recovery time significantly.',
      symptoms: ['Complex kidney conditions', 'Ureteral strictures', 'Adrenal tumors', 'Bladder reconstruction needs'],
      procedures: ['Laparoscopic Nephrectomy', 'Laparoscopic Pyeloplasty', 'Adrenalectomy', 'Laparoscopic Ureterolithotomy'],
      recovery: '3–5 days hospital stay',
      color: '#10B981',
    },
    {
      slug: 'circumcision-minor-procedures',
      icon: '✂️',
      title: 'Circumcision & Minor Procedures',
      shortDesc: 'Safe and precise surgical procedures including circumcision, cystoscopy, and more.',
      description: 'We perform a wide range of minor urological procedures with highest surgical precision in a safe clinical environment with proper anesthesia and post-operative care.',
      symptoms: ['Phimosis', 'Recurrent balanitis', 'Bladder evaluation needs', 'Urethral stricture'],
      procedures: ['Circumcision', 'Cystoscopy', 'Urethral Dilation', 'Meatotomy', 'Catheterization'],
      recovery: '3–7 days',
      color: '#F59E0B',
    },
  ]).onConflictDoNothing();
  console.log('✅ Services seeded');

  // ── Seed Sample Blogs ─────────────────────────────────────────────────────
  await db.insert(blogs).values([
    {
      slug: 'understanding-kidney-stones-causes-prevention',
      title: 'Understanding Kidney Stones: Causes, Symptoms & Prevention',
      category: 'Urology',
      author: 'Dr. Mohit Sharma',
      authorTitle: 'Chief Urology Surgeon, Urowala Clinic',
      readTime: 6,
      excerpt: 'Kidney stones affect millions worldwide. Learn about their causes, how to recognize symptoms early, and powerful prevention strategies.',
      content: `## What Are Kidney Stones?\n\nKidney stones are hard deposits of minerals and salts that form inside your kidneys. They can be as small as a grain of sand or as large as a golf ball.\n\n## Common Causes\n\n- **Dehydration** — Not drinking enough water is the #1 cause\n- **High oxalate diet** — Spinach, nuts, chocolate, tea\n- **High sodium intake** — Salt increases calcium in urine\n- **Family history** — Genetic predisposition\n\n## Warning Signs\n\n- Severe, sharp pain in your back or side\n- Pain radiating to the lower abdomen and groin\n- Pink, red or brown urine\n- Nausea and vomiting\n- Frequent urination\n\n## Prevention Tips\n\n**Drink more water** — Aim for 2.5–3 litres daily. Your urine should be pale yellow.\n\n**Reduce sodium** — Cut down on processed foods and salt.\n\n**Limit animal protein** — Reduces uric acid and calcium in urine.\n\n**Eat calcium-rich foods** — Contrary to belief, dietary calcium actually helps prevent stones.\n\n## When to See a Doctor\n\nIf you experience severe pain, blood in urine, or fever with urinary symptoms, consult a urologist immediately. Early treatment prevents complications.\n\n*Dr. Mohit Sharma — Chief Urology Surgeon at Urowala Clinic, Jaipur*`,
      published: true,
      featured: true,
      tags: ['kidney stones', 'urology', 'prevention', 'hydration'],
    },
    {
      slug: 'laser-surgery-kidney-stones-complete-guide',
      title: 'Laser Surgery for Kidney Stones: A Complete Guide',
      category: 'Urology',
      author: 'Dr. Mohit Sharma',
      authorTitle: 'Chief Urology Surgeon, Urowala Clinic',
      readTime: 8,
      excerpt: 'URS Laser stone surgery is the gold standard for treating kidney and ureteric stones. Here\'s everything you need to know.',
      content: `## What is URS Laser Surgery?\n\nUreteroscopy (URS) with Holmium laser is a minimally invasive procedure to break and remove kidney and ureteric stones without any incisions.\n\n## How It Works\n\n1. A thin, flexible telescope (ureteroscope) is passed through the urethra and bladder into the ureter\n2. The Holmium laser fibre fragments the stone into tiny pieces\n3. Fragments are either removed or pass naturally\n\n## Advantages\n\n- **No cuts or incisions** required\n- **Day surgery** — go home the same day\n- **High success rate** — over 95% stone clearance\n- **Minimal pain** — local or general anaesthesia\n- **Quick recovery** — back to work in 1–2 days\n\n## Who is it For?\n\nIdeal for stones in the ureter (5–20mm) and kidney (up to 2cm). For larger stones, PCNL may be recommended.\n\n## What to Expect\n\n- Procedure takes 30–60 minutes\n- A ureteric stent may be placed temporarily\n- Mild discomfort for 2–3 days\n- Follow-up in 1 week\n\n*Consult Dr. Mohit Sharma at Urowala Clinic for a personalised evaluation.*`,
      published: true,
      featured: false,
      tags: ['laser surgery', 'URS', 'kidney stones', 'minimally invasive'],
    },
  ]).onConflictDoNothing();
  console.log('✅ Sample blogs seeded');

  console.log('\n🎉 Database seeding complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
