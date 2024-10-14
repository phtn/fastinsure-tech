import type { HTMLProps, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import type { HeartIcon } from "@heroicons/react/24/outline";

export type ClassName = HTMLProps<HTMLElement>["className"];
export type DualIcon = LucideIcon | typeof HeartIcon;
export type UID = string | number | null;
export interface TextProps {
  children?: ReactNode;
  className?: ClassName;
}

export type MonthName =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";
