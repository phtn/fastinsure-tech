import {
  AccountActivationParamsSchema,
  GetUserParamsSchema,
  OnSigninVerificationSchema,
  UserVerificationSchema,
} from "@/server/secure/resource";
import { proc, router } from "../trpc";
// import {
//   devGet,
//   devSet,
//   verifyIdToken,
//   createAgentCode,
//   getClaims,
//   createAccountToken,
// } from "@/server/secure/handlers";
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
  ///
  ///
  // verifyIdToken: proc
  //   .input(VerifyIdTokenSchema)
  //   .mutation(asyncR(verifyIdToken)),
  // createAgentCode: proc
  //   .input(VerifyIdTokenSchema)
  //   .mutation(asyncR(createAgentCode)),
  // getClaims: proc.input(VerifyIdTokenSchema).mutation(asyncR(getClaims)),
  // createAccountToken: proc
  //   .input(AccountTokenSchema)
  //   .mutation(asyncR(createAccountToken)),
  // Test Re-up Server Connection
  // getServerStatus: proc.query(asyncR(getServerHealth)),

  /* Test RDB */
  // devSet: proc.input(TokenVerificationSchema).mutation(asyncR(devSet)),
  // devGet: proc.query(asyncR(devGet)),
});
