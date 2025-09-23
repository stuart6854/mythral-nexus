import { Hono } from 'hono';
import { registerRoutes } from './routes/index.js';

import { HTTPException } from 'hono/http-exception';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello! This is the Mythral Nexus backend API!');
});
registerRoutes(app);

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
