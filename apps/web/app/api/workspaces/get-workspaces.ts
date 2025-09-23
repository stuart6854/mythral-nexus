import 'server-only';
import type { Workspace } from '@mythral/db';

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces`);
  if (!response.ok) throw new Error(`Failed to fetch workspaces: ${response.statusText}`);
  return (await response.json()) as Workspace[];
};
