// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { protectedExampleRouter } from './protected-example-router';
import { householdRouter } from './household';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('household.', householdRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
