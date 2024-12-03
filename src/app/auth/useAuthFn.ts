import type { Dispatch, SetStateAction, TransitionStartFunction } from "react";
import { useTransition, useState, useCallback } from "react";
// import { onAwait, onWarn } from "../ctx/toasts";
import { getUID } from "../actions";
import { getLivez, getReadyz } from "@/lib/secure/callers/server";

export const useAuthFn = () => {
  const [uid, setuid] = useState<string | null>(null);
  const [pending, fn] = useTransition();

  const startFn = <T>(
    transition: TransitionStartFunction,
    fn: () => Promise<T>,
    set?: Dispatch<SetStateAction<T>>,
    name?: string,
  ) => {
    transition(() => {
      transition(async () => {
        const result = await fn();
        localStorage.setItem(
          name ?? Date.now().toString(36),
          JSON.stringify(result),
        );
        // await onAwait(fn(), `"Running: ${name}`, `${name}: done!`);
        if (!result) {
          // onWarn(`return-type: ${String(result)}`);
        }
        if (set) set(result);
      });
    });
  };

  const checkSession = useCallback(() => {
    startFn(fn, getUID, setuid, `Session check`);
  }, []);

  const checkServer = useCallback(() => {
    startFn(fn, getLivez, undefined, "Get Livez");
    startFn(fn, getReadyz, undefined, "Get Readyz");
  }, []);

  return { checkSession, checkServer, pending, uid };
};
