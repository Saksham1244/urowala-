import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PUBLIC_DIR = path.join(__dirname, '../../public/doctors');
const DATA_FILE = path.join(__dirname, '../../src/data/doctors.js');

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });
    cb(null, PUBLIC_DIR);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    cb(null, `${name}-${Date.now()}${ext}`);
  }
});

const upload = multer({ storage });

router.post('/upload-doctor', upload.single('photo'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const photoUrl = `/doctors/${req.file.filename}`;
  res.json({ photoUrl });
});

router.post('/save-doctors', (req, res) => {
  try {
    const newDoctors = req.body.doctors;
    if (!Array.isArray(newDoctors)) return res.status(400).json({ error: 'Invalid data' });
    
    const fileContent = `// ── Urowala Clinic — Doctor Data ──\nconst doctors = ${JSON.stringify(newDoctors, null, 2)};\n\nexport function getMergedDoctors() {\n  let overrides = {};\n  if (typeof window !== 'undefined') {\n    try {\n      const raw = localStorage.getItem('urowala_doctors_overrides');\n      overrides = raw ? JSON.parse(raw) : {};\n    } catch (e) {\n      // Ignore error\n    }\n  }\n\n  return doctors.map(doctor => {\n    const override = overrides[doctor.id] || {};\n    return { ...doctor, ...override };\n  });\n}\n\nexport default doctors;\n`;
    
    fs.writeFileSync(DATA_FILE, fileContent, 'utf8');
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save doctors data' });
  }
});

export default router;
