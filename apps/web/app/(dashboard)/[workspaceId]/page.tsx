import React from 'react';
import { getProjects } from '@/api/projects';
import { Project } from '@mythral/db';
import Link from 'next/link';

export default async function Page({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  var { workspaceId } = await params;
  const projects: Project[] = await getProjects();

  return (
    <div>
      Workspace '{workspaceId}'
      <div>
        {projects.map((project) => (
          <Link href={`/${workspaceId}/${project.id}`} key={project.id}>
            <div key={project.id}>{project.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
