"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
}

export function Spacing({
  text,
  duration = 0.5,
  delayMultiple = 0.04,
  framerProps = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  },
  className,
}: GradualSpacingProps) {
  return (
    <div className="flex justify-start space-x-1">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.h1
            key={i}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={framerProps}
            transition={{ duration, delay: i * delayMultiple }}
            className={cn("-tracking-widest drop-shadow-sm", className)}
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}

export function Spaced(props: { text: string; bold?: boolean }) {
  return (
    <Spacing
      className={cn(
        "font-jet shrink-0 text-lg text-foreground/50 md:text-2xl xl:text-3xl",
        {
          "font-inst text-4xl font-extrabold text-primary md:text-5xl xl:text-6xl":
            props.bold,
        },
      )}
      text={props.text}
    />
  );
}
