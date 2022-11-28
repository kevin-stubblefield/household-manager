import z from 'zod';

const frequencyEnum = z.enum(['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']);

export const createTaskSchema = z.object({
  name: z.string().min(2),
  householdId: z.string().cuid(),
  notes: z.string(),
  priority: z.number().min(1).max(3).optional().default(3),
  dueDate: z.date().nullish(),
  assignedTo: z.string().nullish(),
  isRecurring: z.boolean().default(false),
});

export const updateTaskSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(2).optional(),
  notes: z.string(),
  priority: z.number().min(1).max(3).optional(),
  dueDate: z.date().optional(),
  assignedTo: z.string().optional(),
});

export const deleteTaskSchema = z.object({
  id: z.string().cuid(),
});

export const createTaskRecurrenceSchema = z.object({
  recurrenceRule: z.string().optional(),
  frequency: frequencyEnum.optional().default('DAILY'),
  interval: z.string().optional().default('1'),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  byDate: z.string().min(1).max(31).optional(),
  byDay: z.string().min(2).max(3).optional(),
  duration: z.string().optional(),
  setAsBusy: z.boolean().optional().default(false),
  isAllDay: z.boolean().optional().default(false),
});

export const updateTaskRecurrenceSchema = z.object({
  id: z.string().cuid(),
  recurrenceRule: z.string().optional(),
  frequency: frequencyEnum.optional(),
  interval: z.string().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  byDate: z
    .number()
    .min(1)
    .max(31)
    .transform((val) => val.toString()),
  byDay: z.string().min(2).max(3).optional(),
  duration: z.string().optional(),
  setAsBusy: z.boolean().optional(),
  isAllDay: z.boolean().optional(),
});

export const deleteTaskRecurrenceSchema = z.object({
  id: z.string().cuid(),
});

export type FrequencyEnum = z.TypeOf<typeof frequencyEnum>;
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
export type UpdateTaskInput = z.TypeOf<typeof updateTaskSchema>;
export type DeleteTaskInput = z.TypeOf<typeof deleteTaskSchema>;
export type CreateTaskRecurrenceInput = z.TypeOf<
  typeof createTaskRecurrenceSchema
>;
export type UpdateTaskRecurrenceInput = z.TypeOf<
  typeof updateTaskRecurrenceSchema
>;
export type DeleteTaskRecurrenceInput = z.TypeOf<
  typeof deleteTaskRecurrenceSchema
>;

export type TaskInputWithRecurrence = {
  isRecurring: boolean;
  task: CreateTaskInput;
  recurrence: CreateTaskRecurrenceInput;
};
