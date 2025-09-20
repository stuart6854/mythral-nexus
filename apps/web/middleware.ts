import { NextRequest, NextResponse } from 'next/server';
import { createWorkspace, getWorkspaces, Workspace } from '@/api/workspaces';

export async function middleware(req: NextRequest) {
  const workspaces: Workspace[] = await getWorkspaces();
  if (workspaces.length === 0) {
    workspaces[0] = await createWorkspace({ name: 'Default Workspace' });
  }
  return NextResponse.redirect(new URL(`/${workspaces[0]!.id}`, req.url));
}

export const config = {
  matcher: '/',
};
