// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { householdRouter } from './household.router';
import { userRouter } from './user.router';
import { taskRouter } from './task.router';
import { GroceryRouter } from './grocery.router';
import { InventoryRouter } from './inventory.router';
import { PetRouter } from './pet.router';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('household.', householdRouter)
  .merge('users.', userRouter)
  .merge('tasks.', taskRouter)
  .merge('groceries', GroceryRouter)
  .merge('inventory', InventoryRouter)
  .merge('pets', PetRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
