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
        "relative w-full border border-macl-gray/40 overflow-hidden drop-shadow-sm rounded-2xl h-44 xl:h-64",
        "bg-gray-200"
      )}
    >
      <div className="border border-chalk h-full rounded-[15px]">
      <Header title={props.text ?? "Overview"} />
      </div>
    </div>
  );
};
