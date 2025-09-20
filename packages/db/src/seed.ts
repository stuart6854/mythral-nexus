import 'dotenv/config';
import { db } from './index.js';
import { workspacesTable, projectsTable } from './db/schema.js';

type Workspace = typeof workspacesTable.$inferInsert;
type Project = typeof projectsTable.$inferInsert;

const cleanUp = async () => {
  // clean up before the seeding (optional)
  await db.delete(workspacesTable);
  await db.delete(projectsTable);
};

const seed = async () => {
  await cleanUp();

  const workspace = (
    await db
      .insert(workspacesTable)
      .values({
        name: 'Default Workspace',
      })
      .returning()
  )[0]!;

  await db.insert(projectsTable).values({
    name: 'Default Project',
    desc: 'This is the default project',
    workspaceId: workspace.id,
  });
};

seed();
