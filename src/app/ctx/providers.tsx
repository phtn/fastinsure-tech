import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";
import { Theme } from "./theme";
import { TooltipProvider } from "./tooltip";
import { ActionBar } from "../comp/actionbar";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      <TooltipProvider>
        <NextUIProvider>
          <AuthProvider>
            {children}
            <ActionBar />
            <Toasts />
          </AuthProvider>
        </NextUIProvider>
      </TooltipProvider>
    </Theme>
  );
};
