import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { type SelectRequest } from "@convex/requests/d";
import { type SelectUser } from "@convex/users/d";
import { api } from "@vex/api";
import { useQuery } from "convex/react";
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

export const useRequests = () => {
  const [requests, setRequests] = useState<SelectRequest[] | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const [underwriters, setUnderwriters] = useState<SelectUser[] | null>(null);
  const [vxusers, setVxusers] = useState<SelectUser[] | null>(null);

  const { vxuser } = useAuthCtx();
  const { request, usr } = useVex();

  const ids = useMemo(
    () => requests?.map((r) => r.subject_id) as string[],
    [requests],
  ) ?? [""];
  const vxsubjects = useQuery(api.subjects.get.byIds, { ids });

  const searchFn = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const filterFn = useCallback(
    (list: SelectRequest[], max?: number) =>
      list
        .filter(
          ({
            request_id,
            agent_id,
            underwriter_id,
            assured_name,
            status,
            service_type,
          }) =>
            request_id.toLowerCase().includes(search.toLowerCase()) ||
            agent_id.toLowerCase().includes(search.toLowerCase()) ||
            underwriter_id.toLowerCase().includes(search.toLowerCase()) ||
            assured_name.toLowerCase().includes(search.toLowerCase()) ||
            status.toLowerCase().includes(search.toLowerCase()) ||
            service_type.toLowerCase().includes(search.toLowerCase()),
        )
        .slice(0, max ?? 10),
    [search],
  );
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

  const getvxUnderwriters = useCallback(async () => {
    if (!vxuser?.group_code) return null;
    const vxs = await usr.get.byGroup(vxuser?.group_code);
    setVxusers(vxs);
    const vxunds = vxs.filter((vx) => vx.role === "underwriter");
    return vxunds;
  }, [usr.get, vxuser?.group_code]);

  const getUnderwriters = useCallback(() => {
    setFn(fn, getvxUnderwriters, setUnderwriters);
  }, [getvxUnderwriters]);

  useEffect(() => {
    getAll();
    getUnderwriters();
  }, [getAll, getUnderwriters]);

  return {
    requests,
    pending,
    search,
    searchFn,
    filterFn,
    underwriters,
    vxusers,
    vxsubjects,
  };
};
