import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Payload CMS handles /admin routes natively.
  // This middleware is for protecting custom frontend routes (e.g. /volunteer-portal)
  
  const isProtectedPath = request.nextUrl.pathname.startsWith('/volunteer-portal');
  
  if (isProtectedPath) {
    // Check for Payload's payload-token cookie
    const token = request.cookies.get('payload-token')?.value;

    if (!token) {
      // Redirect to login if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - admin (Payload admin routes are handled by Payload)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|admin).*)',
  ],
};
