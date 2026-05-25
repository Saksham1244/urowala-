// ── Urowala Clinic — Blog Data (localStorage-backed) ──

const defaultBlogs = [
  {
    id: 1,
    slug: 'kidney-stones-causes-prevention',
    title: 'Kidney Stones: Causes, Symptoms & When to See a Doctor',
    titleHi: 'गुर्दे की पथरी: कारण, लक्षण और डॉक्टर से कब मिलें',
    category: 'Urology',
    author: 'Dr. Mohit Sharma',
    authorTitle: 'Chief Urology Surgeon',
    date: '2025-05-01',
    readTime: 6,
    coverImage: '/blog/kidney-stones.jpg',
    coverFallbackColor: '#3B82F6',
    excerpt: 'Kidney stones are increasingly common in India, especially in hot climates like Rajasthan. Learn what causes them, how to prevent them, and when you urgently need surgery.',
    content: `
## What Are Kidney Stones?

Kidney stones (urolithiasis) are hard mineral deposits that form in your kidneys when urine becomes concentrated. They can affect any part of your urinary tract — from kidneys to bladder.

## Common Causes

- **Dehydration**: The most common cause, especially in Rajasthan's hot climate
- **High salt diet**: Increases calcium in urine
- **High protein diet**: Increases uric acid levels
- **Family history**: Genetics play a significant role
- **Obesity**: Changes the acid levels in urine
- **Certain medications**: Including calcium supplements

## Warning Symptoms

- Severe, cramping pain in back/side below the ribs
- Pain radiating to lower abdomen and groin
- Blood in urine (pink, red, or brown urine)
- Nausea and vomiting
- Persistent urge to urinate
- Fever and chills (sign of infection — seek immediate care)

## Treatment Options at Urowala

At Urowala Clinic, we offer:

1. **URS with Laser Lithotripsy** — For stones in the ureter, a thin scope is passed and laser breaks the stone
2. **PCNL** — For large kidney stones, a small incision in the back allows direct stone removal
3. **Medical Management** — For small stones, medications and hydration may pass them naturally

## Prevention Tips

- Drink 2.5–3 litres of water daily
- Reduce salt intake
- Limit oxalate-rich foods (spinach, nuts, chocolate)
- Reduce animal protein
- Take prescribed medications if you have recurrent stones

If you experience any warning symptoms, **call Urowala Clinic immediately** — early treatment prevents complications.
    `,
    published: true,
    featured: true,
    tags: ['Kidney Stones', 'Urology', 'Prevention'],
  },
  {
    id: 2,
    slug: 'prostate-health-men-over-50',
    title: 'Prostate Health: What Every Man Over 40 Should Know',
    titleHi: '40 के बाद प्रोस्टेट स्वास्थ्य',
    category: 'Urology',
    author: 'Dr. Mohit Sharma',
    authorTitle: 'Chief Urology Surgeon',
    date: '2025-04-15',
    readTime: 5,
    coverImage: '/blog/prostate.jpg',
    coverFallbackColor: '#8B5CF6',
    excerpt: 'Prostate enlargement affects 1 in 2 men over 50. Early detection and modern laser surgery can resolve symptoms permanently. Here\'s what you need to know.',
    content: `
## The Prostate Gland

The prostate is a small walnut-sized gland that sits below the bladder in men. It surrounds the urethra and produces fluid that nourishes sperm. As men age, the prostate naturally enlarges.

## BPH: Benign Prostatic Hyperplasia

BPH (enlarged prostate) is not cancer, but it causes significant urinary symptoms:

- Frequent urination, especially at night
- Weak or interrupted urine stream
- Difficulty starting urination
- Feeling of incomplete bladder emptying
- Urinary urgency

## When to Be Concerned

See a doctor if you experience:
- Complete inability to urinate (acute urinary retention)
- Blood in urine
- Urinary tract infections
- Kidney problems from blocked urine

## Treatment at Urowala

**TURP with Laser** — Our preferred minimally invasive approach. The enlarged prostate tissue is vaporized using laser energy. Benefits:
- No external incision
- 1-2 night hospital stay
- Dramatic improvement in urine flow
- Safe for older patients

**Medications** — Alpha-blockers and 5-alpha reductase inhibitors can manage mild to moderate symptoms.

## Prostate Cancer Screening

All men over 50 (or 40 if family history exists) should have annual PSA blood tests. Early-stage prostate cancer is highly curable.

Book a consultation at Urowala Clinic today.
    `,
    published: true,
    featured: false,
    tags: ['Prostate', 'BPH', 'Men\'s Health'],
  },
  {
    id: 3,
    slug: 'skin-care-tips-summer-jaipur',
    title: 'Summer Skin Care in Jaipur: Expert Tips from Dr. Priyanka Sharma',
    titleHi: 'जयपुर की गर्मी में त्वचा की देखभाल',
    category: 'Dermatology',
    author: 'Dr. Priyanka Sharma',
    authorTitle: 'Chief Dermatologist',
    date: '2025-05-10',
    readTime: 4,
    coverImage: '/blog/skincare.jpg',
    coverFallbackColor: '#E879A0',
    excerpt: 'Jaipur\'s harsh summer can wreak havoc on your skin. Dr. Priyanka Sharma shares evidence-based skincare tips to keep your skin healthy during the hottest months.',
    content: `
## Summer & Skin: The Jaipur Challenge

Jaipur summers are intense — temperatures soar above 45°C and UV index reaches extreme levels. This causes:
- Sun damage and tanning
- Acne breakouts from sweat and oil
- Dehydration of skin
- Heat rashes and prickly heat
- Worsening of conditions like melasma

## Dr. Priyanka's Summer Skincare Routine

### Morning
1. Gentle face wash (avoid harsh scrubs in summer)
2. Vitamin C serum — protects against UV damage
3. **Sunscreen SPF 50+ PA++++** — apply generously, reapply every 2-3 hours
4. Light, oil-free moisturizer

### Evening
1. Double cleanse — micellar water then face wash
2. Retinol or niacinamide (only at night)
3. Heavier moisturizer for overnight repair

## Common Summer Skin Problems

**Acne Breakouts**: Hormonal + sweat-related. Use salicylic acid face wash. Avoid heavy creams.

**Tanning**: Use broad-spectrum SPF religiously. Medical-grade lightening creams available at Urowala Clinic.

**Heat Rash (Prickly Heat)**: Keep skin cool and dry. Calamine lotion provides relief.

**Melasma**: Worsens in summer. See Dr. Priyanka for prescription-strength treatment.

## Professional Treatments Available

- **Chemical Peels** — lightens pigmentation, improves skin texture
- **Laser Toning** — targets deep pigmentation
- **HydraFacial** — intense hydration for dehydrated summer skin

Book a consultation with Dr. Priyanka Sharma at Urowala Clinic.
    `,
    published: true,
    featured: false,
    tags: ['Dermatology', 'Summer', 'Skin Care'],
  },
];

