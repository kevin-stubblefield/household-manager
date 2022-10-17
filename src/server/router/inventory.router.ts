import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { createInventoryItemSchema } from '../../schemas/inventory.schema';

export const InventoryRouter = createRouter()
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
      return await prisma?.inventoryItem.findMany({
        where: {
          userId: ctx.session?.user?.id,
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
