import { v } from "convex/values";

export const auto_schema = v.object({
  policy_id: v.string(),
  make: v.optional(v.string()),
  model: v.optional(v.string()),
  year: v.optional(v.string()),
  type: v.union(v.literal("private"), v.literal("public")),
  body: v.union(v.literal("motorcycle"), v.literal("sedan")),
  plate_no: v.optional(v.string()),
  induction_no: v.optional(v.string()),
  metadata: v.record(v.string(), v.any()),
});
