"use client";
import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";
import { ActionBar } from "../comp/actionbar/actionbar";
import { Vex } from "./convex";
import { TRPCReactProvider } from "@/trpc/react";
import { Theme } from "./theme";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <Theme>
        <TRPCReactProvider>
          <Vex>
            <AuthProvider>
              {children}
              <ActionBar />
              <Toasts />
            </AuthProvider>
          </Vex>
        </TRPCReactProvider>
      </Theme>
    </NextUIProvider>
  );
};
