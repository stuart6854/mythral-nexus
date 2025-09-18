'use client';

import React, { useState } from 'react';
import { Project } from '@mythral/db';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function ProjectSwitcher({
  projects,
  selectedProjectId,
}: {
  projects: Project[];
  selectedProjectId?: string;
}) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  if (selectedProjectId)
    setSelectedProject(
      projects.find((project) => project.id === selectedProjectId),
    );

  const router = useRouter();
  const onSelectProject = (project: Project) => {
    router.push(`/project/${project.id}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="lg" className="text-secondary">
          {selectedProject?.name}
          <ChevronsUpDown className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="w-(--radix-dropdown-menu-trigger-width)"
      >
        {projects.map((project) => (
          <DropdownMenuItem
            key={project.id}
            onSelect={() => onSelectProject(project)}
          >
            {project.name}
            {project == selectedProject && <Check className="ml-auto" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
