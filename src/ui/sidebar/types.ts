import type { IconName } from "@/lib/icon/types";

export interface INavItem {
  id?: string | number;
  label: string;
  href: string;
  icon:
      | {
          type: "icon";
          content: IconName; // content is IconName when type is "icon"
        }
      | {
          type: "image";
          content: string; // content is string when type is "image"
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
