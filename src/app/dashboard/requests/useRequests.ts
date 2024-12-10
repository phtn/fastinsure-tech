import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import { type SelectRequest } from "@convex/requests/d";
import {
  type Dispatch,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

export const useRequests = () => {
  const [requests, setRequests] = useState<SelectRequest[] | undefined>([]);

  const { vxuser } = useAuthCtx();
  const { request } = useVex();

  const [pending, fn] = useTransition();

  const setFn = <T>(
    transition: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    transition(() => {
      transition(async () => {
        const r = await action();
        set(r);
      });
    });
  };

  const allRequests = useCallback(async () => {
    const uid = vxuser?.uid;
    if (!uid) return;
    return await request.get.byAgentId(uid);
  }, [request.get, vxuser?.uid]);

  const getAll = useCallback(() => {
    setFn(fn, allRequests, setRequests);
  }, [allRequests]);

  useEffect(() => {
    getAll();
  }, [getAll]);

  return { requests, pending };
};
