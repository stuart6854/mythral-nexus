import 'server-only';
import type { NewProject, Project } from '@mythral/db';

export async function createProject(project: NewProject): Promise<Project> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`, {
    method: 'POST',
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error(`Failed to create project: ${response.statusText}`);
  return (await response.json()) as Project;
}
