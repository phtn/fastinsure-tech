import { SynthGrid } from "@/ui/synth";
import { Image } from "@nextui-org/react";
import { Scene } from "./three/scene";
import { useThemeCtx } from "../ctx/theme";
import { FlexRow } from "@/ui/flex";

export function Proxima() {
  const { theme } = useThemeCtx();

  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-start justify-start overflow-clip">
        <div className="relative z-20 h-[calc(100vh/6)] w-full border-[0.33_px] px-4 xl:px-10"></div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-center justify-between md:px-8 px-6 font-inst text-xs leading-none text-icon dark:text-icon-dark xl:px-10">
          <div className="flex h-1/2 w-full flex-col items-start justify-center space-y-6">
            <FlexRow className="items-center">
              <Image
                alt="fastinsure tech logo"
                src={theme === "light" ? "/svg/logo_dark.svg" : "/svg/f.svg"}
                width={0}
                height={0}
                className="size-8 rounded-none"
              />
              <div className="-space-y-0.5 text-lg leading-none">
                <h2 className="text-normal font-semibold -tracking-wide text-primary dark:text-icon-dark">
                  FastInsure
                </h2>
                <h2 className="text-normal -tracking-wider font-light text-primary dark:text-icon-dark">
                  Technologies
                </h2>
              </div>
            </FlexRow>
          </div>

          <div className="flex w-full items-center justify-center"></div>
        </div>
        <div className="flex h-full w-full items-end space-x-4">
          <Scene />
        </div>
        <div className="relative z-20 flex h-[calc(100vh/4)] w-full items-end px-4 py-4 justify-between font-inst text-xs leading-none text-icon dark:text-icon-dark xl:px-10">
          <div className="flex h-1/3 items-end space-x-4">
            <p className="">
              FastInsure Technologies &copy; {new Date().getFullYear()}
            </p>
          </div>
          <p className="opacity-50">&middot;</p>
          <div className="flex h-1/2 items-end space-x-4">
            <p className="">Privacy</p>
            <p className="opacity-50">&middot;</p>
            <p className="">Terms</p>
          </div>
        </div>
        <SynthGrid />
      </div>
    </div>
  );
}
