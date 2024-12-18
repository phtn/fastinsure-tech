"use client";

import type {
  MouseEvent,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { useState, useMemo, createContext, useContext } from "react";
import {
  useTransform,
  useMotionValue,
  useSpring,
  type MotionProps,
} from "framer-motion";
import type { ClassName, DualIcon, UID } from "@/app/types";

export interface TooltipData {
  id: number;
  title: string;
  value: string;
  icon?: DualIcon;
  image?: string;
  label?: string;
  className?: ClassName;
}

interface TooltipCtxValues {
  hoveredIndex: UID;
  setHoveredIndex: Dispatch<SetStateAction<UID>>;
  mouseMoveFn: (e: MouseEvent<HTMLDivElement>) => void;
  motionProps: MotionProps;
  motionPropsII: MotionProps;
}
const TooltipCtx = createContext<TooltipCtxValues | null>(null);

export const TooltipProvider = ({ children }: PropsWithChildren) => {
  const [hoveredIndex, setHoveredIndex] = useState<UID>(null);

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

  const motionProps = useMemo(
    () => ({
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
    }),
    [translateX, rotate],
  );

  const motionPropsII = useMemo(
    () =>
      ({
        initial: { opacity: 0, y: -36 },
        animate: {
          opacity: 1,
          y: -26,
          transition: {
            stiffness: 100,
            duration: 0.2,
          },
        },
        exit: { opacity: 0, y: -36 },
        style: {
          whiteSpace: "nowrap",
        },
      }) as MotionProps,
    [],
  );

  return (
    <TooltipCtx
      value={{
        motionProps,
        hoveredIndex,
        motionPropsII,
        setHoveredIndex,
        mouseMoveFn: handleMouseMove,
      }}
    >
      {children}
    </TooltipCtx>
  );
};

export const useTooltip = () => {
  const context = useContext(TooltipCtx);
  if (!context) throw new Error("No tooltip ctx");
  return context;
};
