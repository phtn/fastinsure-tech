import { SynthGrid } from "@/ui/synth";
import { Image } from "@nextui-org/react";
import { Scene } from "./three/scene";
import { useThemeCtx } from "../ctx/theme";
import {
  ChatBubbleBottomCenterTextIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";

export function Proxima() {
  const { theme } = useThemeCtx();

  return (
    <div className="flex h-[calc(100vh/2)] w-full items-center justify-center">
      <div className="relative flex h-full w-full flex-col items-start justify-start overflow-clip">
        <div className="relative z-20 h-[calc(100vh/6)] w-full border-[0.33_px] px-4 xl:px-10"></div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-center justify-between px-8 font-inst text-xs leading-none text-foreground/60 xl:px-10">
          <div className="flex h-1/2 w-full flex-col items-start justify-center space-y-4">
            <Image
              alt="fastinsure tech logo"
              src={theme === "light" ? "/svg/logo_dark.svg" : "/svg/f.svg"}
              width={56}
              height={56}
              className="rounded-none"
            />
            <h2 className="font-jet font-medium">FastInsure Technologies</h2>
            <section className="flex space-x-1.5 text-xs font-light opacity-80">
              <MapPinIcon className="size-4 stroke-1" />
              <div>
                <address>Level 24 PSE Tower</address>
                <address>One Bonifacio High Street,</address>
                <address>Taguig, Metro Manila 1634</address>
              </div>
            </section>
            <section className="flex space-x-1.5 text-xs font-light opacity-80">
              <ChatBubbleBottomCenterTextIcon className="size-4 stroke-1" />
              <div>
                <address>hq@fastinsure.tech</address>
                <address>+63 915 698 4277</address>
              </div>
            </section>
          </div>
          <div className="flex h-full w-full items-end space-x-4">
            <Scene />
          </div>
          <div className="flex w-full items-center justify-center"></div>
        </div>

        <div className="relative z-20 flex h-[calc(100vh/6)] w-full items-end justify-between px-4 py-4 font-inst text-xs leading-none text-foreground/60 xl:px-10">
          <div className="flex h-1/2 items-end space-x-4">
            <p className="">
              FastInsure Technologies, Inc. &copy; {new Date().getFullYear()}
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
