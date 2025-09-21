import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { db, eq, workspaces, projects } from '@mythral/db';
import type { Workspace, Project } from '@mythral/db';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello! This is the Mythral Nexus backend API!');
});

const api = app.basePath('/api');

api.get('/workspaces', async (c) => {
  console.log('Fetching all workspaces');
  const data: Workspace[] = await db.select().from(workspaces);
  return c.json(data);
});

api.get('/workspaces/:id', async (c) => {
  const id = c.req.param('id') as string;
  console.log(`Fetching workspace: ${id}`);
  const data: Workspace | undefined = await db.query.workspaces.findFirst({
    where: eq(workspaces.id, id),
  });
  if (!data) {
    throw new HTTPException(404, { message: 'Workspace not found' });
  }
  return c.json(data);
});

api.post('/workspaces', async (c) => {
  const body = await c.req.json();
  console.log(`Creating a new workspace: ${JSON.stringify(body)}`);
  const data: Workspace[] = await db.insert(workspaces).values(body).returning();
  if (data.length === 0) {
    return c.json('Failed to create workspace.', 404);
  }

  console.log(`Workspace created with ID: ${data[0].id}`);
  return c.json(data[0]);
});

api.get('/projects', async (c) => {
  console.log('Fetching all projects');
  const data: Project[] = await db.select().from(projects);
  return c.json(data);
});

api.get('/projects/:id', async (c) => {
  const id = c.req.param('id') as string;
  console.log(`Fetching project: ${id}`);
  const data: Project | undefined = await db.query.projects.findFirst({
    where: eq(projects.id, id),
  });
  if (!data) {
    throw new HTTPException(404, { message: 'Project not found' });
  }
  return c.json(data);
});

api.post('/projects', async (c) => {
  const body = await c.req.json();
  console.log(`Creating a new project: ${JSON.stringify(body)}`);
  const data: Project[] = await db.insert(projects).values(body).returning();
  if (data.length === 0) {
    throw new HTTPException(404, { message: 'Project not found' });
  }

  console.log(`Project created with ID: ${data[0].id}`);
  return c.json(data[0]);
});

// Error handling middleware
app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.text('Internal Server Error', 500);
});
app.notFound((c) => {
  return c.text('404 Not Found', 404);
});

export default app;
