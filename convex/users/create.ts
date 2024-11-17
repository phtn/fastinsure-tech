import { mutation } from "@vex/server";
import { user_schema } from "./d";

const create = mutation({
  args: user_schema,
  handler: async ({ db }, data) => await db.insert("users", data),
});
export default create;
