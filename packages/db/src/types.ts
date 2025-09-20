import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { workspaces, projects } from './schema.js';

export type Workspace = InferSelectModel<typeof workspaces>;
export type NewWorkspace = InferInsertModel<typeof workspaces>;

export type Project = InferSelectModel<typeof projects>;
export type NewProject = InferInsertModel<typeof projects>;
