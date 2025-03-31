import { type Infer, v } from "convex/values";

export const chat_schema = v.object({
  chat_id: v.string(),
  name: v.optional(v.string()),
  creator_id: v.id("users"),
  creator_name: v.optional(v.string()),
  participants: v.array(v.id("users")),
  lastMessageTime: v.number(), // For sorting chats by recent activity
  is_group: v.boolean(),
  created_at: v.optional(v.float64()),
  updated_at: v.optional(v.float64()),
});

export type InsertChat = Infer<typeof chat_schema>;
export type SelectChat = Infer<typeof chat_schema>
