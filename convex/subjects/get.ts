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
      const subjects = await Promise.all(
        ids
          .map((id) =>
            db
              .query("subjects")
              .withIndex("by_subject_id", (q) => q.eq("subject_id", id))
              .collect(),
          )
          .reverse(),
      );
      return subjects.flat();
    },
});

export const all = query({
  args: {},
  handler: async ({ db }) => await db.query("subjects").collect(),
});
