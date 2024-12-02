import { mutation } from "@vex/server";
import { user_updateable_schema, type UpdateUser } from "./d";
import { checkUser } from "./create";

export const update = mutation({
  args: user_updateable_schema,
  handler: async ({ db }, data) => {
    const user = await checkUser(db, data.uid);

    if (user === null) {
      return null;
      // throw new Error("User not found");
    }

    const data_kv = Object.entries(data)
      .filter((f) => f[0] === "uid")
      .map(([k, v]) => [k, v]);

    for (const d of data_kv) {
      await db.patch(user._id, Object.fromEntries([d]) as UpdateUser);
    }

    if (user.group_code !== data.group_code) {
      await db.patch(user._id, { group_code: data.group_code });
    }

    if (user.role !== data.role) {
      await db.patch(user._id, { role: data.role });
    }

    if (user.is_verified !== data.is_verified) {
      await db.patch(user._id, { is_verified: data.is_verified });
    }

    await db.patch(user._id, { updated_at: Date.now() });
    return user._id;
  },
});