// ── Blog Store (localStorage-backed) ──
export const getBlogsFromStorage = () => {
  try {
    const stored = localStorage.getItem('urowala_blogs');
    if (stored) return JSON.parse(stored);
    // Initialize with defaults
    localStorage.setItem('urowala_blogs', JSON.stringify(defaultBlogs));
    return defaultBlogs;
  } catch {
    return defaultBlogs;
  }
};

export const saveBlogsToStorage = (blogs) => {
  localStorage.setItem('urowala_blogs', JSON.stringify(blogs));
};

export const addBlog = (blog) => {
  const blogs = getBlogsFromStorage();
  const newBlog = {
    ...blog,
    id: Date.now(),
    slug: blog.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    date: new Date().toISOString().split('T')[0],
    published: true,
  };
  const updated = [...blogs, newBlog];
  saveBlogsToStorage(updated);
  return updated;
};

export const updateBlog = (id, updates) => {
  const blogs = getBlogsFromStorage();
  const updated = blogs.map(b => b.id === id ? { ...b, ...updates } : b);
  saveBlogsToStorage(updated);
  return updated;
};

export const deleteBlog = (id) => {
  const blogs = getBlogsFromStorage();
  const updated = blogs.filter(b => b.id !== id);
  saveBlogsToStorage(updated);
  return updated;
};

export default defaultBlogs;
