import { cn } from "@/lib/utils";
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
            src="/images/dash.png"
            className={cn("h-fit w-auto grayscale")}
          />
          <Iphone15Pro className={cn("h-fit grayscale")} src="/images/f.png" />
        </Screen.Flex>
      </Screen.Base>
    </Screen>
  );
};

export const Platform = () => (
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
    </div>
  </div>
);
