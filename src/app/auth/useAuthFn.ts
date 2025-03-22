import { useState, useCallback } from "react";
import { getLastLogin, getUID } from "../actions";

export const useAuthFn = () => {
  const [uid, setuid] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [lastLogin, setLastLoginState] = useState<string>();

  const checkSession = useCallback(async () => {
    setPending(true);
    const uid = await getUID();
    setuid(uid);
    setPending(false);
  }, []);

  const checkLastLogin = useCallback(async () => {
    setLastLoginState(await getLastLogin());
  }, []);

  return {
    checkSession,
    checkLastLogin,
    pending,
    uid,
    lastLogin,
  };
};
