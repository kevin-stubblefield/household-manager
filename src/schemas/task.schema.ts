import z from 'zod';

export const createTaskSchema = z.object({
  name: z.string().min(2),
  householdId: z.string(),
  frequency: z.string().optional().default('once'),
  scheduledDay: z.number().optional(),
  priority: z.number().optional().default(3),
  dueDate: z.date().optional(),
  lastCompletedDate: z.date().optional(),
  assignedTo: z.string().nullable(),
});

export type CreateTaskInput = z.TypeOf<typeof createTaskSchema>;
