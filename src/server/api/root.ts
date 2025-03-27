import { factory, router } from "@/server/api/trpc";
import { convexRouter } from "./routers/conv";
import { authRouter } from "./routers/auth";
import { serverRouter } from "./routers/server";
import { docaiRouter } from "./routers/docai";
import { managerRoute } from "./routers/manager";
import { agentRoute } from "./routers/agent";
import { rdbRouter } from "./routers/rdb";
import { emailRouter } from "./routers/email";

export const appRouter = router({
  auth: authRouter,
  convex: convexRouter,
  docai: docaiRouter,
  server: serverRouter,
  manager: managerRoute,
  agent: agentRoute,
  rdb: rdbRouter,
  email: emailRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = factory(appRouter);
