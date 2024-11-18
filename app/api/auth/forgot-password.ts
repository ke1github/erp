import { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '@/lib/mongodb';
import User from '@/models/User';
import sendEmail from '@/utils/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const resetToken = user.generatePasswordResetToken();
    await user.save();

    const resetLink = `${process.env.BASE_URL}/reset-password/${resetToken}`;
    await sendEmail(user.email, 'Password Reset', `Click here to reset your password: ${resetLink}`);

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error sending password reset link' });
  }
}
