import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';

export const InventoryRouter = createRouter().query('for-user', {
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
});
