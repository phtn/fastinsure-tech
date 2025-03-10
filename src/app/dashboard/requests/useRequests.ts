import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { type SelectRequest } from "@convex/requests/d";
import { type SelectSubject } from "@convex/subjects/d";
import { type SelectUser } from "@convex/users/d";
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
import { api } from "@vex/api";

export const useRequests = () => {
  const [requests, setRequests] = useState<SelectRequest[] | undefined>([]);
  const [search, setSearch] = useState<string>("");
  const [underwriters, setUnderwriters] = useState<SelectUser[] | null>(null);
  const [vxusers, setVxusers] = useState<SelectUser[] | null>(null);
  const [vxsubjects, setSubjects] = useState<SelectSubject[] | null>();
  const [ids, setIds] = useState<string[] | null>(null);

  const { vxuser } = useAuthCtx();
  const { request, usr } = useVex();

  const searchFn = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  }, []);

  const filterFn = useCallback(
    (list: SelectRequest[], max?: number) => {
      const searchLower = search.toLowerCase();
      return list
        .filter(
          ({
            request_id,
            agent_id,
            underwriter_name,
            assured_name,
            status,
            service_type,
          }) =>
            request_id.toLowerCase().includes(searchLower) ||
            agent_id.toLowerCase().includes(searchLower) ||
            underwriter_name!.toLowerCase().includes(searchLower) ||
            assured_name.toLowerCase().includes(searchLower) ||
            status.toLowerCase().includes(searchLower) ||
            service_type.toLowerCase().includes(searchLower),
        )
        .slice(0, max ?? 10);
    },
    [search],
  );

  const [pending, startTransition] = useTransition();

  const setFn = useCallback(
    <T>(
      transition: TransitionStartFunction,
      action: () => Promise<T>,
      set: Dispatch<SetStateAction<T>>,
    ) => {
      transition(async () => {
        const r = await action();
        set(r);
      });
    },
    [],
  );

  const s = useQuery(api.subjects.get.byIds, {ids: ids ?? [""]});
  useEffect(() => {
    if (s){
      setSubjects(s)
    }
  }, [s])


  const allRequests = useCallback(async () => {
    if (!vxuser) return;
    const isUnderwriter = vxuser.role === "underwriter";
    const uid = vxuser.uid;

    const [agentReqs, underReqs] = await Promise.all([
      request.get.byUnderwriterId(uid),
      request.get.byAgentId(uid),
    ]);

    const reqs = isUnderwriter ? agentReqs : underReqs;

    if (reqs?.length) {
      const ids = reqs
        .map((r) => r.subject_id)
        .filter((id): id is string => id !== undefined);
      setIds(ids);
    }

    return reqs;
  }, [request.get, vxuser]);

  const getAll = useCallback(() => {
    setFn(startTransition, allRequests, setRequests);
  }, [allRequests, setFn, startTransition]);

  const getvxUnderwriters = useCallback(async () => {
    if (!vxuser?.group_code) return null;
    const vxs = await usr.get.byGroup(vxuser.group_code);
    setVxusers(vxs);
    return vxs.filter((vx) => vx.role === "underwriter");
  }, [usr.get, vxuser?.group_code]);

  const getUnderwriters = useCallback(() => {
    setFn(startTransition, getvxUnderwriters, setUnderwriters);
  }, [getvxUnderwriters, setFn, startTransition]);

  const role = useMemo(() => vxuser?.role, [vxuser?.role]);

  useEffect(() => {
    if (vxuser) {
      getAll();
    }
  }, [getAll, vxuser]);

  useEffect(() => {
    getUnderwriters()
  }, [getUnderwriters])

  useEffect(() => {
    console.log()
  }, [])

  return {
    requests,
    pending,
    search,
    searchFn,
    filterFn,
    underwriters,
    vxusers,
    vxsubjects,
    role,
  };
};
