import { guid } from "@/utils/helpers";
import { mutation } from "@vex/server";
import { v } from "convex/values";

export const send = mutation({
  args: {
    body: v.string(),
    author_uid: v.string(),
    author_name: v.string(),
    room_id: v.string(),
  },
  handler: async ({ db }, { body, author_uid, author_name, room_id }) => {
    await db.insert("chats", {
      room_id,
      body,
      author_uid,
      author_name,
      chat_id: guid(),
      is_read: false,
      updated_at: Date.now(),
    });
  },
});

// const checkChatRoom = async <DB extends GenericDatabaseWriter<DataModel>>(
//   db: DB,
//   room_id: string,
// ) =>
//   await db
//     .query("rooms")
//     .withIndex("by_room_id", (q) => q.eq("room_id", room_id))
//     .unique();
