import { postRouter } from '@/server/api/routers/post';
import { createCallerFactory, createTRPCRouter } from '@/server/api/trpc';
import { categoryRouter } from '@/server/api/routers/category';
import { expenseRouter } from './routers/expense';
import { incomeRouter } from './routers/income';
import { investmentRouter } from './routers/investment';
import { userAccountsRouter } from './routers/useraccount';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  category: categoryRouter,
  investment: investmentRouter,
  income: incomeRouter,
  expense: expenseRouter,
  userAccount: userAccountsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
