import "server-only";

import { headers } from "next/headers";
import { cache } from "react";
import { createCaller, tRPCCtx } from "@/server/api/trpc";
import { appRouter } from "@/server/api/root";

export const api = cache(() => {
  const heads = new Headers(headers());
  heads.set("x-trpc-source", "rsc");

  return tRPCCtx({
    headers: heads,
  });
});

export const caller = createCaller(appRouter);
