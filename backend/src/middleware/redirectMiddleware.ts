import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const redirectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Only check for GET requests on page-related paths
  if (req.method !== 'GET') return next();

  const pathSegments = req.path.split('/').filter(Boolean);
  
  // Handle paths like /api/pages/:slug or /p/:slug (frontend routing)
  let slug = '';
  if (pathSegments[0] === 'api' && pathSegments[1] === 'pages' && pathSegments.length === 3) {
    slug = pathSegments[2];
  }

  if (!slug) return next();

  try {
    const redirect = await prisma.redirect.findUnique({
      where: { fromSlug: slug }
    });

    if (redirect) {
      // Return a redirect response (301 Moved Permanently)
      return res.status(301).json({
        success: true,
        redirect: true,
        to: redirect.toSlug,
        message: `Slug ${slug} moved to ${redirect.toSlug}`
      });
    }
  } catch (error) {
    console.error('[Redirect Middleware Error]:', error);
  }

  next();
};
