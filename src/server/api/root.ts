import { gamesRouter } from "~/server/api/routers/game";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { priceRouter } from "./routers/price";
import { purchaseRouter } from "./routers/purchase";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  games: gamesRouter,
  prices: priceRouter,
  purchases: purchaseRouter,
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
