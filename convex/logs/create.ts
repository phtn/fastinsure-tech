import { mutation } from "@vex/server";
import { log_schema } from "./d";

const create = mutation({
  args: log_schema,
  handler: async ({ db }, data) =>
    await db.insert("logs", {
      ...data,
      created_at: Date.now(),
    }),
});
export default create;
