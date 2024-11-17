import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";
import { ActionBar } from "../comp/actionbar";
import { Vex } from "./convex";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Vex>
      <NextUIProvider>
        <AuthProvider>
          {children}
          <ActionBar />
          <Toasts />
        </AuthProvider>
      </NextUIProvider>
    </Vex>
  );
};
