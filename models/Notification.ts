import mongoose, { Document, Schema, model } from 'mongoose';

export interface INotification extends Document {
  message: string;
  read: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.models.Notification || model<INotification>('Notification', notificationSchema);

export default Notification;
