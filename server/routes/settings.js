import { Router } from 'express';
import { db } from '../db/index.js';
import { settings } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// GET /api/settings (public)
router.get('/', async (req, res) => {
  try {
    const allSettings = await db.select().from(settings);
    // Convert array of {key, value} to an object
    const settingsObj = {};
    allSettings.forEach(s => { settingsObj[s.key] = s.value; });
    res.json(settingsObj);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// PUT /api/settings (admin only) - Update or create setting
router.put('/', authMiddleware, async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key) return res.status(400).json({ error: 'Key is required' });

    // Check if exists
    const [existing] = await db.select().from(settings).where(eq(settings.key, key));

    if (existing) {
      await db.update(settings).set({ value, updatedAt: new Date() }).where(eq(settings.key, key));
    } else {
      await db.insert(settings).values({ key, value });
    }

    res.json({ message: 'Setting updated', key, value });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update setting' });
  }
});

export default router;
