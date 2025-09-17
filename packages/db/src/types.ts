import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { projectsTable, resourcesTable, packagesTable } from './schema';

export type Project = InferSelectModel<typeof projectsTable>;
export type NewProject = InferInsertModel<typeof projectsTable>;

export type Resource = InferSelectModel<typeof resourcesTable>;
export type NewResource = InferInsertModel<typeof resourcesTable>;

export type Package = InferSelectModel<typeof packagesTable>;
export type NewPackage = InferInsertModel<typeof packagesTable>;
