import { cn } from "@/lib/utils";
import { HyperText } from "@/ui/hypertext";
import { Iphone15Pro } from "@/ui/iphone";
import { Safari } from "@/ui/safari";
import { Screen } from "@/ui/screen";
import { Image } from "@nextui-org/react";

export const Features = () => {
  return (
    <Screen>
      <Screen.Base>
        <Screen.Header dark>
          <Screen.Title>Multi-platform Applications</Screen.Title>
          <Screen.Subtext>
            Work seemlessly through different devices and platforms.
          </Screen.Subtext>
        </Screen.Header>
        <Screen.Flex relative>
          <Safari
            url="https://fastinsure.dev"
            src="/images/w.webp"
            className={cn("h-fit w-auto")}
          />
          <Iphone15Pro className={cn("h-fit")} src="/images/w.webp" />

          <div className="left-1/10 group absolute bottom-0 flex h-2/3 w-2/3 flex-col items-center justify-center overflow-hidden rounded-t-[4rem] bg-gradient-to-t from-background/10 from-5% to-foreground to-75% drop-shadow backdrop-blur-xl">
            <div>
              <div className="max-w-[20ch] text-center font-inst text-6xl font-extrabold text-background/80">
                We build solutions across multiple platforms.
              </div>
              <div className="absolute flex h-[100px] w-full items-center justify-between">
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
                <Image
                  alt=""
                  src={"/svg/logo_dark.svg"}
                  className="size-6 rounded-none"
                />
              </div>
              <div className="flex h-[200px] w-full translate-y-[200px] items-center justify-center opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                <div className="flex w-full items-center justify-between text-center font-inst text-lg font-semibold lowercase text-background/80">
                  <HyperText text="linux" />
                  <HyperText text="macOS" />
                  <HyperText text="windows" />
                  <HyperText text="android" />
                  <HyperText text="iphone" />
                  <HyperText text="huawei" />
                  <HyperText text="chrome" />
                  <HyperText text="safari" />
                </div>
              </div>
            </div>
          </div>
        </Screen.Flex>
      </Screen.Base>
    </Screen>
  );
};
