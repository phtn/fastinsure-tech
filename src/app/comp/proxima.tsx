import { SynthGrid } from "@/ui/synth";
import { Image } from "@nextui-org/react";
import { JunoCraft } from "./scene";
// import { Model } from "./juno";

export function Proxima() {
  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-start justify-start overflow-clip">
        <div className="relative z-20 h-[calc(100vh/6)] w-full border-[0.33_px] px-4 xl:px-10"></div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-center justify-between px-8 font-inst text-xs leading-none text-foreground/60 xl:px-10">
          <div className="flex h-1/2 flex-col items-start justify-center space-y-4">
            <Image
              alt="fastinsure tech logo"
              src="/svg/f.svg"
              width={56}
              height={56}
            />
            <h2 className="font-jet font-medium opacity-80">
              FastInsure Technologies
            </h2>
          </div>
          <div className="flex h-full items-center space-x-4">
            <JunoCraft />
          </div>
        </div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-end justify-between px-4 py-4 font-inst text-xs leading-none text-foreground/60 xl:px-10">
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
