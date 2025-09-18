import React from 'react';
import { Project } from '@mythral/db';
import { HomeIcon, PackageIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import ProjectSwitcher from '@/components/project-switcher';
import { getProjects } from '@/api/projects';

const items = [
  {
    title: 'Home',
    url: '#',
    icon: HomeIcon,
  },
  {
    title: 'Packages',
    url: '#',
    icon: PackageIcon,
  },
];

export default async function AppSideBar({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const projects: Project[] = await getProjects();
  return (
    <Sidebar side='left' variant='sidebar'>
      <SidebarHeader className='border-sidebar-border h-16 border-b'>
        <ProjectSwitcher projects={projects} selectedProjectId={id} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>Footer</SidebarFooter>
    </Sidebar>
  );
}
