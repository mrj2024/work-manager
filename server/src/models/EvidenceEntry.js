import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    itemName: String,
    time: String,
    officer: String,
    location: String,
    signature: String
  },
  { timestamps: true }
);

const evidenceEntrySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
    entries: [logSchema]
  },
  { timestamps: true }
);

export default mongoose.model('EvidenceEntry', evidenceEntrySchema);
