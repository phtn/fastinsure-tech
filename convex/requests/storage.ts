import { mutation } from "@vex/server";

export const generateUrl = mutation(
  async ({ storage }) => await storage.generateUploadUrl(),
);

// export const getById = query({
//   args: {storageId: Id<"_storage">},
//   handler: async ({storage}, {storageId}) => await storage.getUrl(storageId))
// });
