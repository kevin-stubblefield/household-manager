import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import {
  createTaskRecurrenceSchema,
  createTaskSchema,
} from '../../schemas/task.schema';
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
    input: z.intersection(createTaskSchema, createTaskRecurrenceSchema),
    async resolve({ input, ctx }) {
      if (!input.assignedTo) {
        input.assignedTo = null;
      }

      let recurrence;
      if (input.isRecurring) {
        recurrence = await prisma?.taskRecurrence.create({
          data: {
            recurrenceRule: input.recurrenceRule,
            frequency: input.frequency,
            interval: input.interval,
            startTime: input.startTime,
            endTime: input.endTime,
            byDate: input.byDate,
            byDay: input.byDay,
            duration: input.duration,
            setAsBusy: input.setAsBusy,
            isAllDay: input.isAllDay,
          },
        });
      }
      const task = await prisma?.task.create({
        data: {
          name: input.name,
          householdId: input.householdId,
          notes: input.notes,
          priority: input.priority,
          dueDate: input.dueDate,
          assignedTo: input.assignedTo,
          recurrenceId: recurrence?.id,
        },
      });

      return task;
    },
  });
