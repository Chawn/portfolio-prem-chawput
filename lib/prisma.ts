import { PrismaClient } from '@prisma/client';
import { withAccelerate } from '@prisma/extension-accelerate';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
	globalForPrisma.prisma ||
	new PrismaClient({
		accelerateUrl: process.env.PRISMA_DATABASE_URL, // Explicitly pass URL for Prisma 7?
	}).$extends(withAccelerate());

if (process.env.NODE_ENV !== 'production')
	globalForPrisma.prisma = prisma as any;
