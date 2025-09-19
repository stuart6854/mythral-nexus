import { redirect } from 'next/navigation';
import { createWorkspace, getWorkspaces } from '@/api/workspaces';

export default async function Home() {
  /* const workspaces = await getWorkspaces();
  if (workspaces.length == 0) {
    await createWorkspace({ name: 'Default Workspace' });
  } */

  // redirect(`/${workspaces[0].id}`);

  return <div>Homepage</div>;
}
