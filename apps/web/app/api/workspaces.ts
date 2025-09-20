import type { Workspace, NewWorkspace } from '@mythral/db';

export type { Workspace, NewWorkspace };

export async function getWorkspaces(): Promise<Workspace[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces`);
  if (!response.ok) throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
  return response.json();
}

export async function getWorkspaceById(id: string): Promise<Workspace> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch workspace ${id}: ${response.statusText}`);
  return response.json();
}

export async function createWorkspace(workspace: NewWorkspace): Promise<Workspace> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces`, {
    method: 'POST',
    body: JSON.stringify(workspace),
  });

  if (!response.ok) throw new Error(`Failed to create workspace: ${response.statusText}`);
  return response.json();
}
