import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { Project, getProjects, createProject } from '@mythral/db';

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

  console.log(body);

  const project = await createProject(body);

  return c.json({ message: 'Project created successfully.', data: project });
});

serve(
  {
    fetch: app.fetch,
    port: 5005,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
