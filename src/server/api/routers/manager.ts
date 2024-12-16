import { VerifyIdTokenSchema } from "@/server/secure/resource";
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { manager } from "@/server/secure";

export const managerRoute = router({
  generateCode: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(manager.generateCode)),
});
