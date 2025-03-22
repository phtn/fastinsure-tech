import { activationSet, rdbExampleSet } from "@/server/rdb/caller";
import type { ActivationType, ExampleValueType } from "@/server/rdb/schema";
import { useCallback } from "react";

export const useRdb = () => {
  const rdbset = useCallback(async (data: ExampleValueType) => {
    await rdbExampleSet({...data});
  }, []);

  const activation = useCallback(async (data: ActivationType) => {
    await activationSet({...data});
  }, []);

  return {
    rdbset,
    activation
  };
};
