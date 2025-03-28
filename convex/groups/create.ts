import { mutation } from "@vex/server";
import { group_schema } from "./d";
import { guid } from "@/utils/helpers";
import { type GenericDatabaseWriter } from "convex/server";
import { type DataModel } from "@vex/dataModel";

const create = mutation({
  args: group_schema,
  handler: async ({ db }, data) => {
    const group = await checkGroup(db, data.group_id);
    if (group !== null) {
      await db.patch(group._id, {
        updated_at: Date.now(),
        is_active: true,
      });
      return group._id;
    }

    return await db.insert("groups", {
      ...data,
      group_id: guid(),
      updated_at: Date.now(),
      is_active: true,
      is_verified: false,
      group_code: data.group_code,
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
