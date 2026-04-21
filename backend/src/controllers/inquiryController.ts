import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { logAction } from '../utils/auditLogger';

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const inquiry = await prisma.inquiry.create({ data });
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting inquiry', error });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching inquiries', error });
  }
};

export const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { isRead: true }
    });
    res.status(200).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ message: 'Error updating inquiry', error });
  }
};

export const hardDeleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    await prisma.inquiry.delete({
      where: { id }
    });

    if (userId) {
      await logAction(userId, 'DELETE', 'INQUIRY', id);
    }

    res.status(200).json({ success: true, message: 'Inquiry permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting inquiry', error });
  }
};
