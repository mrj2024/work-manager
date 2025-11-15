import { Router } from 'express';
import { body } from 'express-validator';
import { register, login, me, refreshToken } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { handleValidation } from '../middleware/validate.js';

const router = Router();

router.post(
  '/register',
  [body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
  handleValidation,
  register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], handleValidation, login);
router.get('/me', authenticate, me);
router.post('/refresh', [body('refreshToken').notEmpty()], handleValidation, refreshToken);

export default router;
