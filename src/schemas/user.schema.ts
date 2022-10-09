import z from 'zod';

export const updateSettingsSchema = z.object({
  image: z.string(),
  displayName: z.string(),
});

export type UpdateSettingsInput = z.TypeOf<typeof updateSettingsSchema>;
