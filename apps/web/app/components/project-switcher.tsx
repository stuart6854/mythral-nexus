import React, { useState } from 'react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Check, ChevronsUpDown } from 'lucide-react';

export default function ProjectSwitcher({ projects }: { projects: string[] }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size='lg'>
              {selectedProject}
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='start' className='w-(--radix-dropdown-menu-trigger-width)'>
            {projects.map((project) => (
              <DropdownMenuItem key={project} onSelect={() => setSelectedProject(project)}>
                {project}
                {project == selectedProject && <Check className='ml-auto' />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
