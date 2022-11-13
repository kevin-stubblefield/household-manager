import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { createProtectedRouter } from './protected-router';

export const GroceryRouter = createProtectedRouter().query('for-household', {
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
