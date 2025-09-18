import React from 'react';
import Link from 'next/link';

import { getWorkspaceById } from '@/api/workspaces';
import { getProjects } from '@/api/projects';
import { Workspace, Project } from '@mythral/db';

import { SettingsIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateProjectDialog from './create-project-form';

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  var { workspaceId } = await params;
  const workspace: Workspace = await getWorkspaceById(workspaceId);

  const projects: Project[] = await getProjects();

  return (
    <div className="p-4">
      <div className="flex justify-between text-xl font-semibold pb-2">
        <div>{workspace.name}</div>
        <div className="flex gap-2">
          <Button variant="outline">
            <SettingsIcon />
          </Button>
          <CreateProjectDialog workspaceId={workspaceId} />
        </div>
      </div>
      <div className="flex p-4 border-4 rounded-lg">
        {projects.map((project) => (
          <Link href={`/${workspaceId}/${project.id}`} key={project.id}>
            <div key={project.id}>{project.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
