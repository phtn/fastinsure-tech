"use client";

import type { ComponentProps, PropsWithChildren } from "react";
import { SidebarProvider } from "./ctx";
import { type motion } from "framer-motion";
import { DesktopSidebar } from "./desktop";
// import { MobileSidebar } from "./mobile";

export const Sidebar = (props: ComponentProps<typeof motion.div>) => {
  return (
    <Underlay>
      <SidebarProvider>
        <DesktopSidebar {...props} />
      </SidebarProvider>
    </Underlay>
  );
};

export const Underlay = ({ children }: PropsWithChildren) => (
  <div className="h-screen justify-between gap-10 bg-void dark:bg-gradient-to-tr dark:from-darkarmy/60 dark:via-army/50 dark:to-fade/40 dark:backdrop-blur-xl">
    {children}
  </div>
);
