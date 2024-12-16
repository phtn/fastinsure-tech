import { type Infer, v } from "convex/values";

export const user_role_schema = v.union(
  v.literal("admin"),
  v.literal("manager"),
  v.literal("supervisor"),
  v.literal("agent"),
  v.literal("underwriter"),
  v.literal("neo"),
);

export type UserRole = Infer<typeof user_role_schema>;

export const user_schema = v.object({
  uid: v.string(),
  account_id: v.optional(v.string()),
  address_id: v.optional(v.string()),
  commission_pct: v.optional(v.number()),
  total_drafted: v.optional(v.number()),
  total_submitted: v.optional(v.number()),
  total_completed: v.optional(v.number()),
  total_voided: v.optional(v.number()),
  email: v.optional(v.string()),
  fast_score: v.optional(v.number()),
  firstname: v.optional(v.string()),
  fullname: v.optional(v.string()),
  lastname: v.optional(v.string()),
  nickname: v.optional(v.string()),
  group_code: v.optional(v.string()),
  is_active: v.optional(v.boolean()),
  is_verified: v.optional(v.boolean()),
  middlename: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  role: v.optional(v.string()),
  user_code: v.optional(v.string()),
  updated_at: v.optional(v.float64()),
  special_collection: v.optional(v.array(v.record(v.string(), v.any()))),
  metadata: v.optional(v.array(v.record(v.string(), v.any()))),
  badges: v.optional(v.array(v.record(v.string(), v.string()))),
});

export type SelectUser = Infer<typeof user_schema>;
export type InsertUser = Infer<typeof user_schema>;

export const user_updateable_schema = v.object({
  uid: v.string(),
  email: v.optional(v.string()),
  nickname: v.optional(v.string()),
  firstname: v.optional(v.string()),
  middlename: v.optional(v.string()),
  lastname: v.optional(v.string()),
  fullname: v.optional(v.string()),
  group_code: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  is_verified: v.optional(v.boolean()),
  role: v.optional(user_role_schema),
  commission_pct: v.optional(v.number()),
  metadata: v.optional(v.array(v.record(v.string(), v.any()))),
  address_id: v.optional(v.string()),
  fast_score: v.optional(v.number()),
});

export type UpdateUser = Infer<typeof user_updateable_schema>;
