"use client";
import { cn } from "@/lib/utils";
import { Sidebar, SidebarBody } from "@/ui/sidebar";
import { type PropsWithChildren } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={cn(
        "bg-[url('/svg/mesh.svg')] bg-cover dark:bg-background/50",
        "flex h-screen w-full flex-1 flex-col overflow-hidden md:flex-row",
        { "bg-right": false },
      )}
    >
      <Sidebar>
        <SidebarBody className="justify-between gap-10 bg-foreground backdrop-blur-3xl dark:bg-background/90">
          <div className="flex w-fit flex-1 flex-col overflow-y-auto overflow-x-scroll">
            <div className="mt-6 flex flex-col"></div>
          </div>
        </SidebarBody>
      </Sidebar>
      <div
        className={cn(
          "relative z-[100] flex flex-1 border-l-[0.0px] bg-foreground dark:border-background/60 dark:bg-background/90",
          {},
        )}
      >
        <div className="_dark:bg-background relative flex h-full w-full flex-1 flex-col gap-2 overflow-clip rounded-tl-3xl border-l-[0.0px] border-foreground/15 bg-background">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
