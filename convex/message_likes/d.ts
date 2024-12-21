import { type Infer, v } from "convex/values";

export const message_like_schema = v.object({
  chat_id: v.string(),
  liker_uid: v.string(),
  updated_at: v.optional(v.float64()),
});

export type InsertMessageLike = Infer<typeof message_like_schema>;
export type SelectMessageLike = Infer<typeof message_like_schema>;
