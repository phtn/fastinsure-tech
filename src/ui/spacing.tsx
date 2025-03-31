"use client";

import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { HyperList } from "./list";

interface HyperSpacedProps {
  text: string;
  bold?: boolean;
  delay?: number;
}

export const HyperSpaced = ({ text, bold=false, delay=0 }: HyperSpacedProps) => {
  const charList = text.split("").map((t, index) => ({ t, id: index }));
    const Component = useCallback(
      (el: { t: string; id: number }) => (
        <span className="tracking-tighter" key={el.id}>
          {el.t}
        </span>
      ),
      [],
    );
  return (
    <div className={cn(
      "flex-shrink-0 will-change-contents font-jet text-lg text-foreground/50 drop-shadow-sm md:text-xl md:tracking-tighter xl:text-3xl xl:-tracking-widest",
      {
        "font-inst text-5xl font-extrabold text-primary md:text-4xl xl:text-6xl portrait:tracking":
        bold,
      },
    )}>
      <HyperList container="flex pb-1" direction="up" data={charList} component={Component} keyId="id" delay={delay} itemStyle={bold  ? "" : "flex-shrink-0 font-jet text-lg text-foreground/50 md:text-xl xl:text-3xl" } />
    </div>
  )
}
