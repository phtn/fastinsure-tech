"use client";

import { Alpha } from "./comp/alpha";
import { Features } from "./comp/features";
import { Partners } from "./comp/partners";
import { Proxima } from "./comp/proxima";
import { Reviews } from "./comp/reviews";
import { SigninContent } from "./signin/content";

export const MainContent = () => (
  <main className="w-screen overflow-x-clip bg-background md:h-[calc(100vh*1.2)] xl:h-fit portrait:overflow-y-auto">
    <Alpha />
    <SigninContent />
    <Partners />
    <Features />
    <Reviews />
    <Proxima />
  </main>
);
