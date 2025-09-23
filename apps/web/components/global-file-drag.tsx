'use client';

import { useEffect, useRef, useState } from 'react';

function hasFiles(e: DragEvent) {
  const items = e.dataTransfer?.items;
  if (!items || items.length === 0) return false;
  // True only if at least one dragged item is a file
  return Array.from(items).some((it) => it.kind === 'file');
}

export function useGlobalFileDrag() {
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const dragDepth = useRef(0);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      if (hasFiles(e)) {
        dragDepth.current += 1;
        setIsDraggingFiles(true);
      }
    };

    const onDragOver = (e: DragEvent) => {
      if (hasFiles(e)) {
        e.preventDefault(); // allow drop
        e.dataTransfer!.dropEffect = 'copy';
      }
    };

    const onDragLeave = (e: DragEvent) => {
      if (!hasFiles(e)) return;
      dragDepth.current = Math.max(0, dragDepth.current - 1);
      if (dragDepth.current === 0) setIsDraggingFiles(false);
    };

    const onDrop = (e: DragEvent) => {
      dragDepth.current = 0;
      setIsDraggingFiles(false);
      // we don't preventDefault here—consumer should do it in the drop handler
      // where they actually want to accept files.
    };

    // Prevent the browser from navigating away when dropping outside our target
    const preventWindowDrop = (e: DragEvent) => {
      if (hasFiles(e)) e.preventDefault();
    };

    window.addEventListener('dragenter', onDragEnter);
    window.addEventListener('dragover', onDragOver);
    window.addEventListener('dragleave', onDragLeave);
    window.addEventListener('drop', onDrop);
    // Keep the browser from opening the file if dropped on the page background
    document.addEventListener('dragover', preventWindowDrop);
    document.addEventListener('drop', preventWindowDrop);

    return () => {
      window.removeEventListener('dragenter', onDragEnter);
      window.removeEventListener('dragover', onDragOver);
      window.removeEventListener('dragleave', onDragLeave);
      window.removeEventListener('drop', onDrop);
      document.removeEventListener('dragover', preventWindowDrop);
      document.removeEventListener('drop', preventWindowDrop);
    };
  }, []);

  return isDraggingFiles;
}
