import React from 'react';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import ResourcesPanel from '@/components/resources-panel';

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string; projectId: string }>;
}) {
  const { workspaceId, projectId } = await params;

  return (
    <ResizablePanelGroup direction='horizontal' className='border'>
      <ResizablePanel>
        <ResourcesPanel />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel minSize={30} defaultSize={30}>
        <div className='h-14 px-4 py-2 border-b-2 border-dashed'>Details</div>
        <div className='p-4'>Details Panel</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
