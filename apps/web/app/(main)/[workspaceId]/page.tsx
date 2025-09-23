import React from 'react';
import { redirect } from 'next/navigation';

import { getWorkspaceById } from '@/api/workspaces/get-workspace-by-id';
import { deleteProject } from '@/api/projects/delete-project';
import { getProjects } from '@/api/projects/get-projects';
import { Workspace, Project } from '@mythral/db';

import { SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProjectDialog from './_components/create-project-dialog';
import ProjectCard from './_components/project-card';

export default async function Page({ params }: { params: Promise<{ workspaceId: string }> }) {
  const { workspaceId } = await params;
  const workspace: Workspace = await getWorkspaceById(workspaceId);

  const projects: Project[] = await getProjects();

  const deleteProjectAction = async (id: string) => {
    'use server';
    await deleteProject(id);
    redirect(`/${workspace.id}`);
  };

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
          <ProjectCard
            key={project.id}
            workspace={workspace}
            project={project}
            deleteProjectAction={deleteProjectAction}
          />
        ))}
      </div>
    </div>
  );
}
