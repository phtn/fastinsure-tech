import { VerifyIdTokenSchema } from "@/lib/secure/resource";
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { manager } from ".";

export const managerRoute = router({
  generateCode: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(manager.generateCode)),
});
