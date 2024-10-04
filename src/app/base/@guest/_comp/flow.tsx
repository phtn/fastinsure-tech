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
import { type ClassName } from "@/app/types";
import { type TooltipData, TooltipNodes } from "@/ui/tooltip";

interface NodeProps {
  className?: ClassName;
  children?: ReactNode;
}
const Node = forwardRef<HTMLDivElement, NodeProps>(
  ({ className, children }, ref) => {
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
  },
);

Node.displayName = "Node";

export function Flow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  const refs = [div1Ref, div2Ref, div3Ref, div4Ref, div5Ref];

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
            <TooltipNodes data={tooltipNodes} refs={refs} />
          </div>
          <div className="flex flex-col justify-center">
            <Node ref={div6Ref} className="size-20">
              <Icons.fastinsure />
            </Node>
          </div>
          <div className="flex flex-col justify-center">
            <Node ref={div7Ref}>
              <Icons.user />
            </Node>
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

const tooltipNodes: TooltipData[] = [
  {
    id: 1,
    title: "Include AI to Services",
    value: "ai",
    icon: SparklesIcon,
    image: "/svg/logo_dark.svg",
    label: "AI Integration",
    className: "-ml-6 drop-shadow-sm",
  },
  {
    id: 2,
    title: "Fast Transation Speeds",
    value: "database",
    icon: CircleStackIcon,
    image: "/svg/logo_dark.svg",
    label: "Realtime Database",
  },
  {
    id: 3,
    title: "Accept Payments",
    value: "payments",
    icon: CreditCardIcon,
    image: "/svg/logo_dark.svg",
    label: "Payments",
    className: "md:-ml-12 xl:-ml-16",
  },
  {
    id: 4,
    title: "Secured Data Processing",
    value: "Servers",
    icon: ServerStackIcon,
    image: "/svg/logo_dark.svg",
    label: "Cloud Servers",
    className: "-ml-4",
  },
  {
    id: 5,
    title: "Messaging",
    value: "Chat Support",
    icon: ChatBubbleLeftRightIcon,
    label: "Messaging",
    className: "-ml-12",
  },
];

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
