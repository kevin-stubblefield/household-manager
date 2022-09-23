// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { householdRouter } from './household.router';
import { userRouter } from './user.router';
import { taskRouter } from './task.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('household.', householdRouter)
  .merge('users.', userRouter)
  .merge('tasks.', taskRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
