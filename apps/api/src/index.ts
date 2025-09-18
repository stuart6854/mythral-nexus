import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import {
  Workspace,
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  Project,
  getProjects,
  getProjectById,
  createProject,
} from '@mythral/db';

const app = new Hono();

const api = app.basePath('/api');

api.get('/', (c) => {
  return c.text('Hello Hono!');
});

api.get('/workspaces', async (c) => {
  const workspaces: Workspace[] = await getWorkspaces();
  return c.json(workspaces);
});

api.get('/workspaces/:id', async (c) => {
  const workspace: Workspace | null = await getWorkspaceById(c.req.param('id'));
  console.log('Fetching workspace:', workspace);
  return c.json(workspace);
});

api.post('/workspaces', async (c) => {
  const body = await c.req.json();

  console.log(body);

  const workspace = await createWorkspace(body);
  return c.json({
    message: 'Workspace created successfully.',
    data: workspace,
  });
});

api.get('/projects', async (c) => {
  const projects: Project[] = await getProjects();
  return c.json(projects);
});

api.get('/projects/:id', async (c) => {
  const project: Project | null = await getProjectById(c.req.param('id'));
  console.log('Fetching project:', project);
  return c.json(project);
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
  },
);
