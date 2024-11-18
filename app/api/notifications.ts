import { NextResponse } from 'next/server';
import Notification from '@/models/Notification';
import { connectToDatabase } from '@/lib/mongodb';
import jwt, { JwtPayload } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken extends JwtPayload {
  id: string;
}

export async function GET(request: Request) {
  try {
    await connectToDatabase();

    // Extract the Authorization header
    const authHeader = request.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No token provided' }, { status: 401 });
    }

    let userId: string;

    // Verify the token and extract user ID
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      if (!decoded.id) {
        return NextResponse.json({ error: 'Invalid token structure' }, { status: 401 });
      }
      userId = decoded.id;
    } catch (err) {
      console.error('Token verification error:', err);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch notifications for the logged-in user
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 }).exec();

    return NextResponse.json(notifications, { status: 200 });

  } catch (err) {
    console.error('Error fetching notifications:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
