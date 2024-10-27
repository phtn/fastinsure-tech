import { useState } from "react";
import { createAgentCode } from "../secure/callers";
import type { AgentCode, VerifyIdToken } from "../secure/resource";
import { errHandler, settle } from "@/utils/helpers";

export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<{ data: AgentCode } | undefined>();
  const newAgentCode = async (params: VerifyIdToken) => {
    return await createAgentCode(params)
      .then(setAgentCode)
      .catch(errHandler(setLoading))
      .finally(settle(setLoading));
  };

  return {
    newAgentCode,
    agentCode,
    loading,
  };
};
