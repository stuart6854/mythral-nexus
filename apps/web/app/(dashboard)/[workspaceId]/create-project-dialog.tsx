'use client';

import React, { useActionState } from 'react';
import { submitCreateProjectForm } from '@/actions/actions';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function CreateProjectDialog({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [state, action, isLoading] = useActionState(submitCreateProjectForm, {
    name: '',
    desc: '',
    status: null,
    message: null,
  });

  /* async function createProjectAction(formData: FormData) {
    'use server';
    console.log('Create project');

    const promise = createProject({
      workspaceId: workspaceId,
      name: formData.get('name') as string,
      desc: formData.get('desc') as string,
    });

    setOpen(false);

    toast.promise(promise, {
      loading: 'Creating project...',
      success: 'Project created successfully!',
      error: 'Error creating project.',
    });
  } */

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form action={action}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <input type="hidden" name="workspaceId" value={workspaceId} />
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter a project name"
                defaultValue={state?.name}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                name="desc"
                placeholder="Enter a description for the project"
                defaultValue={state?.desc}
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">
              {isLoading ? 'Creating...' : 'Create'}
            </Button>

            {state && (
              <p className="text-red-500">
                {state.status === 'error' ? state.message : null}
              </p>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
