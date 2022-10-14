import z from 'zod';

export const createGrocerySchema = z.object({
  name: z.string(),
  householdId: z.string(),
  quantity: z.number().default(1),
  unit: z.string().default('unit'),
  isMarked: z.boolean().default(false),
});

export type CreateGroceryInput = z.TypeOf<typeof createGrocerySchema>;
