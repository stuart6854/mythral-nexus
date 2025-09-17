export async function getProjects() {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`);
  if (!response.ok) throw new Error(`Failed to fetch projects: ${response.statusText}`);
  return response.json();
}

export async function createProject({ name, desc }: { name: string; desc: string }) {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`, {
    method: 'POST',
    body: JSON.stringify({ name, desc }),
  });

  if (!response.ok) throw new Error(`Failed to create project: ${response.statusText}`);
  return response.json();
}
