import z from 'zod';

export const createPetSchema = z.object({
  name: z.string(),
  householdId: z.string(),
  birthday: z.date().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  color: z.string().optional(),
  vetName: z.string().optional(),
  vetAddressLine1: z.string().optional(),
  vetAddressLine2: z.string().optional(),
  vetCity: z.string().optional(),
  vetState: z
    .string()
    .length(2, 'State must be an abbreviated US state')
    .optional(),
  vetPhoneNo: z
    .string()
    .length(10, 'Phone Number must be a full 10 digit number with area code')
    .optional(),
  vetEmail: z.string().email().optional(),
});

export type CreatePetInput = z.TypeOf<typeof createPetSchema>;
