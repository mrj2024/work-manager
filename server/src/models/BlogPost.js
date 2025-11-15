import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    coverImage: String,
    author: { type: String, required: true },
    body: { type: String, required: true },
    published: { type: Boolean, default: false },
    draft: { type: Boolean, default: true },
    tags: [String]
  },
  { timestamps: true }
);

blogPostSchema.index({ title: 'text', body: 'text' });
blogPostSchema.index({ tags: 1 });

export default mongoose.model('BlogPost', blogPostSchema);
