import { Marq } from "@/ui/marq";
import { Spaced } from "@/ui/spacing";
import { guid } from "@/utils/helpers";
import { Button, Image } from "@nextui-org/react";
import { memo } from "react";
import { Flow } from "./flow";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

const Header = () => (
  <div className="flex h-[calc(100vh*0.1)] w-full items-center space-x-4 pl-6 md:pl-14 xl:pl-20">
    <div className="flex size-[24px] items-center justify-center rounded-full border-1 border-primary/40 xl:size-[32px]">
      <Image
        alt=""
        src="/svg/logo_dark.svg"
        className="size-[12px] rounded-none xl:size-[16px]"
      />
    </div>
    <h1 className="font-jet font-medium tracking-tight text-foreground drop-shadow-lg xl:text-lg">
      FastInsure Technologies
    </h1>
  </div>
);

const Jumbotron = () => (
  <div className="relative ml-6 h-full w-full content-center space-y-12 md:ml-14 xl:ml-20">
    <div>
      <Spaced text="TECH DRIVEN" />
      <Spaced bold text="Business" />
      <Spaced bold text="Engineering" />
    </div>
    <div>
      <Button
        size="lg"
        radius="full"
        variant="shadow"
        color="primary"
        className=""
        onPress={() => console.log(guid())}
      >
        <div className="pr-4">Get Started</div>
        <div className="-mr-3.5 flex size-8 items-center justify-center rounded-full bg-background">
          <ChevronRightIcon className="size-3 text-foreground" />
        </div>
      </Button>
    </div>
  </div>
);

const Hero = memo(() => (
  <div className="grid h-[calc(100vh*0.6)] grid-cols-1 content-center md:h-[calc(100vh*0.8)] lg:grid-cols-2 xl:h-[calc(100vh*0.7)]">
    <Jumbotron />
    <Flow />
  </div>
));
Hero.displayName = "Hero";

const Partners = () => (
  <div className="h-[calc(100vh*0.3)] content-center xl:h-[calc(100vh*0.20)]">
    <Marq pauseOnHover>
      {partners.map((partner) => (
        <div key={partner.id} className="w-[calc(100vh*0.2)] opacity-40">
          <Image
            src={partner.logo}
            alt={partner.name}
            className="h-[calc(100vh*0.05)] rounded-none grayscale"
          />
        </div>
      ))}
    </Marq>
  </div>
);

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

export const Alpha = () => (
  <div className="h-fit md:h-full">
    <Header />
    <Hero />
    <Partners />
  </div>
);
