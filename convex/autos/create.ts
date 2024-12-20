import { mutation } from "@vex/server";
import { auto_schema } from "./d";

const create = mutation({
  args: auto_schema,
  handler: async ({ db }, auto) =>
    await db.insert("autos", {
      ...auto,
      updated_at: Date.now(),
    }),
});
export default create;
