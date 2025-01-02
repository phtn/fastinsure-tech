"use client";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/ui/sidebar";
import { type PropsWithChildren } from "react";
import { Container } from "./components";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Container>
      <Sidebar />
      <div
        className={cn(
          "relative z-[100] flex flex-1 border-l-[0.0px] bg-foreground dark:border-background/60 dark:bg-fade/40",
          {},
        )}
      >
        <div className="relative flex h-full w-full flex-1 flex-col gap-2 overflow-clip rounded-tl-3xl border-l-[0.0px] border-foreground/15 bg-background">
          {children}
        </div>
      </div>
    </Container>
  );
};

export default DashboardLayout;
