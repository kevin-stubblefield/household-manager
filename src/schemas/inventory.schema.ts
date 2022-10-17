import z from 'zod';

export const createInventoryItemSchema = z.object({
  name: z.string(),
  userId: z.string(),
  quantity: z.number().default(1),
  unit: z.string().default('unit'),
  serialNo: z.string().optional(),
  modelNo: z.string().optional(),
  purchaseDate: z.date().optional(),
  purchasePrice: z.number().optional(),
  wholeItemId: z.string().optional(),
});

export type CreateInventoryItemInput = z.TypeOf<
  typeof createInventoryItemSchema
>;
