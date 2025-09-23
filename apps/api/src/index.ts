import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { db, eq, workspaces, projects } from '@mythral/db';
import type { Workspace, Project } from '@mythral/db';

export const S3 = new S3Client({
  region: 'auto',
  endpoint: 'https://t3.storage.dev',
  forcePathStyle: false,
});

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

api.delete('/projects/:id', async (c) => {
  const id = c.req.param('id') as string;
  console.log(`Deleting project: ${id}`);
  await db.delete(projects).where(eq(projects.id, id));

  console.log(`Project deleted with ID: ${id}`);
  return c.json({ message: 'Project deleted successfully' });
});

const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

api.post('/s3/upload', async (c) => {
  try {
    const body = await c.req.json();
    const validation = uploadRequestSchema.safeParse(body);
    if (!validation.success) {
      throw new HTTPException(400, { message: `Invalid request body: ${validation.error}` });
    }

    const { contentType, fileName, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return c.json(response);
  } catch (err) {
    throw new HTTPException(500, { message: 'Internal Server Error' });
  }
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
