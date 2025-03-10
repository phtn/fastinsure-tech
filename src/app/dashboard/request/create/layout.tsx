"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";
import { cn } from "@/lib/utils";

export default function RequestLayout({ children }: PropsWithChildren) {
  return (
    <main className={cn("", "duration-300, transition-all ease-out", {})}>
      <div className="flex items-center ps-2">
        {/* <ButtSqx icon={PanelRight} onClick={toggle} /> */}
        <Header title="request" xs />
      </div>
      {children}
    </main>
  );
}
