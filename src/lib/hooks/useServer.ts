import { errHandler } from "@/utils/helpers";
import { useCallback, useState } from "react";
import { getLivez } from "../secure/callers/server";
import { type LivezResponse } from "../secure/resource";

export const useServer = () => {
  const [loading, setLoading] = useState(false);
  const [livez, setLivez] = useState<LivezResponse | null>(null);

  console.log(livez?.Status);

  const checkServerStatus = useCallback(
    async () => await getLivez().then(setLivez).catch(errHandler(setLoading)),
    [],
  );

  return {
    checkServerStatus,
    loading,
    livez,
  };
};
