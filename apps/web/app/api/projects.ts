import type { Project, NewProject } from '@mythral/db';

export type { Project, NewProject };

export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`);
  if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
  return response.json();
}

export async function getProjectById(id: string): Promise<Project> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch project ${id}: ${response.statusText}`);
  return response.json();
}

export async function createProject(project: NewProject): Promise<Project> {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`, {
    method: 'POST',
    body: JSON.stringify(project),
  });

  if (!response.ok) throw new Error(`Failed to create project: ${response.statusText}`);

  return await response.json();
}
