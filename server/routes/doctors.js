import { Router } from 'express';
import { db } from '../db/index.js';
import { doctors } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/doctors — all doctors (public)
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(doctors);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

// GET /api/doctors/:slug — single doctor (public)
router.get('/:slug', async (req, res) => {
  try {
    const [doc] = await db.select().from(doctors).where(eq(doctors.slug, req.params.slug));
    if (!doc) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch doctor' });
  }
});

// PUT /api/doctors/:id — update doctor (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = { ...req.body, updatedAt: new Date() };
    delete updates.id;

    const [updated] = await db.update(doctors).set(updates).where(eq(doctors.id, id)).returning();
    if (!updated) return res.status(404).json({ error: 'Doctor not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update doctor' });
  }
});

export default router;
