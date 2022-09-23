import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import { createTaskSchema } from '../../schemas/task.schema';

export const taskRouter = createRouter()
  .query('my-tasks', {
    async resolve({ ctx }) {
      return await prisma?.task.findMany({
        include: {
          household: {
            select: {
              name: true,
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
  .mutation('create-task', {
    input: createTaskSchema,
    async resolve({ input, ctx }) {
      if (!input.assignedTo) {
        input.assignedTo = null;
      }
      console.log(input);
      const task = await prisma?.task.create({
        data: input,
      });

      return task;
    },
  });