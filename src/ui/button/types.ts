import type { ClassName } from "@/app/types";
import type { IconName } from "@/lib/icon/types";
import type { ButtonHTMLAttributes } from "react";

export type ButtSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtIconVariant =
  | "demigod"
  | "god"
  | "goddess"
  | "active"
  | "steel"
  | "bright"
  | "secondary"
export interface ButtIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtIconVariant;
  icon: IconName;
  size?: ButtSize;
  inverted?: boolean;
  disables?: boolean;
  iconStyle?: ClassName;
  className?: ClassName;
  shadow?: ClassName;
}
