import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";
import { AuthProvider } from "./auth";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      <AuthProvider>
        {children}
        <Toasts />
      </AuthProvider>
    </NextUIProvider>
  );
};
