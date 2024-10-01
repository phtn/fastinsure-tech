import { type PropsWithChildren } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Toasts } from "./toasts";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <NextUIProvider>
      {children}
      <Toasts />
    </NextUIProvider>
  );
};
