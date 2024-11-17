import { query, mutation } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  handler: async ({ db }) => await db.query("users").collect(),
});

export const byId = mutation({
  args: { uid: v.string() },
  handler: async ({ db }, { uid }) =>
    await db
      .query("users")
      .withIndex("by_uid", (q) => q.eq("uid", uid))
      .first(),
});
