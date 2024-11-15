import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";
import { Theme } from "./theme";
import { ActionBar } from "../comp/actionbar";
import { Snackbar } from "@/ui/sonner";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Theme>
      <NextUIProvider>
        <AuthProvider>
          {children}
          <ActionBar />
          <Toasts />
          <Snackbar />
        </AuthProvider>
      </NextUIProvider>
    </Theme>
  );
};
