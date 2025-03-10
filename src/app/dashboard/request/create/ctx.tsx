import { useAuthCtx } from "@/app/ctx/auth/auth";
import { useVex } from "@/app/ctx/convex";
import type { HyperSelectOption } from "@/ui/select";
import {
  createContext,
  useCallback,
  useState,
  useTransition,
  useEffect,
  useContext,
} from "react";
import type {
  TransitionStartFunction,
  Dispatch,
  SetStateAction,
  PropsWithChildren,
  ChangeEvent,
} from "react";

export interface HiddenFieldGroupProps {
  request_id: string | undefined;
  group_code: string | undefined;
  underwriter_id: string | undefined;
  underwriter_name: string | undefined;
  address_id: string | undefined;
  vehicle_id: string | undefined;
  subject_id: string | undefined;
}

interface CreateRequestCtxValues {
  pending: boolean;
  underwriters: HyperSelectOption[] | undefined;
  underwriter: HyperSelectOption | undefined;
  underwriter_id: string;
  onUnderwriterSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  generateIDs: (request_id: string) => void;
  ids: HiddenFieldGroupProps | undefined;
}
export const CreateRequestCtx = createContext<CreateRequestCtxValues | null>(
  null,
);

export const CreateRequestContext = ({ children }: PropsWithChildren) => {
  const [underwriter_id, setUnderwriterId] = useState("");
  const [underwriter, setUnderwriter] = useState<HyperSelectOption>();
  const [underwriters, setUnderwriters] = useState<HyperSelectOption[]>();
  const [ids, setids] = useState<HiddenFieldGroupProps>();

  const { vxuser } = useAuthCtx();

  const generateIDs = useCallback(
    (request_id: string) => {
      if (!request_id) return;
      const group_code = vxuser?.group_code;
      const ids = request_id.split("-");
      const subject_id = ids?.[4];
      const address_id = ids?.[0];
      const vehicle_id = `${ids?.[1]}-${ids?.[2]}-${ids?.[3]}`;
      setids({
        group_code,
        request_id,
        underwriter_id,
        underwriter_name: underwriter?.value,
        subject_id,
        address_id,
        vehicle_id,
      });
    },
    [vxuser?.group_code, underwriter_id, underwriter?.value],
  );

  const { usr } = useVex();

  const [pending, fn] = useTransition();

  const setFn = <T,>(
    xt: TransitionStartFunction,
    action: () => Promise<T>,
    set: Dispatch<SetStateAction<T>>,
  ) => {
    xt(async () => {
      set(await action());
    });
  };

  const vxUnderwriters = useCallback(async () => {
    if (!vxuser) return;
    const vxgroup = await usr.get.byGroup(vxuser.group_code!);
    return vxgroup
      .filter((vx) => vx.role === "underwriter")
      .map(
        (u) =>
          ({
            id: u.uid,
            value: u.nickname,
            color: "bg-success-100/40 text-success",
            photo_url: u.photo_url,
          }) as HyperSelectOption,
      );
  }, [usr.get, vxuser]);

  const getUnderwriters = useCallback(() => {
    setFn(fn, vxUnderwriters, setUnderwriters);
  }, [vxUnderwriters]);

  useEffect(() => {
    getUnderwriters();
  }, [getUnderwriters, generateIDs]);

  const onUnderwriterSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setUnderwriterId(e.target.value);
      const selected = underwriters?.find(u => u.id === e.target.value);
      setUnderwriter(selected)
    },
    [underwriters],
  );


  return (
    <CreateRequestCtx
      value={{
        pending,
        underwriters,
        underwriter,
        underwriter_id,
        onUnderwriterSelect,
        generateIDs,
        ids,
      }}
    >
      {children}
    </CreateRequestCtx>
  );
};

export const useCreateRequest = () => {
 const context = useContext(CreateRequestCtx);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
