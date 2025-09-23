import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { db, eq, workspaces } from '@mythral/db';
import type { Workspace } from '@mythral/db';

export function registerWorkspaceRoutes(app: Hono) {
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
}
