import { NextResponse } from 'next/server';
import { verifyToken} from '@/lib/authMiddleware';
import User from '@/models/User';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: Request) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Extract the token from the Authorization header
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];

    // Check if the token exists
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
    }

    // Verify the token
    const decoded = verifyToken(token);

    // Handle case where the token is invalid or decoding fails
    if (!decoded || typeof decoded.userId !== 'string') {
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    // Fetch the user from the database using the decoded userId
    const user = await User.findById(decoded.userId).select('-password');

    // Check if the user exists
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user);

  } catch (error) {
    console.error('Error in profile route:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
