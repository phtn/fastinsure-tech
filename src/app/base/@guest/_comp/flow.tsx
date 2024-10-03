import { type ReactNode, forwardRef, useRef } from "react";

import { cn } from "@/lib/utils";
import { BeamEffect } from "@/ui/beam";
import { Image } from "@nextui-org/react";
import {
  ServerStackIcon,
  BuildingStorefrontIcon,
  ChatBubbleLeftRightIcon,
  CircleStackIcon,
  CreditCardIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex size-12 items-center justify-center rounded-full border-2 border-foreground/15 bg-background/10 p-3 text-foreground backdrop-blur-sm dark:bg-background/80",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export function Flow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div className="mr-6 portrait:hidden">
      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center bg-background",
          className,
        )}
        ref={containerRef}
      >
        <div className="flex size-full max-w-lg flex-row justify-between">
          <div className="flex flex-col gap-2 xl:gap-6">
            <Circle ref={div1Ref} className="-ml-6 drop-shadow-sm">
              <Icons.ai />
            </Circle>
            <Circle ref={div2Ref}>
              <Icons.database />
            </Circle>
            <Circle ref={div3Ref} className="md:-ml-12 xl:-ml-16">
              <Icons.payments />
            </Circle>
            <Circle ref={div4Ref} className="-ml-4">
              <Icons.servers />
            </Circle>
            <Circle ref={div5Ref} className="-ml-12">
              <Icons.messaging />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div6Ref} className="size-20">
              <Icons.fastinsure />
            </Circle>
          </div>
          <div className="flex flex-col justify-center">
            <Circle ref={div7Ref}>
              <Icons.user />
            </Circle>
          </div>
        </div>

        <BeamEffect
          curvature={8}
          startXOffset={23}
          endXOffset={10}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
        />
        <BeamEffect
          curvature={0}
          startXOffset={24}
          endXOffset={0}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
        />
        <BeamEffect
          curvature={10}
          startXOffset={24}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
        />
        <BeamEffect
          curvature={0}
          startXOffset={24}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
        />
        <BeamEffect
          curvature={-6}
          startXOffset={24}
          endXOffset={10}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
        />
        <BeamEffect
          curvature={-30}
          startXOffset={0}
          endXOffset={5}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
        />
        <BeamEffect
          reverse
          curvature={30}
          startXOffset={5}
          endXOffset={-5}
          containerRef={containerRef}
          fromRef={div7Ref}
          toRef={div6Ref}
        />
      </div>
    </div>
  );
}

const Icons = {
  fastinsure: () => (
    <Image
      className="rounded-none"
      alt="http://www.w3.org/2000/svg"
      width={36}
      height={36}
      src="/svg/logo_dark.svg"
    />
  ),
  database: () => <CircleStackIcon />,
  messaging: () => <ChatBubbleLeftRightIcon />,
  payments: () => <CreditCardIcon />,
  servers: () => <ServerStackIcon />,
  ai: () => <SparklesIcon />,
  user: () => <BuildingStorefrontIcon />,
};
