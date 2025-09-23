'use server';

export default async function getPresignedUploadUrl({
  fileName,
  fileType,
  fileSize,
}: {
  fileName: string;
  fileType: string;
  fileSize: number;
}) {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/s3/upload`, {
    method: 'POST',
    headers: { 'content-type': 'application-json' },
    body: JSON.stringify({
      fileName: fileName,
      contentType: fileType,
      size: fileSize,
    }),
  });
  if (!response.ok) throw new Error(`Failed to get presigned url`);
  return await response.json();
}
