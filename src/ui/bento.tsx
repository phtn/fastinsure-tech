import { type ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { ClassName, DualIcon } from "@/app/types";
import { Button, Link } from "@nextui-org/react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-8 p-2",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface BentoCardProps {
  title: string;
  className: ClassName;
  background?: string;
  icon: DualIcon;
  description: string;
  href: string;
  cta: string;
}

const BentoCard = (props: BentoCardProps) => {
  const { title, className, description, href, cta } = props;
  return (
    <div
      key={title}
      className={cn(
        "group relative col-span-1 flex cursor-pointer flex-col justify-between overflow-hidden rounded-md font-inst backdrop-blur-xl",
        // light styles
        "bg-foreground text-background",
        // dark styles
        "transform-gpu dark:bg-black/50 dark:text-foreground",
        className,
      )}
    >
      <div className="pointer-events-none z-10 flex flex-col gap-1.5 p-6 transition-all duration-300 transform-gpu group-hover:-translate-y-10">
        <props.icon className="size-8 origin-center opacity-50 transition-transform duration-300 ease-in-out transform-gpu group-hover:scale-0" />
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="max-w-lg text-sm font-light opacity-60">
            {description}
          </p>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute bottom-0 flex w-full flex-row items-center p-4 opacity-0 transition-all duration-300 translate-y-10 transform-gpu group-hover:opacity-100 group-hover:translate-y-0",
        )}
      >
        <Button
          color="primary"
          as={Link}
          size="sm"
          className="pointer-events-auto mx-2 text-sm tracking-tight text-background"
          href={href}
        >
          {cta}
          <ArrowRightIcon className="ml-2 size-4 text-background" />
        </Button>
      </div>

      <div className="pointer-events-none absolute inset-0 transition-all duration-300 transform-gpu group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
};

export { BentoCard, BentoGrid };