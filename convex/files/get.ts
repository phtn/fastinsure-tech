import { v } from "convex/values";
import { type Id } from "@vex/dataModel";
import { mutation } from "@vex/server";

export const url = mutation({
  args: { storageId: v.string() },
  handler: async ({ storage }, { storageId }) =>
    await storage.getUrl(storageId as Id<"_storage">),
});
