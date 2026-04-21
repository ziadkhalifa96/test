import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { logAction } from '../utils/auditLogger';
import fs from 'fs';
import path from 'path';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = req.user?.userId;

    const product = await prisma.product.create({
      data: {
        ...data,
        isVisible: data.isVisible ?? true
      }
    });

    if (userId) {
      await logAction(userId, 'CREATE', 'PRODUCT', product.id, { nameEn: product.nameEn });
    }

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const userId = req.user?.userId;

    const product = await prisma.product.update({
      where: { id },
      data
    });

    if (userId) {
      await logAction(userId, 'UPDATE', 'PRODUCT', id, data);
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

export const hardDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Fetch product to find image files
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Attempt to delete physical image files
    const imageList = product.images as any[];
    if (Array.isArray(imageList)) {
      for (const img of imageList) {
        if (img.url && img.url.startsWith('/uploads/')) {
          const filePath = path.join(process.cwd(), img.url);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        }
      }
    }

    await prisma.product.delete({
      where: { id }
    });

    if (userId) {
      await logAction(userId, 'DELETE', 'PRODUCT', id);
    }

    res.status(200).json({ success: true, message: 'Product permanently deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

// Categories
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { nameEn: 'asc' }
    });
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories', error });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const userId = req.user?.userId;

    const category = await prisma.category.create({ data });

    if (userId) {
      await logAction(userId, 'CREATE', 'CATEGORY', category.id, { nameEn: category.nameEn });
    }

    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error });
  }
};
export const hardDeleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.userId;

    // Check if category has products
    const productsCount = await prisma.product.count({ where: { categoryId: id } });
    if (productsCount > 0) {
      return res.status(400).json({ message: 'Cannot delete category with associated products' });
    }

    await prisma.category.delete({
      where: { id }
    });

    if (userId) {
      await logAction(userId, 'DELETE', 'CATEGORY', id);
    }

    res.status(200).json({ success: true, message: 'Category permanently deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error });
  }
};
