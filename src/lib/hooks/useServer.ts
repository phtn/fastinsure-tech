import { errHandler } from "@/utils/helpers";
import { useCallback, useState } from "react";
import type { ServerStatus } from "../secure/handlers";
import { getServerStatus } from "../secure/callers";

export const useServer = () => {
  const [loading, setLoading] = useState(false);
  const [liveness, setLiveness] = useState<ServerStatus | null>(null);

  const checkServerStatus = useCallback(
    async () =>
      await getServerStatus()
        .then(setLiveness)
        .catch(errHandler(setLoading, "Server is unreachable.")),
    [],
  );

  return {
    checkServerStatus,
    loading,
    liveness,
  };
};
