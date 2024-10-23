import { factory, router } from "@/server/api/trpc";
import { convexRouter } from "./routers/conv";
import { authRouter } from "./routers/auth";
import { serverRouter } from "./routers/health";

export const appRouter = router({
  auth: authRouter,
  convex: convexRouter,
  server: serverRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = factory(appRouter);
