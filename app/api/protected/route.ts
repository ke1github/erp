import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/authMiddleware';

export async function GET(request: NextRequest) {
  // Extract the token from the Authorization header
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.split(' ')[1]; // Assumes "Bearer token"

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  // Verify the token
  const user = verifyToken(token);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
  }

  return NextResponse.json({ message: 'This is a protected route', user });
}
