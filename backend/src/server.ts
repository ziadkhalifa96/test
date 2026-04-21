import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/authRoutes';
import pageRoutes from './routes/pageRoutes';
import sectionRoutes from './routes/sectionRoutes';
import productRoutes from './routes/productRoutes';
import mediaRoutes from './routes/mediaRoutes';
import inquiryRoutes from './routes/inquiryRoutes';
import rateLimit from 'express-rate-limit';
import { redirectMiddleware } from './middleware/redirectMiddleware';
import { PageStatus } from '@prisma/client';

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Admin routes rate limiting
const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30, // Stricter limit for sensitive routes
  message: 'Too many login attempts, please try again later'
});

// Middleware
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173',
  'http://localhost:3000'
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(express.json());
app.use(morgan('dev'));

// Ensure uploads directories exist
const uploadsDir = path.join(process.cwd(), 'uploads');
const tempDir = path.join(uploadsDir, 'temp');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

// Static files (Media)
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api', apiLimiter, redirectMiddleware);
app.use('/api/auth', adminLimiter, authRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/products', productRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Centralized Error Handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({
    success: false,
    status,
    message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

app.listen(PORT, () => {
  console.log(`[Server]: Running on port ${PORT}`);
  
  // START PUBLISHING SCHEDULER
  setInterval(async () => {
    try {
      const now = new Date();
      const result = await prisma.page.updateMany({
        where: {
          status: PageStatus.SCHEDULED,
          publishAt: { lte: now }
        },
        data: {
          status: PageStatus.PUBLISHED,
          publishAt: null // Clear scheduled date after publishing
        }
      });
      if (result.count > 0) {
        console.log(`[Scheduler]: Automatically published ${result.count} pages.`);
      }
    } catch (error) {
      console.error('[Scheduler Error]:', error);
    }
  }, 1000 * 60 * 5); // Check every 5 minutes
});

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
