"use client";

import { cn } from "@/lib/utils";
import { SlashIcon } from "@heroicons/react/24/outline";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";

interface HeaderProps {
  title: string;
  sm?: boolean;
  xs?: boolean;
}
export const Header = ({ title, sm, xs }: HeaderProps) => {
  const pathname = usePathname();
  const crumbs = pathname.split("/");
  return (
    <div
      className={cn(
        "relative z-50 h-fit w-full p-6",
        { "px-6 py-4": sm },
        { "px-6 py-2": xs },
      )}
    >
      <section className="flex items-center gap-3 leading-none">
        <Link
          href={`/dashboard/${title}`}
          className="font-inter text-xl font-semibold capitalize tracking-tighter text-foreground opacity-100"
        >
          {title}
        </Link>
        <SlashIcon
          className={cn("hidden size-5 stroke-1 opacity-30", {
            flex: crumbs[3],
          })}
        />
        <div className="flex h-6 items-center gap-3">
          <span className="rounded-md bg-default/60 px-1.5 py-1 font-mono text-[10px] uppercase leading-3">
            {crumbs[3]}
          </span>
          <SlashIcon
            className={cn("hidden size-5 stroke-1 opacity-30", {
              flex: crumbs[4],
            })}
          />
          <span className="font-mono text-xs tracking-widest opacity-80">
            {crumbs[4]}
          </span>

          <SlashIcon
            className={cn("hidden size-5 stroke-1 opacity-30", {
              flex: crumbs[4],
            })}
          />
          <span className="_bg-default/60 _uppercase rounded-md px-1.5 py-1 font-mono text-[10px] leading-3">
            {crumbs[4] ? "saved as draft" : ""}
          </span>
        </div>
      </section>
    </div>
  );
};