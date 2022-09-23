import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';

export const userRouter = createRouter().query('household-users', {
  input: z.object({
    householdId: z.string(),
  }),
  async resolve({ input, ctx }) {
    return await prisma?.user.findMany({
      select: {
        name: true,
        id: true,
      },
      where: {
        HouseholdsOnUsers: {
          some: {
            householdId: input.householdId,
          },
        },
      },
    });
  },
});
