import { SynthGrid } from "@/ui/synth";

export function Proxima() {
  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center bg-foreground">
      <div className="relative flex h-full w-full flex-col items-center justify-start overflow-clip bg-foreground">
        <div className="relative z-20 h-[200px] w-full bg-foreground">yo</div>
        <span className="pointer-events-none z-10 whitespace-pre-wrap bg-gradient-to-b from-[#ffd319] via-[#ff2975] to-[#8c1eff] bg-clip-text text-center text-7xl font-bold leading-none tracking-tighter text-transparent">
          SynthGrid
        </span>

        <SynthGrid />
      </div>
    </div>
  );
}
