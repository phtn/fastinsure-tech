import { proc, router } from "../trpc";
import { verifyAgentCode } from "@/lib/secure/handlers";
import { asyncR } from "../utils";
import { HCodeParamsSchema } from "@/lib/secure/resource";
import { server } from "./index";

export const serverRouter = router({
  // VERIFY AGENT CODE
  verifyAgentCode: proc
    .input(HCodeParamsSchema)
    .mutation(asyncR(verifyAgentCode)),

  // AXIOS SERVER STATUS
  getLivez: proc.query(asyncR(server.getLivez)),
  getReadyz: proc.query(asyncR(server.getReadyz)),
});
