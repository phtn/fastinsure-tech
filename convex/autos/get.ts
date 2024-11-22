import { mutation } from "@vex/server";
import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("autos").collect(),
});

export const byId = mutation({
  args: { vehicle_id: v.string() },
  handler: async ({ db }, { vehicle_id }) =>
    await db
      .query("autos")
      .withIndex("by_vehicle_id", (q) => q.eq("vehicle_id", vehicle_id))
      .first(),
});
