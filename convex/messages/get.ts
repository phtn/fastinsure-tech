import { getUser } from "@convex/users/create";
import { query } from "@vex/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server"

export const all = query({
  args: {
    id: v.string(),
    chat_id: v.id("chats"),
    paginationOpts: paginationOptsValidator,
  },
  handler: async ({db}, {id, chat_id, paginationOpts}) => {
    const user = await getUser(db, id);

    if (!user) return { messages: [], cursor: null, page: [], isDone: true, continueCursor: chat_id };

    // Check if user is a participant in this chat
    const chat = await db.get(chat_id);
    if (!chat || chat.participants.includes(user._id)) {
      return { messages: [], cursor: null, page: [], isDone: true, continueCursor: chat_id };
    }

    const opts = {
      limit: 50,
      cursor: null,
      numItems: 100,
    };

    const messages = await db
      .query("messages")
      .withIndex("by_chat_id", q => q.eq("chat_id", chat_id))
      .order("desc")
      .paginate(paginationOpts ?? opts);

    return messages;
  }
});
