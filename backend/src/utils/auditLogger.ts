import prisma from '../lib/prisma';

export const logAction = async (
  userId: string,
  action: string,
  resource: string,
  resourceId: string,
  details?: any
) => {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details,
      },
    });
  } catch (error) {
    console.error('[AuditLog Error]:', error);
  }
};
