import { Marq } from "@/ui/marq";
import { Image } from "@nextui-org/react";
import { useCallback } from "react";

export const Reviews = () => {
  const Marquee = useCallback(
    () => (
      <Marq pauseOnHover reverse>
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="w-[calc(100vh*0.2)] cursor-pointer opacity-40"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              className="h-[calc(100vh*0.05)] rounded-none"
            />
          </div>
        ))}
      </Marq>
    ),
    [],
  );
  return (
    <div className="relative h-[calc(100vh*0.3)] content-center xl:h-[calc(100vh*0.40)]">
      <Marquee />
      <div className="pointer-events-none absolute top-0 z-[200] h-[calc(100vh*0.3)] w-full bg-gradient-to-r from-background from-5% via-transparent to-background to-90% xl:h-[calc(100vh*0.40)]"></div>
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
