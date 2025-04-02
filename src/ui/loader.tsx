"use client"

import { cn } from "@/lib/utils";
import { Atomic } from "./atomic";
import { type ClassName } from "@/app/types";
import { useEffect, useRef } from "react";
import anime from "animejs";
import { useDimension } from "@/utils/useDimension";

export function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}
export function LoaderSm() {
  return (
    <div className="flex size-48 items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}
export function LoaderMd() {
  return (
    <div className="flex h-96 w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
        <Atomic />
      </div>
    </div>
  );
}


interface TextLoaderProps {
  size?: number;
  container?: ClassName;
  color?: ClassName;
}

export const TextLoader = ({ size = 16, container, color }: TextLoaderProps) => {
  const containerRef = useRef(null);
  const { width } = useDimension(containerRef).dimensions;

  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const dotCount = dotsRef.current.length;

    const computeDelay = (i: number) =>
      Math.sin((i / dotCount) * Math.PI) * 300;
    // - size *-3 4 = 5 - (2 * 4) ==-3
    // - size *-1 3 = 5 - (2 * 3) ==-1
    // + size * 1 2 = 5 - (2 * 2) == 1
    // + size * 3 1 = 5 - (2 * 1) == 3
    // + size * 5 0 = 5 - (2 * 0) == 5
    const computeDist = (i: number) => width - (size * (2.65 * i)) / 2;

    const t = anime.timeline({
      targets: dotsRef.current,
      easing: "easeInOutExpo",
      direction: "alternate",
      duration: 1750,
      loop: true,
    });

    t.add({
      delay: (_, i) => computeDelay(i / 3),
      // translateX: 0,
      scale: 0.66,
    })
      .add({
        translateX: (_: undefined, i: number) => computeDist(i),
        delay: (_, i) => computeDelay(i),
        scale: 0,
      })
      .add({
        translateX: width * 0.25,
        delay: (_, i) => computeDelay(i / 3),
        scale: 0.66,
      });
  }, [width, size]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex h-4 w-24 justify-center overflow-hidden",
        container,
      )}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          ref={(ref) => {
            dotsRef.current[i] = ref;
          }}
          className={cn("leading-none text-xs text-macd-blue drop-shadow-xl", color)}
          style={{
            position: "absolute",
            transform: "translateY(-50%)",
            top: "50%",
            left: i * size,
            height: size,
            width: size,
          }}
        >
          ●
        </div>
      ))}
    </div>
  );
};
