'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import ResourceCard from '@/components/resource-card';
import React from 'react';
import FileUploadOverlay from './file-upload';

export default function ResourcesPanel() {
  return (
    <div>
      <div className='h-14 flex justify-between items-center px-4 py-2 border-b-2 border-dashed'>
        <p>Resources</p>
      </div>
      <div className='relative'>
        <FileUploadOverlay className=''>
          <ScrollArea className='h-[calc(100vh-128px)]'>
            <div className='p-4 flex flex-wrap'>
              {Array.from({ length: 50 }, (_, index) => (
                <ResourceCard key={index} index={index} />
              ))}
            </div>
          </ScrollArea>
        </FileUploadOverlay>
      </div>
    </div>
  );
}
