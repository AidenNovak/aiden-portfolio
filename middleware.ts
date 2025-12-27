import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if path starts with /admin
  if (path.startsWith('/admin')) {
    // Allow login page
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    // Check for session cookie
    const session = request.cookies.get('admin-session');

    if (!session) {
      // Redirect to login if no session
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
};
