import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';

// Update user by ID
export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDatabase();

  try {
    const data = await request.json();
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// Delete user by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  await connectToDatabase();

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
