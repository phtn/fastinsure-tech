"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";

interface GradualSpacingProps {
  text: string;
  duration?: number;
  delayMultiple?: number;
  framerProps?: Variants;
  className?: string;
  bold?: boolean;
}

export const Spacing = memo(
  ({
    text,
    duration = 0.5,
    delayMultiple = 0.04,
    framerProps = {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 },
    },
    className,
    bold,
  }: GradualSpacingProps) => {
    // Preprocess the text into an array of characters with their respective delays
    const characters = useMemo(
      () =>
        text.split("").map((char, i) => ({
          char,
          delay: i * delayMultiple,
        })),
      [text, delayMultiple]
    );

    return (
      <div className="flex justify-start space-x-1">
        <AnimatePresence>
          {characters.map(({ char, delay }, i) => (
            <motion.h1
              key={i}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={framerProps}
              transition={{ duration, delay }}
              className={cn(
                "flex-shrink-0 font-jet text-lg text-foreground/50 drop-shadow-sm md:text-xl md:-tracking-[5px] xl:text-3xl xl:-tracking-widest",
                {
                  "font-inst text-5xl font-extrabold text-primary md:text-4xl xl:text-6xl portrait:tracking-[-6px]":
                    bold,
                },
                className,
              )}
            >
              {char === " " ? <span>&nbsp;</span> : char}
            </motion.h1>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);
Spacing.displayName = "Spacing";

export const Spaced = memo((props: { text: string; bold?: boolean }) => {
  return (
    <Spacing
      className={cn(
        "flex-shrink-0 font-jet text-lg text-foreground/50 md:text-xl xl:text-3xl",
        {
          "": props.bold,
        },
      )}
      text={props.text}
    />
  );
});
Spaced.displayName = "Spaced";
