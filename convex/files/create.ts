import { mutation } from "@vex/server";

export const url = mutation(
  async ({ storage }) => await storage.generateUploadUrl(),
);
