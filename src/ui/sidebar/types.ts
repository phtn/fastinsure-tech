import type { DualIcon } from "@/app/types";

export interface INavItem {
  id?: string | number;
  label: string;
  href: string;
  icon: {
    type: "icon" | "image";
    content: DualIcon | string;
  };
}

export interface NavItemProps extends INavItem {
  className?: string;
}
////////////
//CTX
export interface SidebarCtxValues {
  open: boolean;
  toggle: VoidFunction;
}
