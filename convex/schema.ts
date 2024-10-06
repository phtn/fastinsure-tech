import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    active: v.boolean(),
    agent_code: v.string(),
    branch_code: v.string(),
    completed_count: v.float64(),
    display_name: v.string(),
    draft_count: v.float64(),
    email: v.string(),
    fast_points: v.float64(),
    last_login: v.string(),
    phone: v.string(),
    photo_url: v.string(),
    role: v.string(),
    setup_complete: v.boolean(),
    setup_progress: v.float64(),
    submitted_count: v.float64(),
    uid: v.string(),
    updated_at: v.string(),
    user_data: v.object({
      address: v.object({
        city: v.string(),
        country: v.string(),
        line1: v.string(),
        line2: v.string(),
        postal_code: v.string(),
        state: v.string(),
      }),
      email: v.string(),
      first_name: v.string(),
      last_name: v.string(),
      middle_name: v.string(),
      phone: v.string(),
      uid: v.string(),
      updated_at: v.string(),
    }),
    verified: v.boolean(),
  }),
});
