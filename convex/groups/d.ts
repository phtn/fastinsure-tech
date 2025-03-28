import { MetadataSchema } from "@convex/users/d";
import { type Infer, v } from "convex/values";

export const group_schema = v.object({
  group_id: v.string(),
  group_code: v.optional(v.string()),
  group_name: v.optional(v.string()),
  logo_url: v.optional(v.string()),
  manager_id: v.optional(v.string()),
  manager: v.optional(v.string()),
  email: v.optional(v.string()),
  phone_number: v.optional(v.string()),
  location: v.optional(v.string()),
  address: v.optional(v.string()),
  supervisors: v.optional(v.array(v.string())),
  is_active: v.optional(v.boolean()),
  is_verified: v.optional(v.boolean()),
  updated_at: v.optional(v.float64()),
  created_by: v.optional(v.string()),
  badges: v.optional(v.array(v.record(v.string(), v.string()))),
  metadata: MetadataSchema,
});

export type SelectGroup = Infer<typeof group_schema>;
export type InsertGroup = Infer<typeof group_schema>;
