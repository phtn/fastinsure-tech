import { z } from "zod";

export const ActivateUserSchema = z.object({
  uid: z.string().min(1),
  hcode: z.string().min(1),
});

export type ActivateUserType = z.infer<typeof ActivateUserSchema>;
