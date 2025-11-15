import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';
import { body } from 'express-validator';
import { getPendingUsers, approveUser, rejectUser, getAllDocuments } from '../controllers/adminController.js';
import { createPost, updatePost, deletePost, listAllPosts } from '../controllers/blogController.js';

const router = Router();
router.use(authenticate, authorize('admin'));

router.get('/users/pending', getPendingUsers);
router.put('/users/:id/approve', approveUser);
router.put('/users/:id/reject', rejectUser);
router.get('/documents', getAllDocuments);
router.get('/blog', listAllPosts);

router.post(
  '/blog',
  [body('title').notEmpty(), body('body').notEmpty(), body('author').notEmpty()],
  handleValidation,
  createPost
);
router.put('/blog/:id', updatePost);
router.delete('/blog/:id', deletePost);

export default router;
