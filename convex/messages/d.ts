import { type Infer, v } from "convex/values";

export const message_schema = v.object({
  author: v.id("users"),
  body: v.string(),
  likes: v.array(v.string()),
  image_id: v.optional(v.id("_storage")),
  chat_id: v.id("chats"),
});

export type InsertMessage = Infer<typeof message_schema>;
export type SelectMessage = Infer<typeof message_schema>;
