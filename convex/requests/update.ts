import type { DataModel } from "@vex/dataModel";
import { mutation } from "@vex/server";
import type { GenericDatabaseWriter } from "convex/server";
import { v } from "convex/values";
import { RequestStatusSchema } from "./d";

export const status = mutation({
  args: { request_id: v.string(), status: RequestStatusSchema },
  handler: async ({ db }, { request_id, status }) => {
    const request = await checkRequest(db, request_id);

    if (request === null || !status) {
      return null;
    }

    await db.patch(request._id, { status, updated_at: Date.now() });
    return request._id;
  },
});

export const checkRequest = async <DB extends GenericDatabaseWriter<DataModel>>(
  db: DB,
  request_id: string,
) =>
  await db
    .query("requests")
    .withIndex("by_request_id", (q) => q.eq("request_id", request_id))
    .first();
