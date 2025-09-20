import React from 'react';
import Link from 'next/link';

import { getWorkspaceById } from '@/api/workspaces';
import { getProjects } from '@/api/projects';
import { Workspace, Project } from '@mythral/db';

import { EllipsisIcon, SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProjectDialog from './create-project-dialog';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function Page({ params }: { params: Promise<{ workspaceId: string }> }) {
  const { workspaceId } = await params;
  const workspace: Workspace = await getWorkspaceById(workspaceId);

  const projects: Project[] = await getProjects();

  return (
    <div className='p-4'>
      <div className='flex justify-between text-xl font-semibold pb-4'>
        <div>{workspace.name}</div>
        <div className='flex gap-2'>
          <Button variant='outline'>
            <SettingsIcon />
          </Button>
          <CreateProjectDialog workspaceId={workspaceId} />
        </div>
      </div>
      <div className='grid grid-cols-3 gap-6 p-4 border-4 rounded-lg'>
        {projects.map((project) => (
          <Link href={`/${workspaceId}/${project.id}`} key={project.id}>
            <ProjectCard key={project.id} project={project} />
          </Link>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className='rounded-lg'>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.desc}</CardDescription>
        <CardAction>
          <Button variant='ghost'>
            <EllipsisIcon />
          </Button>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
