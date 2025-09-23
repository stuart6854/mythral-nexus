'use client';

import Link from 'next/link';

import { Workspace, Project } from '@mythral/db';

import { EllipsisIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

export default function ProjectCard({
  workspace,
  project,
  deleteProjectAction,
}: {
  workspace: Workspace;
  project: Project;
  deleteProjectAction: (id: string) => Promise<void>;
}) {
  return (
    <Card className='rounded-lg'>
      <CardHeader>
        <Link href={`/${workspace.id}/${project.id}`} key={project.id}>
          <CardTitle>{project.name}</CardTitle>
        </Link>
        <CardDescription>{project.desc}</CardDescription>
        <CardAction>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost'>
                <EllipsisIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem disabled={true}>Settings</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => deleteProjectAction(project.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardAction>
      </CardHeader>
    </Card>
  );
}
