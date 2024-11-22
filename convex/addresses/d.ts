import { type Infer, v } from "convex/values";

export const address_schema = v.object({
  address_id: v.optional(v.string()),
  line_1: v.optional(v.string()),
  line_2: v.optional(v.string()),
  city: v.optional(v.string()),
  state: v.optional(v.string()),
  postal_code: v.optional(v.string()),
  country: v.optional(v.string()),
  updated_at: v.optional(v.float64()),
});

export type InsertAddress = Infer<typeof address_schema>;
