import { checkUser } from "@convex/users/create";
import { mutation } from "@vex/server";
import { v } from "convex/values";

// Send a message to a chat
export const sendMessage = mutation({
  args: {
    uid: v.string(),
    body: v.string(),
    chat_id: v.id("chats"),
    storageId: v.optional(v.id("_storage"))
  },
  handler: async ({db}, {chat_id, body, storageId, uid}) => {
    const user = await checkUser(db, uid)

    if (!user) {
      return user
    }

    // Check if user is a participant in this chat
    const chat = await db.get(chat_id);
    if (!chat || chat.participants.includes(user._id)) {
      return []
    }

    // Update the last message time in the chat
    await db.patch(chat_id, {
      lastMessageTime: Date.now()
    });

    // Create the message
    return await db.insert("messages", {
      author: user._id,
      chat_id,
      body,
      likes: [],
      image_id: storageId
    });
  }
});

// Toggle like on a message
export const toggleLike = mutation({
  args: { uid: v.string(), id: v.id("messages") },
  handler: async ({db}, {uid, id}) => {
    const user = await checkUser(db, uid)

    if (!user) {
      return user
    }

    const message = await db.get(id);
    if (!message) throw new Error("Message not found");

    // Check if user is a participant in this chat
    const chat = await db.get(message.chat_id);
    if (!chat || chat.participants.includes(user._id)) {
      return null
    }

    const likes = message.likes || [];
    const userIndex = likes.findIndex(id => id === user._id);

    if (userIndex >= 0) {
      // User already liked, remove like
      likes.splice(userIndex, 1);
    } else {
      // Add like
      likes.push(user._id);
    }

    await db.patch(id, { likes });
  }
});
