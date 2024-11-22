import { mutation } from "@vex/server";
import { subject_schema } from "./d";

const create = mutation({
  args: subject_schema,
  handler: async ({ db }, data) =>
    await db.insert("subjects", {
      ...data,
      updated_at: Date.now(),
    }),
});
export default create;
