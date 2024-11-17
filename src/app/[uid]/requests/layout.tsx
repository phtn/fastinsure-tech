import { type PropsWithChildren } from "react";
import { Header } from "@dashboard/components/header";

export default function RequestsLayout({ children }: PropsWithChildren) {
  return (
    <div>
      <Header title="requests" xs />
      {children}
    </div>
  );
}
