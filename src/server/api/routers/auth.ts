import {
  AccountTokenSchema,
  TokenVerificationSchema,
  VerifyAuthKeySchema,
  VerifyIdTokenSchema,
} from "@/lib/secure/resource";
import { proc, router } from "../trpc";
import {
  devGet,
  devSet,
  verifyAuthKey,
  verifyIdToken,
  getServerHealth,
  createAgentCode,
  getClaims,
  createAccountToken,
} from "@/lib/secure/handlers";
import { asyncR } from "../utils";

export const authRouter = router({
  verifyIdToken: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(verifyIdToken)),
  verifyAuthKey: proc
    .input(VerifyAuthKeySchema)
    .mutation(asyncR(verifyAuthKey)),
  createAgentCode: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(createAgentCode)),
  getClaims: proc.input(VerifyIdTokenSchema).mutation(asyncR(getClaims)),
  createAccountToken: proc
    .input(AccountTokenSchema)
    .mutation(asyncR(createAccountToken)),
  // Test Re-up Server Connection
  getServerStatus: proc.query(asyncR(getServerHealth)),

  /* Test RDB */
  devSet: proc.input(TokenVerificationSchema).mutation(asyncR(devSet)),
  devGet: proc.query(asyncR(devGet)),
});
