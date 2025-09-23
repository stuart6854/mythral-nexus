import 'server-only';
import type { Workspace } from '@mythral/db';

export const getWorkspaceById = async (id: string): Promise<Workspace> => {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch workspace ${id}: ${response.statusText}`);
  return (await response.json()) as Workspace;
};
