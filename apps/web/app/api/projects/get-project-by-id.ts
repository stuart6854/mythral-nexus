import 'server-only';
import type { Project } from '@mythral/db';

export async function getProjectById(id: string): Promise<Project> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch project '${id}': ${response.statusText}`);
  return (await response.json()) as Project;
}
