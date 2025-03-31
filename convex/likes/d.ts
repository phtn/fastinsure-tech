import { type Infer, v } from "convex/values";

export const like_schema = v.object({
  chat_id: v.string(),
  liker_uid: v.string(),
  updated_at: v.optional(v.float64()),
});

export type InsertMessageLike = Infer<typeof like_schema>;
export type SelectMessageLike = Infer<typeof like_schema>;
