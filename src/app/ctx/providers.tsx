"use client";
import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth/auth";
import { ActionBar } from "../comp/actionbar/actionbar";
import { Vex } from "./convex";
import { Theme } from "./theme";
import { TooltipProvider } from "./tooltip";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <Theme>
        <Vex>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
            <ActionBar />
            <Toasts />
          </AuthProvider>
        </Vex>
      </Theme>
    </NextUIProvider>
  );
};
