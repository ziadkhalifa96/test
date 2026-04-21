import { Router } from 'express';
import { login, register } from '../controllers/authController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

router.post('/login', login);

// Only Super Admins and Admins can create new users
router.post('/register', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), register);

export default router;
