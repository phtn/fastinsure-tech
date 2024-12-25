import { query } from "@vex/server";
import { v } from "convex/values";

export const byIds = query({
  args: { ids: v.optional(v.array(v.string())) },
  handler: async ({ db }, { ids }) => {
    if (!ids) return null;
    return await db
      .query("subjects")
      .filter((q) => q.or(...ids?.map((id) => q.eq("subject_id", id))))
      .collect();
  },
});

// const s = async<DB extends GenericQueryCtx<DataModel>>(
//   db: DB,
//   {ids}: string[]) => {

//   if (!ids || ids.length === 0) return null;

//   await db
//     .query("subjects")
//     .filter(q => q.or(...ids.map(id, q.eq(q.field("subject_id"), id))))
//     .collect();
// }
