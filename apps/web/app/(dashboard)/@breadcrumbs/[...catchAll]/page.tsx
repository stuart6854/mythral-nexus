import { getWorkspaces, getWorkspaceById } from '@/api/workspaces';
import { getProjects, getProjectById } from '@/api/projects';
import { Workspace, Project } from '@mythral/db';

import Link from 'next/link';
import {
  BreadcrumbItem,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronsUpDownIcon } from 'lucide-react';

export default async function BreadcrumbSlot({
  params,
}: {
  params: { catchAll: string };
}) {
  var { catchAll } = await params;
  const segments = catchAll || [];

  var workspaceId = segments[0] || null;
  var workspace = workspaceId ? await getWorkspaceById(workspaceId) : null;

  var projectId = segments[1] || null;
  var project = projectId ? await getProjectById(projectId) : null;

  var allWorkspaces: Workspace[] = await getWorkspaces();
  var allProjects: Project[] = await getProjects();

  return (
    <>
      {workspace && (
        <>
          <WorkspaceBreadcrumb
            currentWorkspace={workspace}
            allWorkspaces={allWorkspaces}
          />
          {project && (
            <>
              <BreadcrumbSeparator />
              <ProjectBreadcrumb
                currentProject={project}
                allProjects={allProjects}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

function WorkspaceBreadcrumb({
  currentWorkspace,
  allWorkspaces,
}: {
  currentWorkspace: Workspace;
  allWorkspaces: Workspace[];
}) {
  return (
    <BreadcrumbItem>
      <DropdownMenu>
        <Link href={`/${currentWorkspace.id}`}>{currentWorkspace.name}</Link>
        <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
          <ChevronsUpDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {allWorkspaces
            .filter((workspace) => workspace.id !== currentWorkspace.id)
            .map((workspace) => (
              <DropdownMenuItem key={workspace.id}>
                {workspace.name}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
  );
}

function ProjectBreadcrumb({
  currentProject,
  allProjects,
}: {
  currentProject: Project;
  allProjects: Project[];
}) {
  return (
    <BreadcrumbItem>
      <DropdownMenu>
        {currentProject.name}
        <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
          <ChevronsUpDownIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {allProjects
            .filter((project) => project.id !== currentProject.id)
            .map((project) => (
              <DropdownMenuItem key={project.id}>
                {project.name}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </BreadcrumbItem>
  );
}
