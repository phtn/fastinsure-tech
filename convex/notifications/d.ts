import { type Infer, v } from "convex/values";

export const notification_schema = v.object({
  notif_id: v.optional(v.string()),
  type: v.optional(v.string()),
  category: v.optional(v.string()),
  title: v.optional(v.string()),
  content: v.optional(v.string()),
  sender_id: v.optional(v.string()),
  receiver_id: v.optional(v.string()),
  is_read: v.optional(v.string()),
  updated_at: v.optional(v.float64()),
});

export type InsertNotification = Infer<typeof notification_schema>;
export type SelectNotification = Infer<typeof notification_schema>;
