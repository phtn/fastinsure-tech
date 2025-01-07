"use client";

import { cn } from "@/lib/utils";
import { SlashIcon } from "@heroicons/react/24/outline";
import { Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

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
        "relative z-50 h-16 w-full",
        { "px-2 py-4": sm },
        { "px-2 py-2": xs },
      )}
    >
      <section className="flex h-full items-center px-3 leading-none">
        <Link
          href={`/dashboard/${title}`}
          className="font-inter text-xl font-semibold capitalize tracking-tighter text-foreground opacity-100"
        >
          <motion.p
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.5, ease: "easeOut" }}
          >
            {title}
          </motion.p>
        </Link>
        <SlashIcon className={cn("flex size-5 stroke-1 opacity-30", {})} />
        <div className="flex h-6 items-center">
          <motion.span
            initial={{ opacity: 0, x: -2 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.75, ease: "easeOut" }}
            className="rounded-md bg-primary-100/60 px-1.5 py-1 font-mono text-[10px] uppercase leading-3"
          >
            {crumbs[1] === "dashboard" && !crumbs[2]
              ? "home"
              : (crumbs[3] ?? "all")}
          </motion.span>
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
