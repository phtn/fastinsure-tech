import {
  AccountTokenSchema,
  ActivateUserSchema,
  GetUserSchema,
  TokenVerificationSchema,
  VerifyIdTokenSchema,
} from "@/lib/secure/resource";
import { proc, router } from "../trpc";
import {
  devGet,
  devSet,
  verifyIdToken,
  getServerHealth,
  createAgentCode,
  getClaims,
  createAccountToken,
  getUser,
  activateUser,
} from "@/lib/secure/handlers";
import { asyncR } from "../utils";

export const authRouter = router({
  verifyIdToken: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(verifyIdToken)),
  getUser: proc.input(GetUserSchema).mutation(asyncR(getUser)),
  createAgentCode: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(createAgentCode)),
  getClaims: proc.input(VerifyIdTokenSchema).mutation(asyncR(getClaims)),
  createAccountToken: proc
    .input(AccountTokenSchema)
    .mutation(asyncR(createAccountToken)),
  activateUser: proc.input(ActivateUserSchema).mutation(asyncR(activateUser)),
  // Test Re-up Server Connection
  getServerStatus: proc.query(asyncR(getServerHealth)),

  /* Test RDB */
  devSet: proc.input(TokenVerificationSchema).mutation(asyncR(devSet)),
  devGet: proc.query(asyncR(devGet)),
});
