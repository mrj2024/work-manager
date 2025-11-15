import mongoose from 'mongoose';

const versionSchema = new mongoose.Schema(
  {
    content: String,
    savedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const documentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true },
    content: { type: String, default: '' },
    status: { type: String, enum: ['draft', 'final'], default: 'draft' },
    versions: [versionSchema],
    fileKey: String,
    originalName: String
  },
  { timestamps: true }
);

documentSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Document', documentSchema);
