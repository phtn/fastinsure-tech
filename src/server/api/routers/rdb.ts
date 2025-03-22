import { ActivationResource, ExampleResource } from "@/server/rdb/schema";
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { rdb } from "@/server/rdb/handler";

const rdbExampleSet = proc.input(ExampleResource)
const activationSet = proc.input(ActivationResource)

export const rdbRouter = router({
  rdbExampleSet: rdbExampleSet.mutation(asyncR(rdb.set.rdbExampleSet)),
  activationSet: activationSet.mutation(asyncR(rdb.set.activationSet)),
});
