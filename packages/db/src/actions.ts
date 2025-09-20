import { eq } from 'drizzle-orm';
import { db } from './client.js';
import { workspacesTable, projectsTable } from './db/schema.js';
import { NewProject, NewWorkspace } from './types.js';

export async function getWorkspaces() {
  return db.select().from(workspacesTable);
}

export async function getWorkspaceById(id: string) {
  return db.query.workspacesTable.findFirst({
    where: eq(workspacesTable.id, id),
  });
}

export async function createWorkspace(workspace: NewWorkspace) {
  const [wks] = await db.insert(workspacesTable).values(workspace).returning();
  return wks;
}

export async function getProjects() {
  return db.select().from(projectsTable);
}

export async function getProjectById(id: string) {
  return db.query.projectsTable.findFirst({
    where: eq(projectsTable.id, id),
  });
}

export async function createProject(project: NewProject) {
  const [prj] = await db.insert(projectsTable).values(project).returning();
  return prj;
}
