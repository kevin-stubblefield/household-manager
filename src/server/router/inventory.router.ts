import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';

export const InventoryRouter = createRouter().query('for-household', {
  input: z.object({
    householdId: z.string(),
  }),
  async resolve({ input }) {
    return await prisma?.inventoryItem.findMany({
      where: {
        householdId: input.householdId,
      },
    });
  },
});
