import { useThemeCtx } from "@/app/ctx/theme";
import { cn } from "@/lib/utils";
import { useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { guid } from "@/utils/helpers";

export const Splash = () => {
  const { theme } = useThemeCtx();
  const light = useMemo(() => theme === "light", [theme]);

  const Lines = useCallback(() => {
    const value = (i: number) => Math.floor(Math.random() * 45 - i);
    const range_list = Array(16)
      .fill(0)
      .map((_, i) => value(i));
    const line = (r: number, i: number) => (
      <motion.div
        key={`${i}_${r}_${guid()}`}
        style={{
          rotate: i,
          x: 4,
          y: -40,
          height: 81,
          willChange: "transform",
        }}
        animate={{ rotate: r, x: -40 }}
        transition={{ duration: 3 }}
        className={cn(
          `absolute h-[2px] w-[calc(100vw*2.5)] drop-shadow-lg`,
          {
            "bg-gradient-to-r from-stone-100/30 via-slate-400/40 to-slate-600/50":
              light,
          },
          {
            "bg-gradient-to-r from-gray-200/20 via-gray-200/20 to-pink-50":
              !light,
          },
        )}
      />
    );

    return (
      <div className="absolute flex h-full w-full items-start space-x-1">
        {range_list.map(line)}
      </div>
    );
  }, [light]);

  return (
    <div
      className={cn(
        "relative h-64 w-full overflow-hidden rounded-2xl border-[0.5px] drop-shadow-sm backdrop-blur-xl",
        {
          "border-slate-300/60 bg-gradient-to-r from-slate-200/20 via-slate-200/40 to-slate-200":
            !light,
        },
        {
          "border-stone-400 bg-gradient-to-tr from-stone-300/40 via-zinc-300/40 to-slate-300/40":
            light,
        },
      )}
    >
      <Lines />
      <div className="relative z-50 h-full w-full p-6">
        <header className="font-inst text-xl font-medium text-foreground opacity-100">
          Hello, BrightOne!
        </header>
      </div>
    </div>
  );
};
