import { mutation } from "@vex/server";
import { v } from "convex/values";
import { checkUser } from "./create";
import { type Metadata } from "./d";

export const metadata = mutation({
  args: { uid: v.string(), record: v.record(v.string(), v.any()) },
  handler: async ({ db }, { uid, record }) => {
    const user = await checkUser(db, uid);
    if (!user) {
      return null;
    }
    const metadata: Metadata = user.metadata
      ? [...user.metadata, record]
      : [record];
    await db.patch(user._id, {
      metadata: metadata,
      updated_at: Date.now(),
    });
  },
});
