import { useCallback, useState } from "react";
import { createAgentCode } from "../secure/callers";
import type { AgentCode, VerifyIdToken } from "../secure/resource";
import { errHandler } from "@/utils/helpers";
import { type User } from "firebase/auth";
import { onSuccess } from "@/app/ctx/toasts";

export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<{ data: AgentCode } | undefined>();

  const getAgentCode = useCallback(async (code: { data: AgentCode }) => {
    setAgentCode(code);
    setLoading(false);
    onSuccess("Agent Code Generated");
  }, []);

  const newAgentCode = useCallback(
    async (user: User | null) => {
      const id_token = await user?.getIdToken();
      if (!id_token && !user) return;
      const params: VerifyIdToken = {
        id_token,
        uid: user?.uid,
        email: user?.email,
      };
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
