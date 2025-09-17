import { PrismaClient } from './generated/prisma/index.js';

export const prisma = new PrismaClient();

export async function getProjects() {
  return prisma.project.findMany();
}

export async function createProject({
  name,
  desc,
}: {
  name: string;
  desc: string;
}) {
  return prisma.project.create({
    data: {
      name: name,
      description: desc,
    },
  });
}
