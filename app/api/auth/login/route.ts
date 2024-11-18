import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  const { identifier, password } = await request.json();

  try {
    await connectToDatabase();

    // Find user by either email or username
    const user = await User.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    }).select('+password'); // Explicitly include password field

    // If user not found
    if (!user) {
      return NextResponse.json({ error: 'Invalid email/username or password' }, { status: 401 });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid email/username or password' }, { status: 401 });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token back to client
    return NextResponse.json({ token }, { status: 200 });
  } catch (err) {
    console.error('Login Error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
