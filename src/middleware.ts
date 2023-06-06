import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authOptions } from './lib/auth';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Redirect to the home page if the path is `/about` or `/dashboard`
  const token = await getToken({ req: request, secret: process.env.NEXT_AUTH_SECRET });
  
  if(token) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/', request.url));
}



export const config = {
  matcher: ['/about/:path*', '/dashboard/:path*'],
};