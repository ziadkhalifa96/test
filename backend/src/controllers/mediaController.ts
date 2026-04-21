import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { logAction } from '../utils/auditLogger';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

export const uploadMedia = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { alt } = req.body;
    const userId = req.user?.userId;

    const file = req.file;
    const filename = `${Date.now()}-${file.originalname.split('.')[0]}.webp`;
    const outputPath = path.join('uploads', filename);

    // Image optimization with Sharp
    await sharp(file.path)
      .webp({ quality: 80 })
      .toFile(outputPath);

    // Delete temporary file
    fs.unlinkSync(file.path);

    const media = await prisma.media.create({
      data: {
        url: `/uploads/${filename}`,
        filename: filename,
        alt: alt || '',
        mimetype: 'image/webp',
        size: fs.statSync(outputPath).size,
        metadata: {}
      }
    });

    if (userId) {
      await logAction(userId, 'UPLOAD', 'MEDIA', media.id);
    }

    res.status(201).json({ success: true, data: media });
  } catch (error) {
    console.error('[Upload Error]:', error);
    res.status(500).json({ message: 'Error uploading media', error });
  }
};

export const getAllMedia = async (req: Request, res: Response) => {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: media });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching media', error });
  }
};

export const hardDeleteMedia = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) return res.status(404).json({ message: 'Media not found' });

    // Delete physical file
    const filePath = path.join(process.cwd(), media.url);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await prisma.media.delete({
      where: { id }
    });

    if (userId) {
      await logAction(userId, 'DELETE', 'MEDIA', id);
    }

    res.status(200).json({ success: true, message: 'Media permanently deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting media', error });
  }
};
