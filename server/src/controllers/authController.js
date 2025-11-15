import User from '../models/User.js';
import { generateTokens, verifyRefreshToken } from '../services/tokenService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: 'Email already registered' });
  }
  const user = await User.create({
    name,
    email,
    password,
    role: 'pending',
    approved: false
  });
  res.status(201).json({
    message: 'Registration received. Await admin approval.',
    userId: user._id
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  if (!user.approved || user.role === 'pending') {
    return res.status(403).json({ message: 'Account pending approval' });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const tokens = generateTokens(user);
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    ...tokens
  });
});

export const me = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

export const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken: token } = req.body;
  if (!token) return res.status(400).json({ message: 'Refresh token required' });
  try {
    const payload = verifyRefreshToken(token);
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).json({ message: 'Invalid refresh token' });
    const tokens = generateTokens(user);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: 'Invalid refresh token' });
  }
});
