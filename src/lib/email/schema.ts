import { z } from "zod";

export const EmailContextSchema = z.object({
  type: z.enum(["activation", "policy-request"]),
  email: z.string().email(),
  name: z.string().min(1).max(100),
  subject: z.string().min(1).max(100),
  text: z.string().min(1).max(1000).optional(),
});

export type EmailContext = z.infer<typeof EmailContextSchema>;
