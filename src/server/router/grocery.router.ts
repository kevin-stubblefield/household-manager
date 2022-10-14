import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';

export const GroceryRouter = createRouter().query('for-household', {
  input: z.object({
    householdId: z.string(),
  }),
  async resolve({ input }) {
    return await prisma?.grocery.findMany({
      where: {
        householdId: input.householdId,
      },
    });
  },
});
