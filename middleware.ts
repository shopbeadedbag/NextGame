import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // Check if this is a 404 page request
  if (pathname !== '/404') {
    // For production, you might want to check against known routes
    // For now, we'll let the Next.js handle 404 detection and just redirect when needed

    // If user is trying to access /404 directly, let it through
    if (pathname === '/404') {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip all internal paths (_next, assets, api)
    '/((?!_next|api|assets|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};