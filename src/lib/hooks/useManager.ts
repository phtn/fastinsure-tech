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
import { useVex } from "@/app/ctx/convex";


export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<AgentCode>();
  const { usr } = useVex()

  const getGroupCode = useCallback(async (id: string | undefined) => {
    if (!id) return;
    const u = await usr.get.byId(id)
    return u?.group_code
  }, [usr.get]);

  const getAgentCode = useCallback((response: AgentCodeResponse | null) => {
    setAgentCode(response?.Data)
    onSuccess("Code generated successfully!")
    setLoading(false)
    return true


    // if (ok) {
    //   setAgentCode(response.Data);
    //   setLoading(false);
    //   return ok;
    // }
    // setLoading(false);
    // onError("Unable to generate code.");
    // return ok;
  }, []);

  const newAgentCode = useCallback(
    async (user: User | null) => {
      setLoading(true);
      const id_token = await getSession();
      if (!id_token && !user) return false;
      const group_code = await getGroupCode(user?.uid);
      const params: VerifyIdToken = {
        id_token,
        uid: user?.uid,
        email: user?.email,
        group_code
      };
      return await generateCode(params)
        .then(getAgentCode)
        .catch(() => {
          onError("Re-authentication required.");
          setLoading(false);
          return false;
        });
    },
    [getAgentCode, getGroupCode],
  );

  return {
    newAgentCode,
    agentCode,
    loading,
  };
};
