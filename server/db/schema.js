import { pgTable, serial, varchar, text, boolean, integer, timestamp, jsonb } from 'drizzle-orm/pg-core';

// ── Admins ──────────────────────────────────────────────────────────────────
export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 100 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// ── Blogs ────────────────────────────────────────────────────────────────────
export const blogs = pgTable('blogs', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 500 }).notNull(),
  titleHi: varchar('title_hi', { length: 500 }),
  category: varchar('category', { length: 100 }).notNull().default('General Health'),
  author: varchar('author', { length: 200 }).notNull(),
  authorTitle: varchar('author_title', { length: 200 }),
  readTime: integer('read_time').default(5),
  coverImage: varchar('cover_image', { length: 1000 }),
  excerpt: text('excerpt'),
  content: text('content'),
  published: boolean('published').default(true),
  featured: boolean('featured').default(false),
  tags: jsonb('tags').default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ── Appointments ─────────────────────────────────────────────────────────────
export const appointments = pgTable('appointments', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 300 }).notNull(),
  phone: varchar('phone', { length: 30 }).notNull(),
  doctor: varchar('doctor', { length: 200 }),
  preferredDate: varchar('preferred_date', { length: 50 }),
  preferredTime: varchar('preferred_time', { length: 50 }),
  reason: text('reason'),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow(),
});

// ── Contacts ─────────────────────────────────────────────────────────────────
export const contacts = pgTable('contacts', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 300 }).notNull(),
  phone: varchar('phone', { length: 30 }).notNull(),
  message: text('message'),
  read: boolean('read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// ── Doctors ───────────────────────────────────────────────────────────────────
export const doctors = pgTable('doctors', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  name: varchar('name', { length: 300 }).notNull(),
  title: varchar('title', { length: 300 }),
  specialty: varchar('specialty', { length: 200 }),
  specialtyIcon: varchar('specialty_icon', { length: 10 }),
  qualifications: varchar('qualifications', { length: 500 }),
  certifications: jsonb('certifications').default([]),
  experience: integer('experience'),
  surgeries: varchar('surgeries', { length: 50 }),
  treatments: varchar('treatments', { length: 50 }),
  photo: varchar('photo', { length: 1000 }),
  photoFallback: varchar('photo_fallback', { length: 10 }),
  color: varchar('color', { length: 20 }),
  bio: text('bio'),
  conditions: jsonb('conditions').default([]),
  procedures: jsonb('procedures').default([]),
  availability: varchar('availability', { length: 500 }),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ── Services ──────────────────────────────────────────────────────────────────
export const services = pgTable('services', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 200 }).notNull().unique(),
  icon: varchar('icon', { length: 20 }),
  title: varchar('title', { length: 300 }).notNull(),
  shortDesc: text('short_desc'),
  description: text('description'),
  symptoms: jsonb('symptoms').default([]),
  procedures: jsonb('procedures').default([]),
  recovery: varchar('recovery', { length: 200 }),
  color: varchar('color', { length: 20 }),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// ── Gallery ───────────────────────────────────────────────────────────────────
export const gallery = pgTable('gallery', {
  id: serial('id').primaryKey(),
  label: varchar('label', { length: 200 }).notNull(),
  category: varchar('category', { length: 100 }).notNull().default('clinic'),
  image: text('image').notNull(), // Base64 image data
  createdAt: timestamp('created_at').defaultNow(),
});

// ── Settings ──────────────────────────────────────────────────────────────────
export const settings = pgTable('settings', {
  key: varchar('key', { length: 100 }).primaryKey(),
  value: text('value').notNull(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
