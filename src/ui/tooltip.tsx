"use client";
import { type MouseEvent, type RefObject, useState, useMemo } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";

export interface TooltipData {
  id: number;
  title: string;
  value: string;
  icon?: DualIcon;
  image?: string;
  label?: string;
  className?: ClassName;
}

type TooltipProps = {
  data: TooltipData[];
  refs: RefObject<HTMLDivElement>[];
};

export const TooltipNodes = ({ data, refs }: TooltipProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const motionProps = useMemo(() => ({
    initial: { opacity: 0, y: 20, scale: 0.6 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 160,
        // damping: 10,
      },
    },
    exit: { opacity: 0, y: 20, scale: 0.6 },
    style: {
      translateX: translateX,
      rotate: rotate,
      whiteSpace: "nowrap",
    },
  }), [translateX, rotate]);

  return (
    <>
      {data.map((item, idx) => (
        <div
          className="group relative cursor-pointer"
          key={`${item.value}_${idx}`}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                {...motionProps}
                className="absolute -left-36 -top-1.5 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-background">
                  {item.label}
                </div>
                <div className="text-xs text-white">{item.title}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={handleMouseMove}
            ref={refs[idx]}
            className={cn(
              "z-10 flex size-12 items-center justify-center rounded-full border-2 border-foreground/15 bg-background/10 p-3 text-foreground backdrop-blur-sm dark:bg-background/80",
              item.className,
            )}
          >
            {item.icon ? <item.icon className="h-6 w-6" /> : null}
          </div>
        </div>
      ))}
    </>
  );
};
