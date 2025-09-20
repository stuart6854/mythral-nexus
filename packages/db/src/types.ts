import { workspacesTable, projectsTable } from './db/schema.js';

export type NewWorkspace = typeof workspacesTable.$inferInsert;
export type Workspace = typeof workspacesTable.$inferSelect;

export type NewProject = typeof projectsTable.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;
