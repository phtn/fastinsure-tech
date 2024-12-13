import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { agent } from ".";
import { HCodeParamsSchema } from "@/server/secure/resource";

export const agentRoute = router({
  verifyCode: proc.input(HCodeParamsSchema).mutation(asyncR(agent.verifyCode)),
});
