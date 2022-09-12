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
      const household = await prisma?.household.create({
        data: {
          ...input,
          householdsOnUsers: {
            create: [
              {
                user: {
                  connect: {
                    id: ctx.session?.user?.id,
                  },
                },
                createdBy: {
                  connect: {
                    id: ctx.session?.user?.id,
                  },
                },
                isOwner: true,
              },
            ],
          },
        },
      });

      return household;
    },
  })
  .query('my-households', {
    async resolve({ ctx }) {
      const households = await prisma?.household.findMany({
        include: {
          images: true,
        },
        where: {
          OR: [
            {
              householdsOnUsers: {
                some: {
                  userId: ctx.session?.user?.id,
                  inviteAccepted: true,
                },
              },
            },
            {
              householdsOnUsers: {
                some: {
                  userId: ctx.session?.user?.id,
                  inviteAccepted: null,
                  invitedById: null,
                  isOwner: true,
                },
              },
            },
          ],
        },
      });

      return households;
    },
  })
  .query('invited', {
    async resolve({ ctx }) {
      const households = await prisma?.household.findMany({
        include: {
          images: true,
        },
        where: {
          householdsOnUsers: {
            some: {
              userId: ctx.session?.user?.id,
              invitedById: {
                not: null,
              },
              inviteAccepted: {
                equals: null,
              },
            },
          },
        },
      });

      return households;
    },
  });
