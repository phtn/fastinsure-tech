"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

import { cn } from "@/lib/utils";

interface HyperTextProps {
  text: string;
  duration?: number;
  framerProps?: Variants;
  className?: string;
  animateOnLoad?: boolean;
}

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(
  "",
);

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

export function HyperText({
  text,
  duration = 800,
  framerProps = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 3 },
  },
  className,
  animateOnLoad = true,
}: HyperTextProps) {
  const initialState = text.split("");
  const [displayText, setDisplayText] = useState<(string | undefined)[]>(
    initialState ?? [],
  );
  const [trigger, setTrigger] = useState(false);
  const iterations = useRef(0);
  const isFirstRender = useRef(true);

  const triggerAnimation = () => {
    iterations.current = 0;
    setTrigger(true);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        if (!animateOnLoad && isFirstRender.current) {
          clearInterval(interval);
          isFirstRender.current = false;
          return;
        }
        if (iterations.current < text.length) {
          const iterate = (t: string[]) =>
            t?.map((l, i) =>
              l === " "
                ? l
                : i <= iterations.current
                  ? text[i]
                  : alphabets[getRandomInt(26)],
            );
          const txt = iterate(text.split(""));
          setDisplayText(txt);
          iterations.current = iterations.current + 0.1;
        } else {
          setTrigger(false);
          clearInterval(interval);
        }
      },
      duration / (text.length * 10),
    );
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [text, duration, trigger, animateOnLoad]);

  return (
    <div
      className="flex overflow-hidden bg-transparent px-2"
      onMouseEnter={triggerAnimation}
    >
      <AnimatePresence mode="sync">
        {displayText?.map((letter, i) => (
          <motion.h1
            key={i}
            className={cn("font-jet", letter === " " ? "w-3" : "", className)}
            {...framerProps}
          >
            {letter?.toUpperCase()}
          </motion.h1>
        ))}
      </AnimatePresence>
    </div>
  );
}
