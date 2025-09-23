import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { db, eq, projects } from '@mythral/db';
import type { Project } from '@mythral/db';

export function registerProjectRoutes(app: Hono) {
  const api = app.basePath('/api');

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

  api.delete('/projects/:id', async (c) => {
    const id = c.req.param('id') as string;
    console.log(`Deleting project: ${id}`);
    await db.delete(projects).where(eq(projects.id, id));

    console.log(`Project deleted with ID: ${id}`);
    return c.json({ message: 'Project deleted successfully' });
  });
}
