import { serve } from '@hono/node-server';
import app from './app.js';

const port = 5005;
serve({
  fetch: app.fetch,
  port: port,
});
