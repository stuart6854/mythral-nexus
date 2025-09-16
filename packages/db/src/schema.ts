import { pgTable, serial, text, varchar, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  rid: varchar('rid', { length: 64 }).notNull(), // ResourceID (stable)

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),

  kind: varchar('kind', { length: 32 }).notNull(), // texture, audio, mesh, etc.
  metadata: text('metadata'), // JSON string (small)

  hash: varchar('hash', { length: 128 }).notNull(), // content hash
});

export const packages = pgTable('packages', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 64 }).notNull(), // e.g. base, dlc0, dlc1, etc.

  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});
