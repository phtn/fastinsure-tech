import { cn } from "@/lib/utils";
import { type ReactNode, useCallback } from "react";
import { motion } from "framer-motion";
import { Header } from "@/app/dashboard/components/header";

interface SplashProps {
  children?: ReactNode;
  text?: string;
}
export const Splash = (props: SplashProps) => {
  const Lines = useCallback(() => {
    const value = (i: number) => Math.floor(Math.random() * 45 - i);
    const range_list = Array(16)
      .fill(0)
      .map((_, i) => value(i));
    const line = (r: number, i: number) => (
      <motion.div
        key={`${i}_${r}_`}
        style={{
          x: 4,
          y: -40,
          rotate: i,
          height: 81,
          willChange: "transform",
        }}
        animate={{ rotate: r, x: -40 }}
        transition={{ duration: 3, delay: 3 }}
        className={cn(
          `absolute h-[2px] w-[calc(100vw*2.5)] bg-gradient-to-r drop-shadow-lg`,
          "bg-gradient-to-r from-stone-100/30 via-slate-400/40 to-slate-600/50",
          "dark:from-gray-200/20 dark:via-gray-200/20 dark:to-pink-50",
        )}
      />
    );

    return (
      <div className="absolute flex h-full w-full items-start space-x-1">
        {range_list.map(line)}
      </div>
    );
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-[0.0px] drop-shadow-sm backdrop-blur-xl h-44 xl:h-64",
        "bg-gradient-to-tr",
        "border-primary/50 from-stone-300/40 via-zinc-300/40 to-slate-300/40",
        "dark:border-slate-200/40 dark:from-slate-200/20 dark:via-slate-200/40 dark:to-slate-200",
      )}
    >
      <Lines />
      <Header title={props.text ?? "Overview"} />
      {props.children}
    </div>
  );
};
