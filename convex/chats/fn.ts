import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";

export const like = mutation({
  args: {
    chat_id: v.string(),
    liker_uid: v.string(),
  },
  handler: async ({ db }, { chat_id, liker_uid }) => {
    const chat = await checkChat(db, chat_id);

    if (chat === null) {
      return null;
    }
    if (chat.chat_id !== undefined) {
      await db.insert("likes", {
        liker_uid,
        chat_id,
        updated_at: Date.now(),
      });
    }
  },
});

// export const read = mutation({
//   args: {
//     chat_id: v.string(),
//     is_read: v.boolean(),
//   },
//   handler: async ({ db }, { chat_id, is_read }) => {
//     const chat = await checkChat(db, chat_id);

//     if (chat === null) {
//       return null;
//     }
//     if (chat.body !== undefined) {
//       await db.patch(chat._id, { is_read });
//     }
//   },
// });

// export const edit = mutation({
//   args: {
//     chat_id: v.string(),
//     body: v.optional(v.string()),
//     is_read: v.optional(v.boolean()),
//   },
//   handler: async ({ db }, { chat_id, body }) => {
//     const chat = await checkChat(db, chat_id);

//     if (chat === null) {
//       return null;
//     }
//     if (chat.body !== undefined) {
//       await db.patch(chat._id, { body });
//     }
//   },
// });

const checkChat = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  chat_id: string,
) =>
  await db
    .query("chats")
    .withIndex("by_chat_id", (q) => q.eq("chat_id", chat_id))
    .unique();
