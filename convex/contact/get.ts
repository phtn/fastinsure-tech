import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("addresses").collect(),
});

export const byId = mutation({
  args: { address_id: v.string() },
  handler: async ({ db }, { address_id }) =>
    await db
      .query("addresses")
      .withIndex("by_address_id", (q) => q.eq("address_id", address_id))
      .first(),
});
