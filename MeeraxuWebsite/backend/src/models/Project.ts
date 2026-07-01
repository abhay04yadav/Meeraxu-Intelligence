import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  technologies: string[];
  link: string;
  details: string;
  stats: string;
  phases: {
    n: string;
    title: string;
    sub: string;
    body: string;
    bullets: string[];
  }[];
  gallery: {
    mediaType: string;
    url?: string;
    content?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false },
    technologies: [{ type: String }],
    link: { type: String },
    details: { type: String },
    stats: { type: String },
    phases: [
      {
        n: { type: String },
        title: { type: String },
        sub: { type: String },
        body: { type: String },
        bullets: [{ type: String }],
      },
    ],
    gallery: [
      {
        mediaType: { type: String, default: 'image' },
        url: { type: String },
        content: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IProject>('Project', ProjectSchema);
