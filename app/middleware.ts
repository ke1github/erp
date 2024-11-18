import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authMiddleware';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // If no token is found, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Verify the token
  const decoded = verifyToken(token);

  // If the token is invalid, redirect to the login page
  if (!decoded) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Token is valid, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply middleware to all routes under /dashboard
};
