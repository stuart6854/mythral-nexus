import React from 'react';

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;
  return (
    <div>
      Workspace &apos;{workspaceId}&apos; / Project &apos;{projectId}&apos;
    </div>
  );
}
