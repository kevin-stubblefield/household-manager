import { z } from 'zod';
import { createRouter } from './context';

export const householdRouter = createRouter().query('pages', {
  input: z
    .object({
      role: z.string(),
    })
    .nullable(),
  resolve({ input, ctx }) {
    return {};
  },
});
