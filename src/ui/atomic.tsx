import { memo, type CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface AtomicProps {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
  className?: string;
}

export const Atomic = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 8,
  className,
}: AtomicProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-background/5 [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className,
      )}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.05;
        const animationDelay = `${i * 0.06}s`;
        const borderStyle = i === numCircles - 1 ? "dashed" : "solid";
        const borderOpacity = 5 + i * 5;

        return (
          <div
            key={i}
            className={`animate-ripple absolute rounded-full border-[0.33px] border-primary-100 bg-foreground/25 [--i:${i}]`}
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle,
                borderWidth: "0.33px",
                borderColor: `hsl(var(--foreground), ${borderOpacity / 20})`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Atomic.displayName = "Atomic";
