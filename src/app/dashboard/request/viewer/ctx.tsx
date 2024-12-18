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
  underwriter: SelectUser | null;
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
  const [underwriter, setUnderwriter] = useState<SelectUser | null>(null);

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

  const getvxUnderwriter = useCallback(async () => {
    if (!vxrequest?.underwriter_id) return null;
    return await usr.get.byId(vxrequest.underwriter_id);
  }, [vxrequest?.underwriter_id, usr.get]);

  const getUnderwriter = useCallback(() => {
    setFn(fn, getvxUnderwriter, setUnderwriter);
  }, [getvxUnderwriter]);

  useEffect(() => {
    getRequest();
    getUnderwriter();
  }, [getRequest, getUnderwriter]);

  return (
    <RequestViewerCtx value={{ pending, vxrequest, underwriter }}>
      {children}
    </RequestViewerCtx>
  );
};
