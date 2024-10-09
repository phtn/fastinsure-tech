import { cn } from "@/lib/utils";
import { memo, type CSSProperties } from "react";

interface GridProps {
  className?: string;
  angle?: number;
}
export function Grid({ className, angle }: GridProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute size-full overflow-hidden opacity-50 [perspective:200px]",
        className,
      )}
      style={{ "--grid-angle": `${angle ?? 65}deg` } as CSSProperties}
    >
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(var(--grid-angle))]">
        <div
          className={cn(
            "animate-grid",

            "overflow-clip [background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.1)_0.5px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_0.5px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_0.5px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0" />
    </div>
  );
}

export const SynthGrid = memo((props: GridProps) => <Grid {...props} />);
SynthGrid.displayName = "SynthGrid";
