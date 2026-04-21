import { Router } from 'express';
import { 
  getProducts, 
  createProduct, 
  updateProduct, 
  hardDeleteProduct,
  getCategories,
  createCategory,
  hardDeleteCategory
} from '../controllers/productController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Public routes
router.get('/', getProducts);
router.get('/categories', getCategories);

// Protected routes
router.post('/', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), createProduct);
router.patch('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), updateProduct);
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeleteProduct);

router.post('/categories', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), createCategory);
router.delete('/categories/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeleteCategory);

export default router;
