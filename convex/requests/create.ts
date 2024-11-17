import { mutation } from "@vex/server";
import { insert_request_schema } from "./d";

const create = mutation({
  args: insert_request_schema,
  handler: async ({ db }, data) =>
    await db.insert("requests", {
      ...data,
      updated_at: Date.now(),
      group_code: data.group_code,
    }),
});
export default create;
