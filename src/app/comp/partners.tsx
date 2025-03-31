import { Marq } from "@/ui/marq";
import { Image } from "@nextui-org/react";
import { useCallback } from "react";
import { useThemeCtx } from "../ctx/theme";
import { HyperSpaced } from "@/ui/spacing";

export const Partners = () => {
  const { theme } = useThemeCtx();
  const Marquee = useCallback(
    () => (
      <Marq pauseOnHover>
        {partners.map((partner) => (
          <div key={partner.id} className="w-[calc(100vh*0.15)] md:w-[calc(100vh*0.3)] cursor-pointer">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="md:h-[calc(100vh*0.075)] h-[calc(100vh*0.05)] select-none rounded-none"
            />
          </div>
        ))}
      </Marq>
    ),
    [],
  );
  return (
    <div className="relative h-screen content-center md:my-24">
      <div className="absolute top-56 h-24 px-12">
      <HyperSpaced text="PARTNERS" />
      </div>
      <Marquee />

      <div className="pointer-events-none absolute top-0 flex h-full w-full items-center justify-end bg-gradient-to-r from-background/50 from-5% via-transparent via-15% to-transparent dark:from-background/50 dark:via-30%">
        <Image
          alt="back-wormhole"
          src="/svg/wormhole_back.svg"
          className="relative origin-right scale-75 -right-[48vw] md:-right-[28vw] z-10 w-auto aspect-square rounded-none h-[50vh]"
        />
        <Image
          alt="wormhole"
          src={
            theme === "light" ? "/svg/wormhole.svg" : "/svg/wormhole_dark.svg"
          }
          className="relative bottom-0 -right-0 z-[200] scale-75 origin-right aspect-square w-auto rounded-none h-[50vh]"
        />
        <div className="-rounded-l-md absolute top-1/4 right-0 origin-right z-[100] h-[50vh] w-[90px] scale-75 bg-gradient-to-r from-chalk/60 to-background backdrop-blur-sm md:bottom-12 md:w-[200px]" />
      </div>
    </div>
  );
};

interface Partner {
  id: number;
  name: string;
  logo: string;
  url: string;
}

const partners: Partner[] = [
  {
    id: 1,
    name: "AutoProtect",
    logo: "/svg/ap_logo.svg",
    url: "https://autoprotect.com.ph",
  },
  {
    id: 2,
    name: "GOPh",
    logo: "/svg/goph_logo.svg",
    url: "https://goph.com",
  },
  {
    id: 3,
    name: "Re-up Philippines",
    logo: "/svg/re-up_logo.svg",
    url: "https://re-up.ph",
  },
];
