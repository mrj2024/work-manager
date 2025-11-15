import jwt from 'jsonwebtoken';

const accessTokenTtl = '1h';
const refreshTokenTtl = '7d';

export const generateTokens = (user) => {
  const payload = { id: user._id, role: user.role };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: accessTokenTtl });
  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: refreshTokenTtl });
  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
export const verifyRefreshToken = (token) => jwt.verify(token, process.env.JWT_REFRESH_SECRET);
