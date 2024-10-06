"use client";

import { Alpha } from "./comp/alpha";
import { Dev } from "./comp/dev";
import { Partners } from "./comp/partners";
import { Proxima } from "./comp/proxima";
import { Reviews } from "./comp/reviews";
import { SignInContent } from "./signin/content";

export const MainContent = () => (
  <main className="w-screen overflow-x-clip md:h-[calc(100vh*1.2)] xl:h-screen portrait:overflow-y-auto">
    <Alpha />
    <SignInContent />
    <Partners />
    <Dev />
    <Reviews />
    <Proxima />
  </main>
);
