import "server-only";

import { headers as h } from "next/headers";
import { tRPCCtx } from "@/server/api/trpc";
import { createCaller } from "@/server/api/root";
import { getRefresh, getSession } from "@/app/actions";
import { env } from "@/env";

export const createCtx = async () => {
  const headers = new Headers(await h());
  headers.set("x-trpc-source", "rsc");
  headers.set("X-Refresh-Token", (await getRefresh()) ?? "");
  headers.set("Authorization", (await getSession()) ?? "");
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");
  headers.set("X-API-Key", env.RE_UP_SECURE_API_KEY);

  return tRPCCtx({
    headers,
  });
};

export const api = createCaller(createCtx);
