import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './server/db/schema.js',
  out: './server/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_diQxsDo3tLW0@ep-quiet-lab-apbsiq66.c-7.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
});

