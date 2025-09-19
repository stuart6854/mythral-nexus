'use client';

import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
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

const initialState = { error: undefined as string | undefined };

export default function CreateProjectDialog({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [state, action] = useActionState(submitCreateProjectForm, initialState);

  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');

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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="desc">Description</Label>
              <Input
                id="desc"
                name="desc"
                placeholder="Enter a description for the project"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter className="pt-4">
            <SubmitButton />
            <div>
              {state?.error && <p className="text-red-500">{state.error}</p>}
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create'}
    </Button>
  );
}
