import { z } from "zod";

export const AccountTypeSchema = z.union([
  z.literal("AFFILIATE"),
  z.literal("PERSONAL"),
  z.literal("MANAGER"),
  z.literal("AGENT1"),
  z.literal("AGENT2"),
  z.literal("UNDERWRITER"),
]);

export type AccountType = z.infer<typeof AccountTypeSchema>;
