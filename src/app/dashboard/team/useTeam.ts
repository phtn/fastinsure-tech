import { useAuthCtx } from "@/app/ctx/auth";
import { useVex } from "@/app/ctx/convex";
import type { SelectUser } from "@convex/users/d";
import {
  type Dispatch,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

export const useTeam = () => {
  const [vxteam, setVxTeam] = useState<SelectUser[] | undefined>([]);

  const { vxuser } = useAuthCtx();
  const { usr } = useVex();

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

  const getvxgroup = useCallback(async () => {
    const group_code = vxuser?.group_code;
    if (!group_code) return;
    return await usr.get.byGroup(group_code);
  }, [usr, vxuser?.group_code]);

  const getTeam = useCallback(() => {
    setFn(fn, getvxgroup, setVxTeam);
  }, [getvxgroup]);

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return { vxteam, pending };
};
