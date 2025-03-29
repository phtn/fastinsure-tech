import { activationSet, rdbExampleSet } from "@/server/rdb/caller";
import type { ActivationSet, ExampleValueType } from "@/server/rdb/schema";
import { useCallback } from "react";

export const useRdb = () => {
  const rdbset = useCallback(async (data: ExampleValueType) => {
    await rdbExampleSet({...data});
  }, []);

  const activation = useCallback(async (data: ActivationSet) => {
    await activationSet({...data});
  }, []);

  return {
    rdbset,
    activation
  };
};
