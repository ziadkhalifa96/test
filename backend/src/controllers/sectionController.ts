import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { logAction } from '../utils/auditLogger';

export const getSectionsByPage = async (req: Request, res: Response) => {
  try {
    const { pageId } = req.params;
    const sections = await prisma.section.findMany({
      where: { pageId },
      orderBy: { order: 'asc' }
    });
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sections', error });
  }
};

export const createSection = async (req: Request, res: Response) => {
  try {
    const { type, config, order, pageId, isTemplate, templateName } = req.body;
    const userId = req.user?.userId;

    const section = await prisma.section.create({
      data: {
        type,
        config,
        order,
        pageId,
        isTemplate: isTemplate || false,
        templateName
      }
    });

    if (userId) {
      await logAction(userId, 'CREATE', 'SECTION', section.id, { type, pageId });
    }

    res.status(201).json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ message: 'Error creating section', error });
  }
};

export const updateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user?.userId;

    const section = await prisma.section.update({
      where: { id },
      data
    });

    if (userId) {
      await logAction(userId, 'UPDATE', 'SECTION', id, data);
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ message: 'Error updating section', error });
  }
};

export const reorderSections = async (req: Request, res: Response) => {
  try {
    const { sections } = req.body; // Array of {id, order}
    const userId = req.user?.userId;

    const updates = sections.map((s: { id: string, order: number }) =>
      prisma.section.update({
        where: { id: s.id },
        data: { order: s.order }
      })
    );

    await prisma.$transaction(updates);

    if (userId) {
      await logAction(userId, 'REORDER', 'SECTION', 'multiple');
    }

    res.status(200).json({ success: true, message: 'Sections reordered' });
  } catch (error) {
    res.status(500).json({ message: 'Error reordering sections', error });
  }
};

export const hardDeleteSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    await prisma.section.delete({
      where: { id }
    });

    if (userId) {
      await logAction(userId, 'DELETE', 'SECTION', id);
    }

    res.status(200).json({ success: true, message: 'Section permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting section', error });
  }
};

export const duplicateSection = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const original = await prisma.section.findUnique({ where: { id } });
    if (!original) return res.status(404).json({ message: 'Section not found' });

    const duplicated = await prisma.section.create({
      data: {
        type: original.type,
        config: original.config as any,
        order: original.order + 1,
        pageId: original.pageId,
        isTemplate: original.isTemplate,
        templateName: original.templateName ? `${original.templateName} (Copy)` : null
      }
    });

    if (userId) {
      await logAction(userId, 'DUPLICATE', 'SECTION', duplicated.id);
    }

    res.status(201).json({ success: true, data: duplicated });
  } catch (error) {
    res.status(500).json({ message: 'Error duplicating section', error });
  }
};
