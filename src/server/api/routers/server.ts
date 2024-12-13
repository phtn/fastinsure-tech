import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { HCodeParamsSchema } from "@/server/secure/resource";
import { server } from "./index";

export const serverRouter = router({
  // VERIFY ACTIVATION CODE
  verifyActivationCode: proc
    .input(HCodeParamsSchema)
    .mutation(asyncR(server.verifyActivationCode)),

  // AXIOS SERVER STATUS
  getLivez: proc.query(asyncR(server.getLivez)),
  getReadyz: proc.query(asyncR(server.getReadyz)),
});
