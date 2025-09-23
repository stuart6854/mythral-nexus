'use server';

import { createProject } from '@/api/projects/create-project';
import { redirect } from 'next/navigation';

type State = { error?: string };

export async function submitCreateProjectForm(_prevState: State, formData: FormData): Promise<State> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  let workspaceId = '';
  let projectId = '';

  try {
    workspaceId = formData.get('workspaceId') as string;
    const name = formData.get('name') as string;
    const desc = formData.get('desc') as string;

    if (!name) {
      return { error: 'Please provide a name.' };
    }

    const project = await createProject({
      workspaceId: workspaceId,
      name: name,
      desc: desc,
    });
    console.log('Created project:', project);
    projectId = project.id;
  } catch (err) {
    if (err instanceof Error) {
      return { error: err.message };
    }

    return { error: 'Could not create project. Please try again.' };
  }

  console.log(`Redirecting to /${workspaceId}/${projectId}`);
  redirect(`/${workspaceId}/${projectId}`);
}
