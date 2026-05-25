import { Router } from 'express';
import { db } from '../db/index.js';
import { blogs } from '../db/schema.js';
import { eq, desc, and } from 'drizzle-orm';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();

// Helper: generate slug from title
function generateSlug(title) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

// GET /api/blogs — all published blogs (public)
router.get('/', async (req, res) => {
  try {
    const all = await db.select().from(blogs).where(eq(blogs.published, true)).orderBy(desc(blogs.createdAt));
    res.json(all);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET /api/blogs/all — all blogs including drafts (admin only)
router.get('/all', authMiddleware, async (req, res) => {
  try {
    const all = await db.select().from(blogs).orderBy(desc(blogs.createdAt));
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blogs' });
  }
});

// GET /api/blogs/:slug — single blog by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const [blog] = await db.select().from(blogs).where(eq(blogs.slug, req.params.slug));
    if (!blog) return res.status(404).json({ error: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch blog' });
  }
});

// POST /api/blogs — create blog (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, titleHi, category, author, authorTitle, readTime, coverImage, excerpt, content, published, featured, tags } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });

    const slug = generateSlug(title) + '-' + Date.now();
    const [blog] = await db.insert(blogs).values({
      slug, title, titleHi, category: category || 'General Health',
      author: author || 'Urowala Clinic', authorTitle,
      readTime: parseInt(readTime) || 5,
      coverImage, excerpt, content,
      published: published !== false,
      featured: featured || false,
      tags: tags || [],
    }).returning();

    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// PUT /api/blogs/:id — update blog (admin only)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, titleHi, category, author, authorTitle, readTime, coverImage, excerpt, content, published, featured, tags } = req.body;

    const updates = {
      updatedAt: new Date(),
      ...(title && { title }),
      ...(titleHi !== undefined && { titleHi }),
      ...(category && { category }),
      ...(author && { author }),
      ...(authorTitle !== undefined && { authorTitle }),
      ...(readTime && { readTime: parseInt(readTime) }),
      ...(coverImage !== undefined && { coverImage }),
      ...(excerpt !== undefined && { excerpt }),
      ...(content !== undefined && { content }),
      ...(published !== undefined && { published }),
      ...(featured !== undefined && { featured }),
      ...(tags !== undefined && { tags }),
    };

    if (title) updates.slug = generateSlug(title) + '-' + id;

    const [updated] = await db.update(blogs).set(updates).where(eq(blogs.id, id)).returning();
    if (!updated) return res.status(404).json({ error: 'Blog not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// DELETE /api/blogs/:id — delete blog (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(blogs).where(eq(blogs.id, id)).returning();
    if (!deleted) return res.status(404).json({ error: 'Blog not found' });
    res.json({ message: 'Blog deleted successfully', id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

export default router;
