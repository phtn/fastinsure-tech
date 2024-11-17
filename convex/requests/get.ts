import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("requests").collect(),
});

export const byId = mutation({
  args: { request_id: v.string() },
  handler: async ({ db }, { request_id }) =>
    await db
      .query("requests")
      .withIndex("by_request_id", (q) => q.eq("request_id", request_id))
      .first(),
});
