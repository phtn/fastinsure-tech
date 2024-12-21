import { query } from "@vex/server";
import { mutation } from "@vex/server";
import { v } from "convex/values";

export const byId = mutation({
  args: { subject_id: v.string() },
  handler: async ({ db }, { subject_id }) =>
    await db
      .query("subjects")
      .withIndex("by_subject_id", (q) => q.eq("subject_id", subject_id))
      .first(),
});

export const byIds = query({
  args: { ids: v.array(v.string()) },
  handler: async ({ db }, { ids }) => {
    return await db
      .query("subjects")
      .filter((q) => q.or(...ids.map((id) => q.eq("subject_id", id))))
      .collect();
  },
});
