import { Router } from 'express';
import { db } from '../db/index.js';
import { services } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/services — all services (public)
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(services);
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// GET /api/services/:slug — single service (public)
router.get('/:slug', async (req, res) => {
  try {
    const [service] = await db.select().from(services).where(eq(services.slug, req.params.slug));
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// PUT /api/services/:id — update service (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updates = { ...req.body, updatedAt: new Date() };
    delete updates.id;

    const [updated] = await db.update(services).set(updates).where(eq(services.id, id)).returning();
    if (!updated) return res.status(404).json({ error: 'Service not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update service' });
  }
});

export default router;
