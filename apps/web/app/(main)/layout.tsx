import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import MainBar from '@/components/main-bar';

export default function MainLayout({
  children,
  breadcrumbs,
}: Readonly<{
  children: React.ReactNode;
  breadcrumbs: React.ReactNode;
}>) {
  return (
    <div>
      <MainBar>{breadcrumbs}</MainBar>
      {children}
      <Toaster position='bottom-right' expand richColors />
    </div>
  );
}
