import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { updateSettingsSchema } from '../../schemas/user.schema';

export const userRouter = createRouter()
  .query('for-dropdown', {
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
  })
  .query('get-settings', {
    async resolve({ ctx }) {
      return await prisma?.user.findFirst({
        where: {
          id: ctx.session?.user?.id,
        },
      });
    },
  })
  .mutation('update-settings', {
    input: updateSettingsSchema,
    async resolve({ input, ctx }) {
      return await prisma?.user.update({
        where: {
          id: ctx.session?.user?.id,
        },
        data: {
          image: input.image,
          displayName: input.displayName,
        },
      });
    },
  });
