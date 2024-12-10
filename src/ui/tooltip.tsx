"use client";
import type {
  RefObject,
  PropsWithChildren,
  ReactNode,
  ComponentRef,
  ComponentPropsWithoutRef,
} from "react";
import { forwardRef } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import type { ClassName, DualIcon, TextProps, UID } from "@/app/types";
import { cn } from "@/lib/utils";
import { useTooltip } from "@/app/ctx/tooltip";
import { guid } from "@/utils/helpers";

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
  refs: RefObject<HTMLDivElement | null>[];
};

export const TooltipNodes = ({ data, refs }: TooltipProps) => {
  const ctx = useTooltip();
  return (
    <>
      {data.map((item, idx) => (
        <div
          className="group relative cursor-pointer"
          key={`${item.value}_${idx}`}
          onMouseEnter={() => ctx?.setHoveredIndex(item.id)}
          onMouseLeave={() => ctx?.setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {ctx?.hoveredIndex === item.id && (
              <motion.div
                {...ctx?.motionProps}
                className="absolute -left-36 -top-1.5 z-50 flex flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl -translate-x-1/2 dark:border-[0.33px] dark:border-primary-300"
              >
                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
                <div className="relative z-30 text-base font-bold text-background dark:text-foreground">
                  {item.label}
                </div>
                <div className="text-xs text-white">{item.title}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <div
            onMouseMove={ctx?.mouseMoveFn}
            ref={refs[idx]}
            className={cn(
              "z-10 flex size-12 items-center justify-center rounded-full border-2 border-foreground/15 bg-background/10 p-3 text-foreground backdrop-blur-sm dark:border dark:border-foreground/60 dark:bg-background/80 dark:text-foreground/80",
              item.className,
            )}
          >
            {item.icon ? <item.icon className="size-6" /> : null}
          </div>
        </div>
      ))}
    </>
  );
};

const TooltipComponent = ({ children }: PropsWithChildren) => {
  const { setHoveredIndex } = useTooltip();
  const id = guid();
  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHoveredIndex(id)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {children}
    </div>
  );
};

const Title = ({ children, className }: TextProps) => (
  <div
    className={cn(
      "relative z-30 text-base font-bold text-background dark:text-foreground",
      className,
    )}
  >
    {children}
  </div>
);
const Label = ({ children, className }: TextProps) => (
  <div className={cn("text-xs text-white", className)}>{children}</div>
);

interface AnimatedProps {
  id: UID;
  hoveredIndex: UID;
  motionProps: MotionProps;
  children: ReactNode;
}
const Animated = ({
  id,
  hoveredIndex,
  motionProps,
  children,
}: AnimatedProps) => (
  <AnimatePresence mode="popLayout">
    {hoveredIndex === id && (
      <motion.div
        {...motionProps}
        className="absolute top-2 z-[310] flex flex-col items-center justify-center rounded-md bg-foreground dark:border-[0.33px] dark:border-primary-300"
      >
        <div className="absolute z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-primary-200 to-transparent" />
        <div className="absolute left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-primary-500 to-transparent" />
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

type TTooltip = typeof TooltipComponent & {
  Animated: typeof Animated;
  Title: typeof Title;
  Label: typeof Label;
};

export const Tooltip: TTooltip = Object.assign(TooltipComponent, {
  Animated,
  Title,
  Label,
});

export const TooltipContent = forwardRef<
  ComponentRef<typeof TooltipPrimitive.Content>,
  ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground",
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

type TheTipProps = {
  content: string | ReactNode;
  children: ReactNode;
};

export const TheTip = ({ content, children }: TheTipProps) => {
  return (
    <Tooltip>
      {children}
      <TooltipContent side="right" sideOffset={4}>
        <div className="rounded-md rounded-bl-none bg-void px-2 py-1 text-xs text-blue-100">
          {content}
        </div>
      </TooltipContent>
    </Tooltip>
  );
};

export const TooltipTrigger = TooltipPrimitive.Trigger;
