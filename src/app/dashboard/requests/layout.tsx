"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";
import { TabContainer } from "./tabs";

export default function RequestsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header title="requests" xs />
      <TabContainer>{children}</TabContainer>
    </div>
  );
}
