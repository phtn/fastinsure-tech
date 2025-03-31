import { query } from "@vex/server";
import { v } from "convex/values";

export const all = query({
  args: {
    id: v.string(),
  },
  handler: async ({db}, {id}) => {

    const user = await db
      .query("users")
      .withIndex("by_uid", q => q.eq("uid", id))
      .first();

    if (!user) return [];

    return await db
      .query("chats")
      .withIndex("by_participant", q => q.eq("participants", [user._id]))
      .order("desc")
      .collect();
  }
});

export const rooms = query({
  args: {},
  handler: async ({ db }) => {
    // Grab the most recent messages.
    const chat_rooms = await db.query("rooms").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return chat_rooms.reverse();
  },
});

export const byChatId = query({
  args: { chat_id: v.id("chats") },
  handler: async ({ db }, { chat_id }) => {
    const messages = await db
      .query("chats")
      .withIndex("by_chat_id", (q) => q.eq("chat_id", chat_id))
      .order("desc")
      .take(100);

    const with_likes = Promise.all(
      messages.map(async (message) => {
        const likes = await db
          .query("likes")
          .withIndex("by_chat_id", (q) => q.eq("chat_id", message.chat_id))
          .collect();
        return { ...message, likes: likes.length };
      }),
    );
    return (await with_likes).reverse().map((message) => ({
      ...message,
      likes: message.likes,
    }));
  },
});
