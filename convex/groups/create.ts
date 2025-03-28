import { mutation } from "@vex/server";
import { group_schema } from "./d";
import { type GenericDatabaseWriter } from "convex/server";
import { type DataModel } from "@vex/dataModel";
import { v } from "convex/values";

const create = mutation({
  args: {id: v.string(), data: group_schema},
  handler: async ({ db }, {id, data}) => {
    if (!id) {
      return null;
    }
    const group = await checkGroup(db, data.group_id);
    if (group !== null) {
      await db.patch(group._id, {
        updated_at: Date.now(),
        is_active: true,
      });
      return "success";
    }

    return await db.insert("groups", {
      ...data,
      created_by: id,
      updated_at: Date.now(),
      is_active: true,
      is_verified: false,
    });
  },
});

export default create;

export const checkGroup = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  id: string,
) =>
  await db
    .query("groups")
    .withIndex("by_group_id", (q) => q.eq("group_id", id))
    .first();
