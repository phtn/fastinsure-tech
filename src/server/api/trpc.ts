import { getRefresh, getSession } from "@/app/actions";
import { env } from "@/env";
import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const tRPC = async () => {
  const idToken = await getSession();
  const refresh = await getRefresh();
  return {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${idToken}`,
      "X-Refresh-Token": refresh,
      "X-API-Key": env.RE_UP_SECURE_API_KEY,
      "Content-Type": "application/json",
    },
  };
};

const t = initTRPC.context<typeof tRPC>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const proc = t.procedure;
export const factory = t.createCallerFactory;
