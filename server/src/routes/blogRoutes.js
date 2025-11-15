import { Router } from 'express';
import { listPosts, getPost } from '../controllers/blogController.js';

const router = Router();

router.get('/', listPosts);
router.get('/:id', getPost);

export default router;
