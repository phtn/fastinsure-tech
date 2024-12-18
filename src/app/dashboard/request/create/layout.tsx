"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";

export default function RequestLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header title="request" xs />
      {children}
    </main>
  );
}
