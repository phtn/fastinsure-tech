import { mutation } from "@vex/server";
import { user_updateable_schema, type UserUpdate } from "./d";
import { checkUser } from "./create";

export const update = mutation({
  args: user_updateable_schema,
  handler: async ({ db }, data) => {
    const user = await checkUser(db, data.uid);

    if (user === null) {
      throw new Error("Merchant not found");
    }

    const data_kv = Object.entries(data)
      .filter((f) => f[0] === "uid")
      .map(([k, v]) => [k, v]);

    for (const d of data_kv) {
      await db.patch(user._id, Object.fromEntries([d]) as UserUpdate);
    }

    await db.patch(user._id, { updated_at: Date.now() });
    return user._id;
  },
});
