"use client";
import { cn } from "@/lib/utils";
import { Logo } from "@/ui/logo";
export const Orbiter = () => (
  <div className="object-fit rounded-full bg-[url('/svg/melancholy.svg')] bg-left transition-all duration-5000 ease-in hover:bg-center">
    <div
      className={cn(
        "",
        "flex items-center justify-center rounded-full",
        "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))]",
        "from-gray-300/10 via-blue-400/10 to-orange-50",
        "group/card relative h-[8rem] w-[8rem]",
      )}
    >
      <Logo />
    </div>
  </div>
);
// <div className="h-[20px] w-[20px] bg-[url('/svg/logo_light.svg')] bg-contain bg-no-repeat" />
