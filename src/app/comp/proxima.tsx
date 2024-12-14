import { SynthGrid } from "@/ui/synth";
import { Image } from "@nextui-org/react";
import { Scene } from "./three/scene";
import { useThemeCtx } from "../ctx/theme";
import {
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { FlexRow } from "@/ui/flex";

export function Proxima() {
  const { theme } = useThemeCtx();

  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-start justify-start overflow-clip">
        <div className="relative z-20 h-[calc(100vh/6)] w-full border-[0.33_px] px-4 xl:px-10"></div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-center justify-between px-8 font-inst text-xs leading-none text-icon dark:text-icon-dark xl:px-10">
          <div className="flex h-1/2 w-full flex-col items-start justify-center space-y-6">
            <FlexRow className="items-end">
              <Image
                alt="fastinsure tech logo"
                src={theme === "light" ? "/svg/logo_dark.svg" : "/svg/f.svg"}
                width={42}
                height={42}
                className="rounded-none"
              />
              <div className="space-y-1 text-lg leading-none">
                <h2 className="text-normal font-inst font-bold text-icon dark:text-icon-dark">
                  FastInsure
                </h2>
                <h2 className="text-normal font-inst font-bold text-icon dark:text-icon-dark">
                  Technologies
                </h2>
              </div>
            </FlexRow>

            <section className="flex items-start justify-around space-x-4 px-2 pt-2 text-xs text-icon dark:text-icon-dark">
              <div className="h-full p-1">
                <MapPinIcon className="size-3 text-icon drop-shadow-md dark:text-icon-dark" />
              </div>
              <div className="space-y-0.5 font-inst">
                <p>Level 24 PSE Tower</p>
                <p>One Bonifacio High Street,</p>
                <p>Taguig, Metro Manila 1634</p>
              </div>
            </section>

            <section className="flex items-start space-x-4 px-2 pt-2 text-xs text-icon dark:text-icon-dark">
              <div className="h-full p-1">
                <ChatBubbleBottomCenterTextIcon className="size-3" />
              </div>
              <div>
                <p>hq@fastinsure.tech</p>
                <p>+63 915 698 4277</p>
              </div>
            </section>
          </div>
          <div className="flex h-full w-full items-end space-x-4">
            <Scene />
          </div>
          <div className="flex w-full items-center justify-center"></div>
        </div>

        <div className="relative z-20 flex h-[calc(100vh/4)] w-full items-end space-x-4 px-4 py-4 font-inst text-xs leading-none text-icon dark:text-icon-dark xl:px-10">
          <div className="flex h-1/3 items-end space-x-4">
            <p className="">
              FastInsure Technologies, Inc. &copy; {new Date().getFullYear()}
            </p>
          </div>
          <p className="opacity-50">⏺</p>
          <div className="flex h-1/2 items-end space-x-4">
            <p className="">Privacy</p>
            <p className="opacity-50">⏺</p>
            <p className="">Terms</p>
          </div>
        </div>
        <SynthGrid />
      </div>
    </div>
  );
}
