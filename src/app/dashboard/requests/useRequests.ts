import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { type SelectRequest } from "@convex/requests/d";
import { type SelectSubject } from "@convex/subjects/d";
import { type SelectUser } from "@convex/users/d";
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
  const [vxsubjects, setSubjects] = useState<SelectSubject[] | null>();

  const { vxuser } = useAuthCtx();
  const { request, usr, subject } = useVex();

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
    if (!vxuser) return;
    const isUnderwriter = vxuser.role === "underwriter";
    const uid = vxuser.uid;
    const agentReqs = await request.get.byUnderwriterId(uid);
    const underReqs = await request.get.byAgentId(uid);
    const ids = agentReqs?.map((r) => r.subject_id) as string[];
    const s = await subject.get.byIds(ids);
    setSubjects(s);
    return isUnderwriter ? agentReqs : underReqs;
  }, [request.get, vxuser, subject.get]);

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

  const role = useMemo(() => vxuser?.role, [vxuser?.role]);

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
    role,
    // ids,
  };
};
