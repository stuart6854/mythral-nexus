import { PrismaClient } from './generated/prisma/index.js';
export const prisma = new PrismaClient();
export async function getWorkspaces() {
    return prisma.workspace.findMany();
}
export async function getWorkspaceById(id) {
    return prisma.workspace.findUnique({
        where: {
            id: id,
        },
    });
}
export async function createWorkspace({ name }) {
    return prisma.workspace.create({
        data: {
            name: name,
        },
    });
}
export async function getProjects() {
    return prisma.project.findMany();
}
export async function getProjectById(id) {
    return prisma.project.findUnique({
        where: {
            id: id,
        },
    });
}
export async function createProject({ name, desc, }) {
    return prisma.project.create({
        data: {
            name: name,
            description: desc,
        },
    });
}
