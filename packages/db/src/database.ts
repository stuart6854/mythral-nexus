import { PrismaClient } from './generated/prisma/index.js';

export const prisma = new PrismaClient();

async function getProjects() {
  return prisma.project.findMany();
}

export { getProjects };
