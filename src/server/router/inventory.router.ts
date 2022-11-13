import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { createInventoryItemSchema } from '../../schemas/inventory.schema';
import { createProtectedRouter } from './protected-router';

export const InventoryRouter = createProtectedRouter()
  .query('for-user', {
    input: z.object({
      userId: z.string(),
    }),
    async resolve({ input }) {
      return await prisma?.inventoryItem.findMany({
        where: {
          userId: input.userId,
        },
      });
    },
  })
  .query('my-inventory', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        return [];
      }

      return await prisma?.inventoryItem.findMany({
        where: {
          userId: ctx.session?.user?.id,
          wholeItemId: null,
        },
        include: {
          parts: true,
        },
      });
    },
  })
  .mutation('create-item', {
    input: createInventoryItemSchema,
    async resolve({ input }) {
      return await prisma?.inventoryItem.create({
        data: input,
      });
    },
  });
