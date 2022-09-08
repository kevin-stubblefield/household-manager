import z from 'zod';

export const createHouseholdSchema = z.object({
  name: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string(),
  city: z.string(),
  state: z.string().length(2, 'State must be an abbreviated US state'),
  zipCode: z.string().length(5, 'Zip Code must be five numbers long'),
});

export type CreateHouseholdInput = z.TypeOf<typeof createHouseholdSchema>;
