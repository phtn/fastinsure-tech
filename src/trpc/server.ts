import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { headers } from "next/headers";
import { cache } from "react";

import { createCaller, type AppRouter } from "@/server/api/root";
import { Tctx } from "@/server/api/trpc";
import { createQueryClient } from "./query-client";

const createCtx = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return Tctx({
    headers: heads,
  });
});

const getQueryClient = cache(createQueryClient);
const caller = createCaller(createCtx);

export const { trpc: api, HydrateClient } = createHydrationHelpers<AppRouter>(
  caller,
  getQueryClient,
);
