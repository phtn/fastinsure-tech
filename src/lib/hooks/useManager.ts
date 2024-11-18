import { useCallback, useState } from "react";
import { createAgentCode } from "../secure/callers";
import type { AgentCode, VerifyIdToken } from "../secure/resource";
import { errHandler } from "@/utils/helpers";
import { onError, onSuccess } from "@/app/ctx/toasts";
import { getSession } from "@/app/actions";
import { type User } from "firebase/auth";

export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<{ data: AgentCode } | undefined>();

  const getAgentCode = useCallback(async (code: { data: AgentCode }) => {
    if (code) {
      setAgentCode(code);
      return onSuccess("Agent Code Generated");
    }
    setLoading(false);
    return onError("Unable to generate code.");
  }, []);

  const newAgentCode = useCallback(
    async (user: User | null) => {
      const id_token = await getSession();
      if (!id_token && !user) return;
      const params: VerifyIdToken = {
        id_token,
        uid: user?.uid,
        email: user?.email,
      };
      console.table(params);
      return await createAgentCode(params)
        .then(getAgentCode)
        .catch(errHandler(setLoading));
    },
    [getAgentCode],
  );

  return {
    newAgentCode,
    agentCode,
    loading,
  };
};
