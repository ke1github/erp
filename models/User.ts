import { Schema, Document, model, models } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'MANAGER', 'USER'], default: 'USER' },
}, { timestamps: true });

// Use existing model if it exists, otherwise create a new one
const User = models.User || model<IUser>('User', userSchema);
export default User;
