import { Router } from 'express';
import { db } from '../db/index.js';
import { gallery } from '../db/schema.js';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/gallery (public)
router.get('/', async (req, res) => {
  try {
    const images = await db.select().from(gallery).orderBy(desc(gallery.createdAt));
    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch gallery' });
  }
});

// POST /api/gallery (admin only) - Expects base64 image
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { label, category, image } = req.body;
    if (!image) return res.status(400).json({ error: 'Image is required' });

    const [newItem] = await db.insert(gallery).values({
      label: label || '',
      category: category || 'clinic',
      image,
    }).returning();

    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to upload image' });
  }
});

// DELETE /api/gallery/:id (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    await db.delete(gallery).where(eq(gallery.id, parseInt(id)));
    res.json({ message: 'Image deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

export default router;
