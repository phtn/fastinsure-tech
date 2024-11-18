import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";
import { ActionBar } from "../comp/actionbar";
import { Vex } from "./convex";
import { Theme } from "./theme";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <Theme>
        <Vex>
          <AuthProvider>
            {children}
            <ActionBar />
            <Toasts />
          </AuthProvider>
        </Vex>
      </Theme>
    </NextUIProvider>
  );
};
