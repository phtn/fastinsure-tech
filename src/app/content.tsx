"use client";

import { Alpha } from "./comp/alpha";
import { Features } from "./comp/features";
import { Partners } from "./comp/partners";
import { Proxima } from "./comp/proxima";

export const MainContent = () => {
  return (
    <main className="w-screen will-change-auto scroll-smooth overflow-x-clip bg-background md:h-[calc(100vh*1.2)] xl:h-fit portrait:overflow-y-auto">
      <Alpha />
      <div className="h-24" />
      <Features />
      <Partners />
      <Proxima />
    </main>
  );
};
