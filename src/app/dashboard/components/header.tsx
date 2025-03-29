"use client";

import { cn } from "@/lib/utils";
import { SlashIcon } from "@heroicons/react/24/outline";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Icon } from "@/lib/icon";

interface HeaderProps {
  title: string;
  sm?: boolean;
  xs?: boolean;
  role?: string;
}
export const Header = ({ title, sm, xs, role }: HeaderProps) => {
  const pathname = usePathname();
  const crumbs = pathname.split("/");
  console.log(role)
  return (
    <div
      className={cn(
        "relative z-50 h-16 w-full",
        { "px-2 py-4": sm },
        { "px-2 py-2": xs },
      )}
    >
      <section className="flex h-full items-center px-3 leading-none space-x-2">
        <Link
          href={`/dashboard/${title}`}
          className="text-lg md:text-xl font-semibold capitalize tracking-tighter text-foreground opacity-100"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.p>
        </Link>
        <Icon name="arrow-left-01" className={cn("flex rotate-180 size-4 opacity-80")} />
        <div className="flex h-6 items-center">
          <span
            className={cn("rounded-md border-[0.33px] border-macl-gray/80 px-1.5 py-1 capitalize tracking-tight font-medium text-xs bg-white", {"text-primary/80 border-macd-blue/80": role === "neo"})}
          >
            {crumbs[1] === "dashboard" && !crumbs[2]
              ? role === "neo" ? <div className="space-x-1 flex items-center"><span>Account activation</span><Icon name="activate" className="size-3.5" /></div> : "Home"
              : (crumbs[3] ?? "all")}
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
          <span className="rounded-md px-1.5 py-1 font-mono text-[10px] leading-3">
            {crumbs[4] ? "saved as draft" : ""}
          </span>
        </div>
      </section>
    </div>
  );
};
