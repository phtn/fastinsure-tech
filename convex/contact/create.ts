import { mutation } from "@vex/server";
import { address_schema } from "./d";

const create = mutation({
  args: address_schema,
  handler: async ({ db }, data) => await db.insert("addresses", data),
});
export default create;
