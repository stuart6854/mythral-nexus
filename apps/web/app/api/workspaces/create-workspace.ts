import 'server-only';
import type { Workspace, NewWorkspace } from '@mythral/db';

export const createWorkspace = async (workspace: NewWorkspace): Promise<Workspace> => {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/workspaces`, {
    method: 'POST',
    body: JSON.stringify(workspace),
  });

  if (!response.ok) throw new Error(`Failed to create workspace: ${response.statusText}`);
  return (await response.json()) as Workspace;
};
