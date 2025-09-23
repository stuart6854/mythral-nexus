import { Hono } from 'hono';

import { registerWorkspaceRoutes } from './workspaces.js';
import { registerProjectRoutes } from './projects.js';
import { registerS3Routes } from './s3.js';

export function registerRoutes(app: Hono) {
  registerWorkspaceRoutes(app);
  registerProjectRoutes(app);
  registerS3Routes(app);
}
