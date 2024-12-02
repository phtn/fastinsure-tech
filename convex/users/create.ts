import { mutation } from "@vex/server";
import { user_schema } from "./d";
import { guid } from "@/utils/helpers";
import { type GenericDatabaseWriter } from "convex/server";
import { type DataModel } from "@vex/dataModel";

const create = mutation({
  args: user_schema,
  handler: async ({ db }, data) => {
    const user = await checkUser(db, data.uid);
    if (user !== null) {
      await db.patch(user._id, {
        updated_at: Date.now(),
        is_active: true,
      });
      return user._id;
    }

    return await db.insert("users", {
      ...data,
      account_id: guid(),
      updated_at: Date.now(),
      is_active: true,
      is_verified: false,
      total_drafted: 0,
      total_submitted: 0,
      total_completed: 0,
      total_voided: 0,
      fast_score: 0,
      group_code: data.group_code ?? "neo",
      role: data.role ?? "neo",
    });
  },
});

export default create;

export const checkUser = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  uid: string,
) =>
  await db
    .query("users")
    .withIndex("by_uid", (q) => q.eq("uid", uid))
    .first();
