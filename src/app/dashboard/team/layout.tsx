"use client";

import type { PropsWithChildren } from "react";
import { Header } from "@/app/dashboard/components/header";
import { TabContainer } from "./tabs";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header title="Team" xs />
      <TabContainer>{children}</TabContainer>
    </div>
  );
}
