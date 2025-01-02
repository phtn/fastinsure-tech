import { type PropsWithChildren, createContext, useMemo } from "react";
import type { SidebarCtxValues } from "./types";
import { useToggle } from "@/utils/hooks/useToggle";

export const SidebarCtx = createContext<SidebarCtxValues | null>(null);

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const { open, toggle } = useToggle();
  const value = useMemo(() => ({ open, toggle }), [open, toggle]);
  return <SidebarCtx value={value}>{children}</SidebarCtx>;
};
