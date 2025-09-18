import React from 'react';
import { createProject } from '@/api/projects';

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
  const onSubmit = async (formData: FormData) => {
    'use server';
    console.log(formData);

    await createProject({
      workspaceId: workspaceId,
      name: formData.get('name') as string,
      desc: formData.get('desc') as string,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Create Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <form action={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create Project</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Project Name</Label>
              <Input id="name" name="name" placeholder="Enter a project name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                name="desc"
                placeholder="Enter a description for the project"
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
