import { useVex } from "@/app/ctx/convex";
import { type HyperSelectOption } from "@/ui/select";
import { Err, Ok } from "@/utils/helpers";
import type { SelectLog } from "@convex/logs/d";
import type { UserRole } from "@convex/users/d";
import {
  type ChangeEvent,
  type ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";

interface TeamCtxValues {
  roles: HyperSelectOption[];
  roleSelected: string;
  logs: SelectLog[] | null;
  updateRole: () => Promise<void>;
  currentRole: UserRole[] | undefined;
  onRoleSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
  loading: boolean;
  isDone: boolean;
}
export const TeamCtx = createContext<TeamCtxValues | null>(null);

interface TeamContextProps {
  children: ReactNode;
  logs: SelectLog[] | null;
  currentRole: UserRole[] | undefined;
  uid: string | undefined;
}
export const TeamContext = ({
  children,
  currentRole,
  logs,
  uid,
}: TeamContextProps) => {
  const { usr } = useVex();
  const [roleSelected, setRoleSelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const onRoleSelect = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setRoleSelected(e.target.value);
  }, []);

  const updateRole = useCallback(async () => {
    setLoading(true);
    if (uid)
      await usr.update
        .role(uid, roleSelected)
        .then(Ok(setLoading, "Access role updated!"))
        .catch(Err(setLoading))
        .finally(() => setIsDone(true));
  }, [usr.update, roleSelected, uid]);

  const roles: HyperSelectOption[] = useMemo(
    () => [
      {
        id: 0,
        value: "agent",
        color: "bg-warning-400/20 text-amber-500",
      },
      {
        id: 2,
        value: "underwriter",
        color: "bg-indigo-100 text-indigo-600",
      },
      {
        id: 3,
        value: "supervisor",
        color: "bg-sky-100 text-sky-600",
      },
      {
        id: 4,
        value: "manager",
        color: "bg-slate-400/20 text-slate-950",
      },
    ],
    [],
  );
  return (
    <TeamCtx
      value={{
        logs,
        roles,
        loading,
        updateRole,
        currentRole,
        roleSelected,
        onRoleSelect,
        isDone,
      }}
    >
      {children}
    </TeamCtx>
  );
};
