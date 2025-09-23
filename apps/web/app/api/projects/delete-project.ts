import 'server-only';

export async function deleteProject(id: string): Promise<void> {
  console.log(`Deleting project with ID: ${id}`);
  const response = await fetch(`${process.env.BACKEND_API_URL!}/api/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`Failed to delete project '${id}': ${response.statusText}`);
}
