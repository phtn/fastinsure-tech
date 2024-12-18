import { mutation } from "@vex/server";
import { notification_schema } from "./d";

const create = mutation({
  args: notification_schema,
  handler: async ({ db }, data) =>
    await db.insert("notifications", {
      ...data,
      updated_at: Date.now(),
    }),
});
export default create;
