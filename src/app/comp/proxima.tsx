import { SynthGrid } from "@/ui/synth";
import { Image } from "@nextui-org/react";

export function Proxima() {
  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center bg-foreground">
      <div className="relative flex h-full w-full flex-col items-center justify-start overflow-clip bg-foreground">
        <div className="relative z-20 h-[200px] w-full bg-foreground px-4 text-background xl:px-10">
          <div className="flex h-1/2 items-end space-x-4">
            <Image
              alt="fastinsure tech logo"
              src="/svg/f.svg"
              width={56}
              height={56}
            />
          </div>
          <div className="flex h-1/2 items-center space-x-4">
            <h2 className="font-jet font-medium opacity-80">
              FastInsure Technologies
            </h2>
          </div>
        </div>

        <div className="relative z-20 flex h-[200px] w-full items-end justify-between px-4 font-inst text-xs leading-none text-background/60 xl:px-10">
          <div className="flex h-1/2 items-end space-x-4">
            <p className="">
              FastInsure Technologies, Inc. All rights reserved &copy;{" "}
              {new Date().getFullYear()}
            </p>
          </div>
          <div className="flex h-1/2 items-end space-x-4">
            <p className="">Privacy</p>
            <p className="font-black">&middot;</p>
            <p className="">Terms</p>
          </div>
        </div>
        <SynthGrid />
      </div>
    </div>
  );
}
