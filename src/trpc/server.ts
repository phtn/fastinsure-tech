import "server-only";

import { cache } from "react";
import { headers } from "next/headers";
import { tRPCCtx } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";

export const createCtx = cache(async () => {
  const heads = new Headers(await headers());
  heads.set("x-trpc-source", "rsc");

  return tRPCCtx({
    headers: heads,
  });
});

export const api = createCaller(createCtx);
