import React from 'react';
import DashboardHeader from '@/components/dashboard-header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <DashboardHeader />
      {children}
    </div>
  );
}
