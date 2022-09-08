import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { createRouter } from './context';

export const householdRouter = createRouter()
  .mutation('create-household', {
    input: z.object({
      name: z.string(),
      addressLine1: z.string(),
      addressLine2: z.string(),
      city: z.string(),
      state: z.string().length(2, 'State must be an abbreviated US state'),
      zipCode: z.string().length(5, 'Zip Code must be five numbers long'),
    }),
    async resolve({ input, ctx }) {
      const householdWithUser = Prisma;
      await prisma?.household.create({
        data: {
          ...input,
          users: {
            connect: { id: ctx.session?.user?.id },
          },
        },
      });
    },
  })
  .query('pages', {
    input: z
      .object({
        role: z.string(),
      })
      .nullable(),
    resolve({ input, ctx }) {
      return {};
    },
  });
