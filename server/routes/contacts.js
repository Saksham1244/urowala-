import { Router } from 'express';
import { db } from '../db/index.js';
import { contacts } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// POST /api/contacts — submit message (public)
router.post('/', async (req, res) => {
  try {
    const { name, phone, message } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

    const [contact] = await db.insert(contacts).values({
      name, phone, message: message || '',
    }).returning();

    res.status(201).json({ message: 'Message received! We will contact you shortly.', id: contact.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// GET /api/contacts — list all (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const all = await db.select().from(contacts).orderBy(desc(contacts.createdAt));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// PUT /api/contacts/:id/read — mark as read (admin only)
router.put('/:id/read', authMiddleware, async (req, res) => {
  try {
    const [updated] = await db.update(contacts)
      .set({ read: true })
      .where(eq(contacts.id, parseInt(req.params.id)))
      .returning();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update' });
  }
});

// DELETE /api/contacts/:id (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await db.delete(contacts).where(eq(contacts.id, parseInt(req.params.id)));
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete' });
  }
});

export default router;
