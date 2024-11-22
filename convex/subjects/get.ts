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
