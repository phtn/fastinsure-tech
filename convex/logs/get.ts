import { mutation } from "@vex/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) =>
    await db
      .query("logs")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .first(),
});
