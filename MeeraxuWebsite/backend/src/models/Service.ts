import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  icon: string;
  shortCode: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    icon: { type: String, required: false },
    shortCode: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model<IService>('Service', ServiceSchema);
