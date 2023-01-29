import { createRouter } from './context';
import z from 'zod';
import { Prisma } from '@prisma/client';
import {
  CreateTaskInput,
  CreateTaskRecurrenceInput,
  createTaskRecurrenceSchema,
  createTaskSchema,
  updateTaskSchema,
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
    input: z.intersection(
      z.intersection(createTaskSchema, createTaskRecurrenceSchema),
      z.object({ isRecurring: z.boolean() })
    ),
    async resolve({ input, ctx }) {
      if (!input.assignedTo) {
        input.assignedTo = null;
      }

      let task;
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

        if (recurrence?.id) {
          let tasks = generateTaskSeries(input, recurrence?.id);
          for (let task of tasks) {
            await prisma?.task.create({
              data: task,
            });
          }
        }
      } else {
        task = await prisma?.task.create({
          data: {
            name: input.name,
            householdId: input.householdId,
            notes: input.notes,
            priority: input.priority,
            dueDate: input.dueDate,
            assignedTo: input.assignedTo,
          },
        });
      }

      return task;
    },
  })
  .mutation('update-task', {
    input: updateTaskSchema,
    async resolve({ input }) {
      await prisma?.task.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    },
  })
  .mutation('delete-task', {
    input: z.object({ taskId: z.string() }),
    async resolve({ input }) {
      await prisma?.task.delete({
        where: {
          id: input.taskId,
        },
      });
    },
  });

const DayNumberMap = new Map([
  ['SU', 0],
  ['MO', 1],
  ['TU', 2],
  ['WE', 3],
  ['TH', 4],
  ['FR', 5],
  ['SA', 6],
]);

function generateTaskSeries(
  input: CreateTaskInput & CreateTaskRecurrenceInput,
  recurrenceId: string
): CreateTaskInput[] {
  // the first date should be the first occurrence of a date after or equal to startDate
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  let firstDate = input.startTime || input.dueDate || now;

  let tasks: CreateTaskInput[] = [];

  if (!input.interval) {
    input.interval = '1';
  }

  if (input.frequency === 'DAILY') {
    let currentDate = firstDate;

    if (input.endTime) {
      while (currentDate <= input.endTime) {
        let taskTemplate = {
          name: input.name,
          householdId: input.householdId,
          notes: input.notes,
          priority: input.priority,
          dueDate: new Date(currentDate.valueOf()),
          assignedTo: input.assignedTo,
          recurrenceId: recurrenceId,
        };
        tasks.push(taskTemplate);

        currentDate.setDate(currentDate.getDate() + parseInt(input.interval));
      }
    } else {
      for (let i = 0; i < 10; i++) {
        let taskTemplate = {
          name: input.name,
          householdId: input.householdId,
          notes: input.notes,
          priority: input.priority,
          dueDate: new Date(currentDate.valueOf()),
          assignedTo: input.assignedTo,
          recurrenceId: recurrenceId,
        };
        tasks.push(taskTemplate);

        currentDate.setDate(currentDate.getDate() + parseInt(input.interval));
      }
    }
  } else if (
    input.frequency === 'WEEKLY' &&
    input.byDay &&
    firstDate.getDay() !== DayNumberMap.get(input.byDay)
  ) {
    const daysFromNow = DayNumberMap.get(input.byDay) - firstDate.getDay();
    if (daysFromNow < 0) {
      const daysToAdd = 7 + daysFromNow;
      firstDate.setDate(firstDate.getDate() + daysToAdd);
    } else {
      firstDate.setDate(firstDate.getDate() + daysFromNow);
    }
    let currentDate = firstDate;

    if (input.endTime) {
      while (currentDate <= input.endTime) {
        let taskTemplate = {
          name: input.name,
          householdId: input.householdId,
          notes: input.notes,
          priority: input.priority,
          dueDate: new Date(currentDate.valueOf()),
          assignedTo: input.assignedTo,
          recurrenceId: recurrenceId,
        };
        tasks.push(taskTemplate);

        currentDate.setDate(
          currentDate.getDate() + parseInt(input.interval) * 7
        );
      }
    } else {
      for (let i = 0; i < 10; i++) {
        let taskTemplate = {
          name: input.name,
          householdId: input.householdId,
          notes: input.notes,
          priority: input.priority,
          dueDate: new Date(currentDate.valueOf()),
          assignedTo: input.assignedTo,
          recurrenceId: recurrenceId,
        };
        tasks.push(taskTemplate);

        currentDate.setDate(
          currentDate.getDate() + parseInt(input.interval) * 7
        );
      }
    }
  }

  console.log('TASKS: ', tasks);

  return tasks;
}
