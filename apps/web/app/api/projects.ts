export async function getProjects() {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`);
  if (!response.ok)
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
  return response.json();
}

export async function getProjectById(id: string) {
  const response = await fetch(
    `${process.env.BACKEND_API_URL!}/api/projects/${id}`,
  );
  if (!response.ok)
    throw new Error(`Failed to fetch project ${id}: ${response.statusText}`);
  return response.json();
}

export async function createProject({
  workspaceId,
  name,
  desc,
}: {
  workspaceId: string;
  name: string;
  desc: string;
}) {
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects`, {
    method: 'POST',
    body: JSON.stringify({ workspaceId, name, desc }),
  });

  if (!response.ok)
    throw new Error(`Failed to create project: ${response.statusText}`);

  return await response.json();
}
