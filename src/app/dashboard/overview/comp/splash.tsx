import { Header } from "@/app/dashboard/components/header";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SplashProps {
  children?: ReactNode;
  text?: string;
}
export const Splash = (props: SplashProps) => {

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl drop-shadow-sm h-44 xl:h-64",
        "bg-void"
      )}
    >
      <Header title={props.text ?? "Overview"} />
    </div>
  );
};
