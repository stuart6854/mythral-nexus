import { ReactNode } from 'react';
import MainBar from '@/components/main-bar';

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
    </div>
  );
}
