import { proc, router } from "../trpc";
import { verifyIdToken, VerifyIdTokenSchema } from "@/lib/secure/reqs";

export const authRouter = router({
  verifyIdToken: proc
    .input(VerifyIdTokenSchema)
    .mutation(async ({ input }) => verifyIdToken(input)),
});
