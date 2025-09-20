import 'dotenv/config';
import { db } from './index.js';
import { workspaces, projects } from './schema.js';

type Workspace = typeof workspaces.$inferInsert;
type Project = typeof projects.$inferInsert;

const cleanUp = async () => {
  // clean up before the seeding (optional)
  await db.delete(workspaces);
  await db.delete(projects);
};

const seed = async () => {
  await cleanUp();

  const workspace = (
    await db
      .insert(workspaces)
      .values({
        name: 'Default Workspace',
      })
      .returning()
  )[0]!;

  await db.insert(projects).values({
    name: 'Default Project',
    desc: 'This is the default project',
    workspaceId: workspace.id,
  });
};

seed();
