import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import documentRoutes from './routes/documentRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import toolsRoutes from './routes/toolsRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;
const uploadDir = process.env.UPLOAD_DIR || path.resolve('server/uploads');
const normalizeOrigin = (origin = '') => origin.replace(/\/$/, '').trim();
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(normalizeOrigin)
  .filter(Boolean);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(normalizeOrigin(origin))) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/uploads', express.static(uploadDir));

app.use('/api/auth', authRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/tools', toolsRoutes);

app.get('/', (req, res) => res.json({ status: 'API Running' }));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

start();
