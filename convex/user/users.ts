import { query } from "@vex/server";

export const get = query({
  handler: async ({ db }) => await db.query("users").collect(),
});
