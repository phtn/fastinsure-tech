"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ComponentRef } from "react";
import { forwardRef } from "react";

const Separator = forwardRef<
  ComponentRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref,
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 rounded-full bg-primary-800 shadow-inner shadow-steel/40 dark:bg-fade-dark/30 dark:shadow-adam/30",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[2px]",
        className,
      )}
      {...props}
    />
  ),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
