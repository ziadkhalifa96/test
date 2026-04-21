import { Router } from 'express';
import { getPages, getPageBySlug, createPage, updatePage, hardDeletePage, getPageVersions, rollbackPage } from '../controllers/pageController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', getPages);
router.get('/:slug', getPageBySlug);

// Protected routes
router.post('/', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), createPage);
router.patch('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), updatePage);
router.get('/:id/versions', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), getPageVersions);
router.post('/:id/rollback/:versionId', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), rollbackPage);
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeletePage);

export default router;
