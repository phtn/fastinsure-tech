import type { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import type { ReactNode, RefObject } from "react";

interface FlexProps {
  children: ReactNode;
  ref?: RefObject<HTMLDivElement>;
  className?: ClassName;
}
export const FlexRow = (props: FlexProps) => (
  <div
    ref={props.ref}
    className={cn("flex h-full w-full space-x-4", props.className)}
  >
    {props.children}
  </div>
);
