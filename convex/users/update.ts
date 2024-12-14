import { mutation } from "@vex/server";
import { user_updateable_schema } from "./d";
import { checkUser } from "./create";
import { v } from "convex/values";

export const userInfo = mutation({
  args: user_updateable_schema,
  handler: async ({ db }, data) => {
    const user = await checkUser(db, data.uid);

    if (user === null) {
      return null;
    }

    // const data_kv = Object.entries(data)
    //   .filter((f) => f[0] === "uid")
    //   .map(([k, v]) => [k, v]);

    // for (const d of data_kv) {
    //   await db.patch(user._id, Object.fromEntries([d]) as UpdateUser);
    // }

    // if (data.group_code && user.group_code !== data.group_code) {
    //   await db.patch(user._id, { group_code: data.group_code });
    // }

    // if (user.role !== data.role && data.role?.length !== 0) {
    //   await db.patch(user._id, { role: data.role });
    // }

    if (
      typeof data.is_verified !== "undefined" &&
      user.is_verified !== data.is_verified
    ) {
      await db.patch(user._id, { is_verified: data.is_verified });
    }

    await db.patch(user._id, { updated_at: Date.now() });
    return user._id;
  },
});

export const groupCode = mutation({
  args: { uid: v.string(), group_code: v.string() },
  handler: async ({ db }, { uid, group_code }) => {
    const user = await checkUser(db, uid);

    if (user === null || group_code === "") {
      return null;
    }

    await db.patch(user._id, { group_code, updated_at: Date.now() });
    return user._id;
  },
});
