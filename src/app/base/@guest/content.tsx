"use client";

// import { Alpha } from "./_comp/alpha";
import { Beta } from "./_comp/beta";
import { Proxima } from "./_comp/proxima";

export const GuestContent = () => (
  <main className="h-screen w-screen portrait:overflow-clip">
    <Beta />
    <Proxima />
  </main>
);
