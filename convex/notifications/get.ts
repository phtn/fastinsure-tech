import { mutation } from "@vex/server";
import { v } from "convex/values";

export const byReceiverId = mutation({
  args: { receiver_id: v.string() },
  handler: async ({ db }, { receiver_id }) =>
    await db
      .query("notifications")
      .withIndex("by_receiver_id", (q) => q.eq("receiver_id", receiver_id))
      .collect(),
});
