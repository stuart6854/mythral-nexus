import { ReactNode } from 'react';
import MainBar from '@/components/main-bar';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({
  children,
  breadcrumbs,
}: Readonly<{
  children: ReactNode;
  breadcrumbs: ReactNode;
}>) {
  return (
    <div>
      <MainBar>{breadcrumbs}</MainBar>
      {children}
      <Toaster position="top-right" expand richColors />
    </div>
  );
}
