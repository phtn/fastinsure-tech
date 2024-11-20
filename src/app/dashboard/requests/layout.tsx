"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";
import { RequestTabs } from "./content";

export default function RequestsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header title="requests" xs />
      <RequestTabs>{children}</RequestTabs>
    </div>
  );
}
