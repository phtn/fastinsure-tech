import { mutation } from "@vex/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { address_id: v.string() },
  handler: async ({ db }, { address_id }) =>
    await db
      .query("address")
      .withIndex("by_address_id", (q) => q.eq("address_id", address_id))
      .first(),
});
