import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { logAction } from '../utils/auditLogger';
import { PageStatus } from '@prisma/client';

export const getPages = async (req: Request, res: Response) => {
  try {
    const pages = await prisma.page.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      }
    });

    res.status(200).json({ success: true, data: pages });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pages', error });
  }
};

export const getPageBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    
    // Determine if the param is a UUID (for Builder) or a Slug (for Frontend)
    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(slug);
    const whereClause = isUUID ? { id: slug } : { slug };

    const page = await prisma.page.findFirst({
      where: whereClause,
      include: {
        sections: {
          where: { isVisible: true },
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!page) {
      return res.status(404).json({ message: 'Page not found' });
    }

    // AUTH CHECK: Only admins/editors can see Draft/Scheduled pages
    if (page.status !== PageStatus.PUBLISHED) {
      const user = req.user; // Populated by optionalAuth middleware if we had one, otherwise check manually
      if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN' && user.role !== 'EDITOR')) {
        return res.status(404).json({ message: 'Page not published' });
      }
    }

    res.status(200).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching page', error });
  }
};

export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, slug, description, seoTitle, seoDescription, ogImage } = req.body;
    const userId = req.user?.userId;

    const page = await prisma.page.create({
      data: {
        title,
        slug,
        description,
        seoTitle,
        seoDescription,
        ogImage,
        status: PageStatus.DRAFT
      }
    });

    if (userId) {
      await logAction(userId, 'CREATE', 'PAGE', page.id, { title, slug });
    }

    res.status(201).json({ success: true, data: page });
  } catch (error) {
    res.status(500).json({ message: 'Error creating page', error });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user?.userId;

    // Before updating, create a version if it's a major change
    const currentPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: true }
    });

    if (!currentPage) return res.status(404).json({ message: 'Page not found' });

    // Create version snapshot before significant changes
    if (userId) {
      await prisma.pageVersion.create({
        data: {
          pageId: id,
          version: currentPage.version,
          content: currentPage.sections as any,
          createdBy: userId
        }
      });
    }

    // SLUG CHANGE HANDLING: Automatic Redirect
    if (data.slug && data.slug !== currentPage.slug) {
      await prisma.redirect.upsert({
        where: { fromSlug: currentPage.slug },
        update: { toSlug: data.slug },
        create: {
          fromSlug: currentPage.slug,
          toSlug: data.slug,
          pageId: id
        }
      });
    }

    const updatedPage = await prisma.page.update({
      where: { id },
      data: {
        ...data,
        version: { increment: 1 }
      }
    });

    if (userId) {
      await logAction(userId, 'UPDATE', 'PAGE', id, { ...data, oldSlug: currentPage.slug });
    }

    res.status(200).json({ success: true, data: updatedPage });
  } catch (error) {
    res.status(500).json({ message: 'Error updating page', error });
  }
};

export const hardDeletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Transactional hard delete of all related items
    await prisma.$transaction([
      prisma.section.deleteMany({ where: { pageId: id } }),
      prisma.pageVersion.deleteMany({ where: { pageId: id } }),
      prisma.redirect.deleteMany({ where: { pageId: id } }),
      prisma.page.delete({ where: { id } })
    ]);

    if (userId) {
      await logAction(userId, 'DELETE', 'PAGE', id);
    }

    res.status(200).json({ success: true, message: 'Page permanently deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting page', error });
  }
};

export const getPageVersions = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const versions = await prisma.pageVersion.findMany({
      where: { pageId: id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { name: true, email: true } }
      }
    });
    res.status(200).json({ success: true, data: versions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching versions', error });
  }
};

export const rollbackPage = async (req: Request, res: Response) => {
  try {
    const { id, versionId } = req.params;
    const userId = req.user?.userId;

    const version = await prisma.pageVersion.findUnique({
      where: { id: versionId }
    });

    if (!version || version.pageId !== id) {
      return res.status(404).json({ message: 'Version not found' });
    }

    // 1. Snapshot the CURRENT state before rolling back
    const currentPage = await prisma.page.findUnique({
      where: { id },
      include: { sections: true }
    });

    if (currentPage && userId) {
      await prisma.pageVersion.create({
        data: {
          pageId: id,
          version: currentPage.version,
          content: currentPage.sections as any,
          createdBy: userId
        }
      });
    }

    // 2. Clear current sections
    await prisma.section.deleteMany({ where: { pageId: id } });

    // 3. Restore sections from version content
    const sectionsToRestore = version.content as any[];
    await prisma.page.update({
      where: { id },
      data: {
        version: { increment: 1 },
        sections: {
          create: sectionsToRestore.map((s, i) => ({
            type: s.type,
            config: s.config,
            order: s.order || i + 1,
            isVisible: s.isVisible ?? true
          }))
        }
      }
    });

    if (userId) {
      await logAction(userId, 'ROLLBACK', 'PAGE', id, { version: version.version });
    }

    res.status(200).json({ success: true, message: 'Rollback successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error rolling back page', error });
  }
};
