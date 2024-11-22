"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";

export default function RequestLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header title="requests" xs />
      {children}
    </div>
  );
}
