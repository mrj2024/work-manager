import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { body } from 'express-validator';
import {
  listDocuments,
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
  uploadDocument,
  exportDocument
} from '../controllers/documentController.js';
import { authenticate } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();
const uploadDir = process.env.UPLOAD_DIR || path.resolve('server/uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

router.use(authenticate);

router.get('/', listDocuments);
router.post('/', [body('title').notEmpty()], handleValidation, createDocument);
router.post('/upload', upload.single('file'), uploadDocument);
router.get('/:id', getDocument);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);
router.get('/:id/export', exportDocument);

export default router;
