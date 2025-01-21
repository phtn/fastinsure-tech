import { cn } from "@/lib/utils";
import { Screen } from "@/ui/screen";
import { type ClassName } from "../types";
import { NetworkIcon } from "lucide-react";
import { BentoCard, type BentoCardProps, BentoGrid } from "@/ui/bento";
import { ServerIcon } from "@heroicons/react/24/solid";

export const SupportTools = () => {
  return (
    <Screen>
      <Screen.Base>
        <Screen.Header dark>
          <Screen.Title>Support Tools</Screen.Title>
        </Screen.Header>
        <Blades />
        <Tools />
      </Screen.Base>
    </Screen>
  );
};

const Tools = () => {
  return (
    <div className="h-96 px-2 pt-12 md:px-16">
      <div className="h-full w-full">
        <BentoGrid className="h-full rounded-xl p-0.5 backdrop-blur-xl">
          {tools.map((tool) => (
            <BentoCard key={tool.title} {...tool} className="h-fit" />
          ))}
        </BentoGrid>
      </div>
    </div>
  );
};

const tools: BentoCardProps[] = [
  {
    icon: NetworkIcon,
    title: "Secure Server",
    description: "Robust API endpoints.",
    href: "/",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    icon: ServerIcon,
    title: "Real-time Database",
    description: "Remote monitoring enabled.",
    href: "/",
    cta: "Learn more",
    className: "lg:row-start-1 lg:row-end-1 lg:col-start-1 lg:col-end-1",
  },
];

const Blades = () => {
  return (
    <div className="relative flex h-72 w-full items-center justify-center">
      {blades.map((blade) => (
        <div key={blade.name} className="size group perspective-250">
          <div
            className={cn(
              "h-44 w-48 rounded-md bg-gradient-to-r drop-shadow-xl transition-all duration-700 ease-in-out transform-gpu",
              blade.className,
            )}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute h-80 w-[calc(100vw-220px)] rounded-sm border-0 border-primary-700/20" />
    </div>
  );
};

interface Blade {
  name: string;
  className: ClassName;
}
const blades: Blade[] = [
  {
    name: "one",
    className:
      "rotate-y-[5deg] group-hover:-rotate-y-[10deg] from-primary-400/40 via-primary-300/28 to-transparent",
  },
  {
    name: "two",
    className:
      "rotate-y-[15deg] group-hover:rotate-y-[0deg] from-primary-900/60 via-primary-300/32 to-transparent",
  },
  {
    name: "three",
    className:
      "rotate-y-[25deg] group-hover:rotate-y-[10deg] from-primary-500/40 via-primary-300/36 to-transparent",
  },
  {
    name: "four",
    className:
      "rotate-y-[40deg] group-hover:rotate-y-[20deg] from-primary-900/70 via-primary-300/40 to-transparent",
  },
  {
    name: "five",
    className:
      "rotate-y-[65deg] group-hover:rotate-y-[45deg] from-primary-500/50 via-primary-300/44 to-transparent",
  },
  {
    name: "six",
    className:
      "rotate-y-[80deg] group-hover:rotate-y-[60deg] from-primary-900/80 via-primary-300/40 to-transparent",
  },
  {
    name: "seven",
    className:
      "rotate-y-[100deg] group-hover:rotate-y-[80deg] from-primary-500/50 via-primary-300/36 to-transparent",
  },
  {
    name: "eight",
    className:
      "rotate-y-[135deg] group-hover:rotate-y-[110deg] from-primary-800/60 via-primary-300/32 to-transparent",
  },
  {
    name: "nine",
    className:
      "rotate-y-[160deg] group-hover:rotate-y-[125deg] from-primary-800/50 via-primary-300/28 to-transparent",
  },
];

/**
const BladesII = () => {
  return (
    <div className="relative flex h-96 w-full items-center justify-center">
      {blades.map((blade) => (
        <div key={blade.name} className="size group perspective-250">
          <div
            className={cn(
              "h-56 w-28 rounded-md bg-gradient-to-r drop-shadow-xl transition-all duration-700 ease-in-out transform-gpu",
              blade.className,
            )}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute h-96 w-[calc(100vw-220px)] rounded-xl border-3 border-primary-700/20" />
    </div>
  );
};
*/
