import type { DualIcon } from "@/app/types";
import type { ButtonHTMLAttributes } from "react";

export type ButtSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtIconVariant =
  | "demigod"
  | "god"
  | "goddess"
  | "active"
  | "steel";
export interface ButtIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: ButtIconVariant;
  icon: DualIcon;
  size?: ButtSize;
  inverted?: boolean;
  disables?: boolean;
}
