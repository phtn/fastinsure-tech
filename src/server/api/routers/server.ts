import { proc, router } from "../trpc";
import { getServerHealth, verifyAgentCode } from "@/lib/secure/handlers";
import { asyncR } from "../utils";
import { HCodeParamsSchema } from "@/lib/secure/resource";

export const serverRouter = router({
  // VERIFY AGENT CODE
  verifyAgentCode: proc
    .input(HCodeParamsSchema)
    .mutation(asyncR(verifyAgentCode)),
  // SERVER STATUS
  getServerStatus: proc.query(asyncR(getServerHealth)),
});
