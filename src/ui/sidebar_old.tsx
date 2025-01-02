"use client";
import type { ComponentProps } from "react";
import { SidebarProvider } from "./sidebar/ctx";
import { type motion } from "framer-motion";
import { DesktopSidebar } from "./sidebar/desktop";
import { MobileSidebar } from "./sidebar/mobile";

export const SidebarBody = (props: ComponentProps<typeof motion.div>) => {
  return (
    <SidebarProvider>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as ComponentProps<"div">)} />
    </SidebarProvider>
  );
};
