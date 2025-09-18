import { useRouter } from 'next/navigation';
import { createWorkspace, getWorkspaces } from '@/api/workspaces';

export default async function Home() {
  const router = useRouter();

  const workspaces = await getWorkspaces();
  if (workspaces.length == 0) {
    await createWorkspace({ name: 'Default Workspace' });
  }

  router.push(`/${workspaces[0].id}`);

  return <div>Home Page</div>;
}
