import { type Infer, v } from "convex/values";

export const chat_schema = v.object({
  body: v.string(),
  room_id: v.string(),
  chat_id: v.string(),
  author_uid: v.string(),
  author_name: v.string(),
  is_read: v.optional(v.boolean()),
  updated_at: v.optional(v.float64()),
});

export type InsertChat = Infer<typeof chat_schema>;
export type SelectChat = Infer<typeof chat_schema>;
