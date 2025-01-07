import { v } from "convex/values";
import { type Id } from "@vex/dataModel";
import { mutation } from "@vex/server";

export const get = mutation({
  args: { storageIds: v.array(v.string()) },
  handler: async ({ storage }, { storageIds }) => {
    return Promise.all(
      storageIds.map(
        async (storageId) => await storage.getUrl(storageId as Id<"_storage">),
      ),
    );
  },
});

export type GetFilesResponse = ReturnType<typeof get>;
