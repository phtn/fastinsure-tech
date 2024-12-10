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

export const byEmail = mutation({
  args: { email: v.string() },
  handler: async ({ db }, { email }) =>
    await db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first(),
});

export const byGroup = mutation({
  args: { group_code: v.string() },
  handler: async ({ db }, { group_code }) =>
    await db
      .query("users")
      .withIndex("by_group_code", (q) => q.eq("group_code", group_code))
      .collect(),
});
