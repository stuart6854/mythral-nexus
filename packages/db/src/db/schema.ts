import { relations } from 'drizzle-orm';
import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const workspacesTable = pgTable('workspaces', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),

  name: varchar('name').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const workspacesRelations = relations(workspacesTable, ({ many }) => ({
  projects: many(projectsTable),
}));

export const projectsTable = pgTable('projects', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),

  name: varchar('name').notNull(),
  desc: varchar('desc'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),

  workspaceId: uuid('workspace_id')
    .notNull()
    .references(() => workspacesTable.id, { onDelete: 'cascade' }),
});

export const projectsRelations = relations(projectsTable, ({ one }) => ({
  workspace: one(workspacesTable, {
    fields: [projectsTable.workspaceId],
    references: [workspacesTable.id],
  }),
}));
