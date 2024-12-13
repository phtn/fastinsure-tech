import { type Infer, v } from "convex/values";

export const log_schema = v.object({
  uid: v.optional(v.string()),
  email: v.optional(v.string()),
  type: v.optional(v.string()),
  device: v.optional(v.string()),
  geolocation: v.optional(v.string()),
  ip: v.optional(v.string()),
  created_at: v.float64(),
});

export type InsertLog = Infer<typeof log_schema>;
export type SelectLog = Infer<typeof log_schema>;
