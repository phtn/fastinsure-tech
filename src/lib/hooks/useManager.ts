
import { useCallback, useEffect, useState } from "react";
import type {
  AgentCode,
  VerifyIdToken,
} from "@/server/secure/resource";
import { onError } from "@/app/ctx/toasts";
import { getSession } from "@/app/actions";
import { type User } from "firebase/auth";
import { generateCode } from "@/trpc/secure/callers/manager";
import { useVex } from "@/app/ctx/convex";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { Err, Ok } from "@/utils/helpers";
import { useRdb } from "@/app/dashboard/hooks/useRdb";

const DOT_DIVIDER = "•"
const PREFIX = "ACT"
const TTL = 172800

export const useManager = () => {
  const [loading, setLoading] = useState(false);
  const [agentCode, setAgentCode] = useState<AgentCode>();
  const [groupCode, setGroupCode] = useState<string | undefined>();
  const {user} = useAuthCtx()
  const { usr } = useVex()

  const {activation} = useRdb()

  const getGroupCode = useCallback(async () => {
    if (!user?.uid) return;
    const u = await usr.get.byId(user.uid)
    setGroupCode(u?.group_code)
  }, [usr.get, user?.uid]);

  useEffect(() => {
    getGroupCode().catch(console.error)
  }, [getGroupCode])

  const newAgentCode = useCallback(
    async (user: User | null) => {

      setLoading(true);
      const id_token = await getSession();
      if (!id_token && !user) return false;
      const params: VerifyIdToken = {
        id_token,
        uid: user?.uid,
        email: user?.email,
        group_code: groupCode
      };
      return await generateCode(params)
        .then(async (res) => {
          setAgentCode(res?.Data)
          if (res?.Data && user && groupCode) {

            const {code} = res.Data
            const key = PREFIX + DOT_DIVIDER + code

            const id = new TextEncoder().encode(user.uid).toString()

            await activation({key, path: "$", value: {code, super: btoa(id), group: groupCode, expiry: TTL}, ttl: TTL})
              .then(Ok(setLoading, "Code generated successfully!"))
              .catch(Err(setLoading))

          }
          return true;
        })
        .catch(() => {
          onError("Re-authentication required.");
          setLoading(false);
          console.log("error")
          return false;
        });
    },
    [ activation, groupCode],
  );

  return {
    newAgentCode,
    agentCode,
    loading,
  };
};
