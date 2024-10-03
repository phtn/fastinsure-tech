"use client";

import { Alpha } from "./_comp/alpha";
import { Beta } from "./_comp/beta";
import { Proxima } from "./_comp/proxima";

export const GuestContent = () => (
  <main className="w-screen overflow-x-clip md:h-[calc(100vh*1.2)] xl:h-screen portrait:overflow-y-auto">
    <Alpha />
    <Beta />
    <Proxima />
  </main>
);
