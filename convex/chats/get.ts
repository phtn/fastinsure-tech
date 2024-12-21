import { query } from "@vex/server";
import { v } from "convex/values";

export const rooms = query({
  args: {},
  handler: async ({ db }) => {
    // Grab the most recent messages.
    const chat_rooms = await db.query("rooms").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return chat_rooms.reverse();
  },
});

export const byRoomId = query({
  args: { room_id: v.string() },
  handler: async ({ db }, { room_id }) => {
    const messages = await db
      .query("chats")
      .withIndex("by_room_id", (q) => q.eq("room_id", room_id))
      .order("desc")
      .take(100);

    const with_likes = Promise.all(
      messages.map(async (message) => {
        const likes = await db
          .query("message_likes")
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
