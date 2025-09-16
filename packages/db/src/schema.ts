import { relations } from 'drizzle-orm';
import { pgTable, integer, varchar, text, uuid, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: uuid().primaryKey().defaultRandom(),

  name: text().notNull(),
  description: varchar({ length: 256 }).notNull(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().$onUpdate(() => new Date()),
});

export const projectRelations = relations(projects, ({ many }) => ({
  resources: many(resources),
  packages: many(packages),
}));

export const resources = pgTable('resources', {
  id: uuid().primaryKey().defaultRandom(),

  project_id: uuid().notNull(),

  name: varchar({ length: 128 }).notNull(),
  type: varchar({ length: 32 }).notNull(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().$onUpdate(() => new Date()),
});

export const resourcesRelations = relations(resources, ({ one, many }) => ({
  projects: one(projects, {
    fields: [resources.project_id],
    references: [projects.id],
  }),
  packages: many(packages),
}));

export const packages = pgTable('packages', {
  id: uuid().primaryKey().defaultRandom(),

  project_id: uuid().notNull(),

  description: varchar({ length: 256 }).notNull(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp().$onUpdate(() => new Date()),
});

export const packagesRelations = relations(packages, ({ one, many }) => ({
  projects: one(projects, {
    fields: [packages.project_id],
    references: [projects.id],
  }),
  resources: many(resources),
}));

export const resourcesToPackages = pgTable('resources_to_packages', {
  resource_id: uuid().notNull(),
  package_id: uuid().notNull(),
});

export const resourcesToPackagesRelations = relations(resourcesToPackages, ({ one }) => ({
  resources: one(resources, {
    fields: [resourcesToPackages.resource_id],
    references: [resources.id],
  }),
  packages: one(packages, {
    fields: [resourcesToPackages.package_id],
    references: [packages.id],
  }),
}));
