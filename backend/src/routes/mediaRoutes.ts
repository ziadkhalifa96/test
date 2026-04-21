import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import { uploadMedia, getAllMedia, hardDeleteMedia } from '../controllers/mediaController';
import { authenticate, authorize } from '../middleware/authMiddleware';
import { Role } from '@prisma/client';

const router = Router();

// Configure Multer for temporary storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/temp');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images (jpg, png, webp) are allowed'));
  }
});

// Protected routes
router.post('/upload', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR]), upload.single('file'), uploadMedia);
router.get('/', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN, Role.EDITOR, Role.VIEWER]), getAllMedia);
router.delete('/:id', authenticate, authorize([Role.SUPER_ADMIN, Role.ADMIN]), hardDeleteMedia);

export default router;
