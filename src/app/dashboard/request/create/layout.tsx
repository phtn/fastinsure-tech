"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";
import { PanelRight } from "lucide-react";
import { ButtSqx } from "@/ui/button/button";
import { useToggle } from "@/utils/hooks/useToggle";
import { cn } from "@/lib/utils";

export default function RequestLayout({ children }: PropsWithChildren) {
  const { open, toggle } = useToggle();
  return (
    <main
      className={cn("", "duration-300, transition-all ease-out", {
        "translate-x-80": open,
      })}
    >
      <div className="flex items-center ps-6">
        <ButtSqx icon={PanelRight} onClick={toggle} />
        <Header title="request" xs />
      </div>
      {children}
    </main>
  );
}
