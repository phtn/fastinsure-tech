import { factory, router } from "@/server/api/trpc";
import { convexRouter } from "./routers/conv";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  auth: authRouter,
  convex: convexRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = factory(appRouter);
