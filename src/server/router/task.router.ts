import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { createTaskSchema } from '../../schemas/task.schema';
import { createProtectedRouter } from './protected-router';

export const taskRouter = createProtectedRouter()
  .query('my-tasks', {
    async resolve({ ctx }) {
      if (!ctx.session) {
        return [];
      }

      return await prisma?.task.findMany({
        include: {
          household: {
            select: {
              name: true,
              id: true,
            },
          },
          user: {
            select: {
              name: true,
              displayName: true,
              id: true,
            },
          },
        },
        where: {
          OR: [
            {
              assignedTo: ctx.session?.user?.id,
            },
            {
              household: {
                householdsOnUsers: {
                  some: {
                    userId: ctx.session?.user?.id,
                  },
                },
              },
            },
          ],
        },
      });
    },
  })
  .query('for-household', {
    input: z.object({
      householdId: z.string(),
    }),
    async resolve({ input }) {
      return await prisma?.task.findMany({
        where: {
          householdId: input.householdId,
        },
      });
    },
  })
  .mutation('create-task', {
    input: createTaskSchema,
    async resolve({ input, ctx }) {
      if (!input.assignedTo) {
        input.assignedTo = null;
      }
      const task = await prisma?.task.create({
        data: input,
      });

      return task;
    },
  });
