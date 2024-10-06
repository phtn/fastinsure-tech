import { initTRPC } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";

export const tRPCCtx = async (opts: { headers: Headers }) => {
  return {
    ...opts,
  };
};

const t = initTRPC.context<typeof tRPCCtx>().create({
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
