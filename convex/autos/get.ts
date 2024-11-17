import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("autos").collect(),
});

export const byId = mutation({
  args: { policy_id: v.string() },
  handler: async ({ db }, { policy_id }) =>
    await db
      .query("autos")
      .withIndex("by_policy_id", (q) => q.eq("policy_id", policy_id))
      .first(),
});
