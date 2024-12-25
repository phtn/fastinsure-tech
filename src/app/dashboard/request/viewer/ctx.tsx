import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import { Err, Ok } from "@/utils/helpers";
import type { SelectAddress } from "@convex/address/d";
import type { SelectAuto } from "@convex/autos/d";
import type { SelectRequest } from "@convex/requests/d";
import type { SelectSubject } from "@convex/subjects/d";
import type { SelectUser } from "@convex/users/d";
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type TransitionStartFunction,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

interface RequestViewerValues {
  pending: boolean;
  vxrequest: SelectRequest | null;
  vxaddress: SelectAddress | null;
  vxauto: SelectAuto | null;
  vxsubject: SelectSubject | null;
  vxusers: SelectUser[] | null;
  underwriters: SelectUser[] | null;
  submitRequest: () => Promise<void>;
  loading: boolean;
  role: string | undefined;
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
  const { request, usr, address, auto, subject } = useVex();
  const [vxrequest, setRequest] = useState<SelectRequest | null>(null);
  const [vxaddress, setAddress] = useState<SelectAddress | null>(null);
  const [vxauto, setAuto] = useState<SelectAuto | null>(null);
  const [vxsubject, setSubject] = useState<SelectSubject | null>(null);
  const [vxusers, setvxusers] = useState<SelectUser[] | null>(null);
  const [underwriters, setUnderwriters] = useState<SelectUser[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { vxuser } = useAuthCtx();

  const role = useMemo(() => vxuser?.role, [vxuser?.role]);

  const address_id = useMemo(
    () => vxrequest?.request_id.split("-")[0],
    [vxrequest?.request_id],
  );

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

  const getvxaddress = useCallback(async () => {
    if (!address_id) return null;
    return await address.get.byId(address_id);
  }, [address.get, address_id]);

  const getAddress = useCallback(() => {
    setFn(fn, getvxaddress, setAddress);
  }, [getvxaddress]);

  const getvxauto = useCallback(async () => {
    if (!vxrequest?.vehicle_id) return null;
    return await auto.get.byId(vxrequest.vehicle_id);
  }, [auto.get, vxrequest?.vehicle_id]);

  const getAuto = useCallback(() => {
    setFn(fn, getvxauto, setAuto);
  }, [getvxauto]);

  const getvxsubject = useCallback(async () => {
    if (!vxrequest?.subject_id) return null;
    return await subject.get.byId(vxrequest.subject_id);
  }, [subject.get, vxrequest?.subject_id]);

  const getSubject = useCallback(() => {
    setFn(fn, getvxsubject, setSubject);
  }, [getvxsubject]);

  useEffect(() => {
    getRequest();
    getUnderwriters();
    getAddress();
    getAuto();
    getSubject();
  }, [getRequest, getUnderwriters, getAddress, getAuto, getSubject]);

  const submitRequest = useCallback(async () => {
    setLoading(true);
    if (!vxrequest?.request_id) return;
    await request.update
      .status(vxrequest?.request_id, "submitted")
      .then(Ok(setLoading, "Request submitted."))
      .catch(Err(setLoading, "Update failed."));
  }, [vxrequest?.request_id, request.update]);

  const value = useMemo(
    () => ({
      pending,
      vxrequest,
      vxaddress,
      vxauto,
      vxsubject,
      vxusers,
      underwriters,
      submitRequest,
      loading,
      role,
    }),
    [
      pending,
      vxrequest,
      vxaddress,
      vxauto,
      vxsubject,
      vxusers,
      underwriters,
      submitRequest,
      loading,
      role,
    ],
  );

  return <RequestViewerCtx value={value}>{children}</RequestViewerCtx>;
};
