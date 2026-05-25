import { Router } from 'express';
import { db } from '../db/index.js';
import { appointments } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/appointments — submit booking (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, doctor, preferredDate, preferredTime, reason } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

    const [appt] = await db.insert(appointments).values({
      name, phone,
      doctor: doctor || '',
      preferredDate: preferredDate || '',
      preferredTime: preferredTime || '',
      reason: reason || '',
      status: 'pending',
    }).returning();

    res.status(201).json({ message: 'Appointment request received!', id: appt.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save appointment' });
  }
});

// GET /api/appointments — list all (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const all = await db.select().from(appointments).orderBy(desc(appointments.createdAt));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// PUT /api/appointments/:id — update status (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const [updated] = await db.update(appointments)
      .set({ status })
      .where(eq(appointments.id, parseInt(req.params.id)))
      .returning();
    if (!updated) return res.status(404).json({ error: 'Appointment not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE /api/appointments/:id (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.delete(appointments).where(eq(appointments.id, parseInt(req.params.id)));
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

export default router;
