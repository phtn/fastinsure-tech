import { ActivationDelResource, ActivationGetResource, ActivationSetResource, ExampleResource } from "@/server/rdb/schema";
import { proc, router } from "../trpc";
import { asyncR } from "../utils";
import { rdb } from "@/server/rdb/handler";

const rdbExampleSet = proc.input(ExampleResource)
const activationSet = proc.input(ActivationSetResource)
const activationGet = proc.input(ActivationGetResource)
const activationDel = proc.input(ActivationDelResource)

export const rdbRouter = router({
  rdbExampleSet: rdbExampleSet.mutation(asyncR(rdb.set.rdbExampleSet)),
  activationSet: activationSet.mutation(asyncR(rdb.set.activationSet)),
  activationGet: activationGet.query(asyncR(rdb.get.activationGet)),
  activationDel: activationDel.mutation(asyncR(rdb.del.activationDel)),
});
