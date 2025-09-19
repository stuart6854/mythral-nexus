import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const cleanUp = async () => {
  // clean up before the seeding (optional)
  await prisma.workspace.deleteMany();
  await prisma.project.deleteMany();
};

const seed = async () => {
  await cleanUp();

  const workspace = await prisma.workspace.create({
    data: {
      name: 'Default Workspace',
    },
  });

  const project = await prisma.project.create({
    data: {
      name: 'Default Project',
      description: 'This is the default project',
      workspaceId: workspace.id,
    },
  });
};

seed();
