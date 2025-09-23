'use client';

import React from 'react';

import { useCallback } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { v4 as uuidv4 } from 'uuid';

import { cn } from '@/components/lib/utils';

import { useGlobalFileDrag } from './global-file-drag';
import { toast } from 'sonner';
import getPresignedUploadUrl from '@/api/s3';

export default function FileUploadOverlay({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const [files, setFiles] = React.useState<
    Array<{
      id: string; // unique identifier
      file: File; // the file object
      uploading: boolean; // is the file currently uploading
      progress: number; // upload progress percentage (0-100)
      key?: string; // the key of the file in storage
      isDeleting?: boolean; // is the file currently being deleted
      error: boolean; // did an error occur during upload
      objectUrl?: string; // the local object URL for previewing the file (optional)
    }>
  >([]);

  const isDraggingFileGlobal = useGlobalFileDrag();

  const onDrop = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFiles((prev) => [
        ...prev,
        ...files.map((file) => ({
          id: uuidv4(),
          file: file,
          uploading: false,
          progress: 0,
          isDeleting: false,
          error: false,
          objectUrl: URL.createObjectURL(file),
        })),
      ]);
    }

    files.forEach((file) => {
      const promise = uploadFile(file);
      toast.promise(promise);
    });
  }, []);

  const onDropRejections = useCallback((fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      toast.error(`Some files were rejected. Please ensure they meet the upload criteria.`);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDrop,
    onDropRejected: onDropRejections,
    multiple: true,
    maxFiles: 5,
    maxSize: 50 * 1024 * 1024, // 50 MB
    accept: {
      'text/*': [], // Accept all text types
      'image/*': [], // Accept all image types
      'audio/*': [], // Accept all audio types
      'application/octet-stream': [], // Accept genric binary files
      // Extensions as needed
      '': ['.obj', '.fbx', '.glb', '.gltf'], // Accept common 3D model formats
    },
  });
  const showOverlay = isDraggingFileGlobal || isDragActive;

  async function uploadFile(file: File) {
    console.log('Uploading file:', file);
    setFiles((prevFiles) => prevFiles.map((f) => (f.file == file ? { ...f, uploading: true } : f)));

    try {
      const { presignedUrl, key } = await getPresignedUploadUrl({
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
      });

      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;

            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file == file ? { ...f, progress: Math.round(percentComplete), key: key } : f
              )
            );
          }
        };

        xhr.onload = () => {
          if (xhr.status == 200 || xhr.status == 204) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file == file ? { ...f, progress: 100, uploading: false, error: false } : f
              )
            );
            toast.success('File uploaded successfully.');
            resolve();
          } else {
            reject(new Error(`Upload failed with status: ${xhr.status}`));
          }
        };

        xhr.onerror = () => {
          reject(new Error('Upload failed.'));
        };

        xhr.open('PUT', presignedUrl);
        xhr.setRequestHeader('content-type', file.type);
        xhr.send(file);
      });
    } catch {
      toast.error('Upload failed.');

      setFiles((prevFiles) =>
        prevFiles.map((f) => (f.file == file ? { ...f, uploading: false, progress: 0, error: true } : f))
      );
    }
  }

  return (
    <div className={cn('relative', className)}>
      {children}

      {/* Full-cover overlay */}
      <div
        {...(showOverlay ? getRootProps() : {})}
        className={[
          cn('absolute inset-0 z-50 transition-opacity duration-150'),
          showOverlay ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        ].join(' ')}
      >
        {showOverlay && <input {...getInputProps()} />}
        <p className='text-center'>Drop files here to import...</p>
      </div>
    </div>
  );
}
