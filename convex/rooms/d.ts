import { type Infer, v } from "convex/values";

export const room_schema = v.object({
  theme: v.optional(v.string()),
  members: v.array(v.string()),
  room_id: v.optional(v.string()),
  room_name: v.optional(v.string()),
  photo_url: v.optional(v.string()),
  updated_at: v.optional(v.float64()),
});

export type InsertRoom = Infer<typeof room_schema>;
export type SelectRoom = Infer<typeof room_schema>;
