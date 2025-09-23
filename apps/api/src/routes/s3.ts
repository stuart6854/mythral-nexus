import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';

import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { S3Client } from '@aws-sdk/client-s3';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const S3 = new S3Client({
  region: 'auto',
  endpoint: 'https://t3.storage.dev',
  forcePathStyle: false,
});

const uploadRequestSchema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export function registerS3Routes(app: Hono) {
  const api = app.basePath('/api');

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
}
