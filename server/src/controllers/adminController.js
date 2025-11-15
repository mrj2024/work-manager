import User from '../models/User.js';
import Document from '../models/Document.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPendingUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ role: 'pending', approved: false }).select('-password');
  res.json(users);
});

export const approveUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.role = 'user';
  user.approved = true;
  await user.save();
  res.json({ message: 'User approved', user: { id: user._id, role: user.role } });
});

export const rejectUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  await user.deleteOne();
  res.json({ message: 'User rejected and removed' });
});

export const getAllDocuments = asyncHandler(async (req, res) => {
  const documents = await Document.find().populate('user', 'name email');
  res.json(documents);
});
