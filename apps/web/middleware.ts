import { NextRequest, NextResponse } from 'next/server';
import { getWorkspaces } from '@/api/workspaces';
import { getProjects } from '@/api/projects';

export async function middleware(req: NextRequest) {
  const workspaces = await getWorkspaces();
  return NextResponse.redirect(new URL(`/${workspaces[0].id}`, req.url));
}

export const config = {
  matcher: '/',
};
