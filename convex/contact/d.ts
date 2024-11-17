import { v } from "convex/values";

export const address_schema = v.object({
  address_id: v.string(),
  city: v.optional(v.string()),
  country: v.optional(v.string()),
  street: v.optional(v.string()),
  line1: v.optional(v.string()),
  line2: v.optional(v.string()),
  postal_code: v.optional(v.string()),
  state: v.optional(v.string()),
});
