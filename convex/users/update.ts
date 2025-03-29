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

export const role = mutation({
  args: { uid: v.string(), role: v.string() },
  handler: async ({ db }, { uid, role }) => {
    const user = await checkUser(db, uid);

    if (user === null || role === "") {
      return null;
    }

    await db.patch(user._id, { role, updated_at: Date.now() });
    return user._id;
  },
});
export const commission = mutation({
  args: { uid: v.string(), commission_pct: v.number() },
  handler: async ({ db }, { uid, commission_pct }) => {
    const user = await checkUser(db, uid);

    if (user === null || !commission_pct) {
      return null;
    }

    await db.patch(user._id, { commission_pct, updated_at: Date.now() });
    return user._id;
  },
});

const activation_schema = v.object({
  group_code: v.string(),
});

export const activation = mutation({
  args: { uid: v.string(), data: activation_schema },
  handler: async ({ db }, { uid, data }) => {
    const user = await checkUser(db, uid);

    if (user === null || data.group_code === "") {
      return null;
    }

    await db.patch(user._id, { group_code: data.group_code, updated_at: Date.now(), role: "agent" });
    return "success";
  },
});
