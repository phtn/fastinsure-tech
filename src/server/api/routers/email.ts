import { proc, router } from "../trpc";
import { EmailContextSchema } from "@/lib/email/schema";
import { asyncR } from "../utils";
import { email } from "@/server/email";
const send = proc.input(EmailContextSchema)

export const emailRouter = router({
  send: send.mutation(asyncR(email.send)),
});
