import { proc, router } from "../trpc";
import { getServerHealth } from "@/lib/secure/handlers";
import { asyncR } from "../utils";

export const serverRouter = router({
  // SERVER STATUS
  getServerStatus: proc.query(asyncR(getServerHealth)),
});
