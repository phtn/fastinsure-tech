"use client";

import { Alpha } from "./comp/alpha";
import { Features } from "./comp/features";
import { Partners } from "./comp/partners";
import { Proxima } from "./comp/proxima";
import { TooltipProvider } from "@/app/ctx/tooltip";
import { SupportTools } from "./comp/tools";

export const MainContent = () => {
  return (
    <TooltipProvider>
      <main className="w-screen overflow-x-clip bg-background md:h-[calc(100vh*1.2)] xl:h-fit portrait:overflow-y-auto">
        <Alpha />
        <SupportTools />
        <div className="h-24" />
        <Features />
        <Partners />
        <Proxima />
      </main>
    </TooltipProvider>
  );
};
