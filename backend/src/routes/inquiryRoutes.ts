import { Router } from 'express';
import { createInquiry, getInquiries, markAsRead, hardDeleteInquiry } from '../controllers/inquiryController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Public route
router.post('/', createInquiry);

// Protected routes
router.get('/', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), getInquiries);
router.patch('/:id/read', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), markAsRead);
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeleteInquiry);

export default router;
