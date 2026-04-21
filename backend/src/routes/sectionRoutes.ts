import { Router } from 'express';
import { 
  getSectionsByPage, 
  createSection, 
  updateSection, 
  reorderSections, 
  hardDeleteSection, 
  duplicateSection 
} from '../controllers/sectionController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes (if needed for preview, but usually handled by page route)
router.get('/page/:pageId', getSectionsByPage);

// Protected routes
router.post('/', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), createSection);
router.patch('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), updateSection);
router.post('/reorder', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), reorderSections);
router.post('/:id/duplicate', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), duplicateSection);
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeleteSection);

export default router;
