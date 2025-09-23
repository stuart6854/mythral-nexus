import 'server-only';
import type { Project } from '@mythral/db';

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`);
  if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
  return (await response.json()) as Project[];
}
