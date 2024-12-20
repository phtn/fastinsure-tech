import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import type { SelectLog } from "@convex/logs/d";
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
  const [vxteam, setVxTeam] = useState<SelectUser[] | undefined>();
  const [vxmembers, setVxMembers] = useState<SelectUser[] | undefined>();
  const [userLogs, setUserLogs] = useState<SelectLog[] | null>(null);

  const { vxuser } = useAuthCtx();
  const group_code = vxuser?.group_code;
  const { usr, logs } = useVex();

  const [pending, fn] = useTransition();

  const setFn = <T>(
    transition: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    transition(() => {
      transition(async () => {
        set(await action());
      });
    });
  };

  const getvxgroup = useCallback(async () => {
    if (!group_code) return;
    const team = await usr.get.byGroup(group_code);
    const members = team?.filter((u) => u.uid !== vxuser.uid);
    setVxMembers(members);
    return team;
  }, [usr, group_code, vxuser?.uid]);

  const getTeam = useCallback(() => {
    setFn(fn, getvxgroup, setVxTeam);
  }, [getvxgroup]);

  ///

  const getUserLogs = useCallback(
    async (uid: string) => {
      const allLogs = await logs.get.byId(uid);
      setUserLogs(allLogs);
    },
    [logs, setUserLogs],
  );

  useEffect(() => {
    getTeam();
  }, [getTeam]);

  return { vxteam, vxmembers, pending, userLogs, getUserLogs };
};
