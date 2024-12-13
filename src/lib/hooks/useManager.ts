import { useCallback, useState } from "react";
import type {
  AgentCode,
  AgentCodeResponse,
  VerifyIdToken,
} from "@/server/secure/resource";
import { onError, onSuccess } from "@/app/ctx/toasts";
import { getSession } from "@/app/actions";
import { type User } from "firebase/auth";
import { generateCode } from "@/trpc/secure/callers/manager";

export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<AgentCode>();

  const getAgentCode = useCallback((response: AgentCodeResponse | null) => {
    const ok = response?.Status === 200;
    if (ok) {
      setAgentCode(response.Data);
      setLoading(false);
      onSuccess("Agent Code Generated");
      return ok;
    }
    setLoading(false);
    onError("Unable to generate code.");
    return ok;
  }, []);

  const newAgentCode = useCallback(
    async (user: User | null) => {
      setLoading(true);
      const id_token = await getSession();
      if (!id_token && !user) return false;
      const params: VerifyIdToken = {
        id_token,
        uid: user?.uid,
        email: user?.email,
      };
      // console.table(params);
      return await generateCode(params)
        .then(getAgentCode)
        .catch(() => {
          onError("Re-authentication required.");
          setLoading(false);
          return false;
        });
    },
    [getAgentCode],
  );

  return {
    newAgentCode,
    agentCode,
    loading,
  };
};
