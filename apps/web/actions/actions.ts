'use server';

import { createProject } from '@/api/projects';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitCreateProjectForm(
  prevState: any,
  formData: FormData,
) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  console.log(formData);
  const workspaceId = formData.get('workspaceId') as string;
  const name = formData.get('name') as string;
  const desc = formData.get('desc') as string;

  const response = await createProject({
    workspaceId: workspaceId,
    name: name,
    desc: desc,
  });

  console.log('Test: ', response);

  //   setOpen(false);

  /* toast.promise(promise, {
    loading: 'Creating project...',
    success: 'Project created successfully!',
    error: 'Error creating project.',
  }); */

  const project = response.project;

  revalidatePath(`/${workspaceId}`);
  redirect(`/${workspaceId}/${project.id}`);

  /* return {
    name,
    desc,
    status: 'success',
    message: null,
  }; */
}
