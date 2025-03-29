
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { ActivateUserSchema } from "@/server/workflow/schema";
import { workflow } from "@/server/workflow/handlers";

export const workflowRouter = router({
  // VERIFY ACTIVATION CODE
  activateUser: proc
    .input(ActivateUserSchema)
    .mutation(asyncR(workflow.activateUser)),
});
