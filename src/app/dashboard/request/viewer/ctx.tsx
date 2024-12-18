import { useVex } from "@/app/ctx/convex";
import type { SelectRequest } from "@convex/requests/d";
import type { SelectUser } from "@convex/users/d";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";

interface RequestViewerValues {
  pending: boolean;
  vxrequest: SelectRequest | null;
  vxusers: SelectUser[] | null;
  underwriters: SelectUser[] | null;
}
export const RequestViewerCtx = createContext<RequestViewerValues | null>(null);
export interface RequestViewProps {
  children: ReactNode;
  request_id: string | null;
}
export const RequestViewerContext = ({
  children,
  request_id,
}: RequestViewProps) => {
  const { request, usr } = useVex();
  const [vxrequest, setRequest] = useState<SelectRequest | null>(null);
  const [vxusers, setvxusers] = useState<SelectUser[] | null>(null);
  const [underwriters, setUnderwriters] = useState<SelectUser[] | null>(null);

  const [pending, fn] = useTransition();

  const setFn = <T,>(
    xt: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    xt(() => {
      xt(async () => {
        set(await action());
      });
    });
  };

  const getvxRequest = useCallback(async () => {
    if (!request_id) return null;
    return await request.get.byId(request_id);
  }, [request.get, request_id]);

  const getRequest = useCallback(() => {
    setFn(fn, getvxRequest, setRequest);
  }, [getvxRequest]);

  const getvxUnderwriters = useCallback(async () => {
    if (!vxrequest?.group_code) return null;
    const vx = await usr.get.byGroup(vxrequest.group_code);
    setvxusers(vx);
    const unds = vx.filter((v) => v.role === "underwriter");
    return unds;
  }, [vxrequest?.group_code, usr.get]);

  const getUnderwriters = useCallback(() => {
    setFn(fn, getvxUnderwriters, setUnderwriters);
  }, [getvxUnderwriters]);

  useEffect(() => {
    getRequest();
    getUnderwriters();
  }, [getRequest, getUnderwriters]);

  return (
    <RequestViewerCtx value={{ pending, vxrequest, vxusers, underwriters }}>
      {children}
    </RequestViewerCtx>
  );
};
