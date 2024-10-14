import {
  TokenVerificationSchema,
  VerifyAuthKeySchema,
  VerifyIdTokenSchema,
} from "@/lib/secure/resource";
import { proc, router } from "../trpc";
import {
  devGet,
  devSet,
  ruConn,
  verifyAuthKey,
  verifyIdToken,
} from "@/lib/secure/handlers";
import { asyncR } from "../utils";

export const authRouter = router({
  verifyIdToken: proc
    .input(VerifyIdTokenSchema)
    .mutation(asyncR(verifyIdToken)),
  verifyAuthKey: proc
    .input(VerifyAuthKeySchema)
    .mutation(asyncR(verifyAuthKey)),
  /*
   * Test Re-up Server Connection
   */
  ruConn: proc.query(asyncR(ruConn)),
  /* Test RDB */
  devSet: proc.input(TokenVerificationSchema).mutation(asyncR(devSet)),
  devGet: proc.query(asyncR(devGet)),
});
