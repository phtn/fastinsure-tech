import type { HyperSelectOption } from "@/ui/select";
import {
  type ChangeEvent,
  createContext,
  useCallback,
  useState,
  type PropsWithChildren,
  useMemo,
} from "react";

interface RequestCtxValues {
  underwriters: HyperSelectOption[];
  underwriter: string;
  onUnderwriterSelect: (e: ChangeEvent<HTMLSelectElement>) => void;
}
export const RequestCtx = createContext<RequestCtxValues | null>(null);

export const RequestContext = ({ children }: PropsWithChildren) => {
  const [underwriter, setUnderwriter] = useState("");

  const underwriters: HyperSelectOption[] = useMemo(
    () => [
      {
        id: 0,
        value: "Delba Oliveira",
        color: "bg-secondary-100/40 text-secondary",
      },
      {
        id: 1,
        value: "Dan Abramov",
        color: "bg-success-100/40 text-success",
      },
    ],
    [],
  );

  const onUnderwriterSelect = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setUnderwriter(e.target.value);
    },
    [],
  );
  return (
    <RequestCtx value={{ underwriters, underwriter, onUnderwriterSelect }}>
      {children}
    </RequestCtx>
  );
};
