import "server-only";

// import { headers } from "next/headers";
import { tRPC } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";
import { cache } from "react";

export const createCtx = cache(async () => {
  return await tRPC();
});

export const api = createCaller(createCtx);
