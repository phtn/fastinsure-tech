import {
  AccountActivationParamsSchema,
  GetUserParamsSchema,
  OnSigninVerificationSchema,
  UserVerificationSchema,
} from "@/server/secure/resource";
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { auth } from "@/server/secure";

export const authRouter = router({
  verifyUser: proc
    .input(UserVerificationSchema)
    .mutation(asyncR(auth.verifyUser)),
  verifyOnSignin: proc
    .input(OnSigninVerificationSchema)
    .mutation(asyncR(auth.verifyOnSignin)),
  getUser: proc.input(GetUserParamsSchema).mutation(asyncR(auth.getUser)),
  activateAccount: proc
    .input(AccountActivationParamsSchema)
    .mutation(asyncR(auth.activateAccount)),
});
