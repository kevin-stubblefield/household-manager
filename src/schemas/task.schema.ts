import z from 'zod';

const frequencyEnum = z.enum(['ONCE', 'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY']);

export const createTaskSchema = z.object({
  name: z.string().min(2),
  householdId: z.string(),
  isRecurring: z.boolean().optional().default(false),
  recurrenceRule: z.string().optional(),
  frequency: frequencyEnum.optional().default('ONCE'),
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
  priority: z.number().min(1).max(3).optional().default(3),
  dueDate: z.date().optional(),
  assignedTo: z.string().optional(),
  setAsBusy: z.boolean().optional().default(false),
  isAllDay: z.boolean().optional().default(false),
});

export type FrequencyEnum = z.TypeOf<typeof frequencyEnum>;
export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
