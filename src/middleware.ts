import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Protect /admin routes but allow /admin/login
  if (path.startsWith('/admin') && path !== '/admin/login') {
    const authCookie = request.cookies.get('admin_session');

    // In a real app, you'd verify the session token here
    // For this simple portfolio, we just check if the cookie exists and has a specific value
    if (!authCookie || authCookie.value !== 'authenticated') {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/admin'],
};
