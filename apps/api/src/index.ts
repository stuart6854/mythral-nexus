import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { getProjects, Project } from '@mythral/db';

const app = new Hono();

const api = app.basePath('/api');

api.get('/', (c) => {
  return c.text('Hello Hono!');
});

api.get('/projects', async (c) => {
  const projects: Project[] = await getProjects();

  return c.json({ projects });
  // return c.text('Hello Projects!');
});

api.post('/projects', async (c) => {
  const body = await c.req.json();

  return c.json({ message: 'Hello API!', data: body });
});

serve(
  {
    fetch: app.fetch,
    port: 3003,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
