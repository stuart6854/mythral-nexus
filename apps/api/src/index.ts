import 'dotenv/config';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { resources } from '@mythral/db/src/schema'; // path import inside monorepo

const app = new Hono();

// health
app.get('/health', (c) => c.json({ ok: true }));

// list resources (simple example)
app.get('/resources', async (c) => {
  const rows = await db.select().from(resources).limit(50);
  return c.json(rows);
});

// get by rid
app.get('/resources/:rid', async (c) => {
  const rid = c.req.param('rid');
  const rows = await db.select().from(resources).where(eq(resources.rid, rid)).limit(1);
  return rows.length ? c.json(rows[0]) : c.notFound();
});

const port = Number(process.env.PORT ?? 5005);
console.log(`API listening on http://localhost:${port}`);
serve({ fetch: app.fetch, port });
