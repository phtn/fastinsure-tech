import { useState, useCallback } from "react";
import { getLastLogin, getUID } from "../actions";
import { getLivez } from "@/trpc/secure/callers/server";
import type { ServerResponse } from "@/server/secure/resource";

export const useAuthFn = () => {
  const [uid, setuid] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [lastLogin, setLastLoginState] = useState<string>();
  const [livez, setLivez] = useState<ServerResponse | null>(null);

  const checkSession = useCallback(async () => {
    setPending(true);
    const uid = await getUID();
    setuid(uid);
    setPending(false);
  }, []);

  const checkServer = useCallback(async () => {
    setLivez(await getLivez());
  }, []);

  const checkLastLogin = useCallback(async () => {
    setLastLoginState(await getLastLogin());
  }, []);

  return {
    checkSession,
    checkServer,
    checkLastLogin,
    pending,
    uid,
    lastLogin,
    livez,
  };
};

/*
localStorage.setItem(
        name ?? Date.now().toString(36),
        JSON.stringify(result),
      );
*/
