import { mutation } from "@vex/server";

export const generateUrl = mutation(
  async (ctx) => await ctx.storage.generateUploadUrl(),
);
