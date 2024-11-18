import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = process.env.JWT_SECRET as string;

if (!JWT_SECRET) {
  throw new Error('Missing JWT_SECRET environment variable');
}

export async function POST(request: Request) {
  try {
    // Parse request body
        const body = await request.json();

    const { name, username, email, password, department, role } = body;

    // Validate required fields
    if (!name || !username || !email || !password || !department || !role) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectToDatabase();

    // Check if a user with the same email or username already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ error: 'User with that email or username already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword, department, role });

    // Save new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id.toString(), username: newUser.username, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token }, { status: 201 });
  } catch (error) {
    console.error('Registration Error:', error);
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
