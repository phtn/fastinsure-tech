import { guid } from "@/utils/helpers";
import { mutation } from "@vex/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    members: v.array(v.string()),
    theme: v.optional(v.string()),
    photo_url: v.optional(v.string()),
  },
  handler: async ({ db }, { members, photo_url, theme }) => {
    await db.insert("rooms", {
      theme,
      members,
      photo_url,
      room_id: guid(),
      updated_at: Date.now(),
    });
  },
});
