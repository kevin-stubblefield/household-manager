import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';

export const PetRouter = createRouter().query('for-household', {
  input: z.object({
    householdId: z.string(),
  }),
  async resolve({ input }) {
    return await prisma?.pet.findMany({
      where: {
        householdId: input.householdId,
      },
    });
  },
});
