import { guid } from "@/utils/helpers";
import { type DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import { type GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";

// Create a new chat
export const createChat = mutation({
  args: {
    name: v.string(),
    chat_id: v.string(),
    creator_id: v.id("users"),
    participants: v.array(v.id("users")),
    is_group: v.boolean(),
  },
  handler: async ({db}, {name, participants, is_group, chat_id, creator_id}) => {
    const chat = await checkChat(db, chat_id)
    if (!chat){
      return null
    }

    const updatedMembers = [...new Set([...participants, creator_id])];

    return await db.insert("chats", {
      chat_id: guid(),
      name,
      is_group,
      creator_id,
      participants: updatedMembers,
      lastMessageTime: Date.now(),
    });
  }
});




export const checkChat = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  id: string,
) =>
  await db
    .query("chats")
    .withIndex("by_chat_id", (q) => q.eq("chat_id", id))
    .first();
