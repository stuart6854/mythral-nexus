import { Workspace } from '@mythral/db';

export { type Workspace };

export async function getWorkspaces() {
  const response = await fetch(
    `${process.env.BACKEND_API_URL!}/api/workspaces`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
  return response.json();
}

export async function getWorkspaceById(id: string) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL!}/api/workspaces/${id}`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch workspace ${id}: ${response.statusText}`);
  return response.json();
}

export async function createWorkspace({ name }: { name: string }) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL!}/api/workspaces`,
    {
      method: 'POST',
      body: JSON.stringify({ name }),
    },
  );

  if (!response.ok)
    throw new Error(`Failed to create workspace: ${response.statusText}`);
  return response.json();
}
