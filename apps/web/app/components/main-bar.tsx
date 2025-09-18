import React, { ReactNode } from 'react';

import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb';

export default async function MainBar({ children }: { children: ReactNode }) {
  return (
    <div className="h-12 px-4 flex items-center border-b-2 border-b-muted bg-sidebar-primary text-white">
      <Breadcrumb>
        <BreadcrumbList className="text-secondary">{children}</BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
