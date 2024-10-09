import { Marq } from "@/ui/marq";
import { Image } from "@nextui-org/react";
import { useCallback } from "react";
import { useThemeCtx } from "../ctx/theme";

export const Partners = () => {
  const { theme } = useThemeCtx();
  const Marquee = useCallback(
    () => (
      <Marq pauseOnHover>
        {partners.map((partner) => (
          <div key={partner.id} className="w-[calc(100vh*0.3)] cursor-pointer">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="h-[calc(100vh*0.075)] rounded-none"
            />
          </div>
        ))}
      </Marq>
    ),
    [],
  );
  return (
    <div className="relative my-24 h-[calc(100vh*0.3)] content-center bg-background xl:h-[calc(100vh*0.5)]">
      <Marquee />

      <div className="pointer-events-none absolute top-0 flex h-[calc(100vh*0.5)] w-full items-center justify-end bg-gradient-to-r from-background/50 from-5% via-transparent via-15% to-transparent dark:from-background/50 dark:via-30% xl:h-[calc(100vh*0.40)]">
        <Image
          alt="wormhole"
          src="/svg/wormhole_back.svg"
          className="relative -bottom-12 -right-[28.98vw] z-0 aspect-square w-auto rounded-none xl:h-[calc(100vh*0.5)]"
        />
        <Image
          alt="wormhole"
          src={
            theme === "light" ? "/svg/wormhole.svg" : "/svg/wormhole_dark.svg"
          }
          className="relative -bottom-12 right-0 z-[200] aspect-square w-auto rounded-none xl:h-[calc(100vh*0.5)]"
        />
        <div className="-rounded-l-md absolute bottom-12 right-0 z-[100] h-[calc(100vh*0.17)] w-[200px] bg-gradient-to-r from-background/90 to-background backdrop-blur-sm" />
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
