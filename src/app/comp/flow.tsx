import { type ReactNode, forwardRef, useRef, useMemo } from "react";
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
import React from "react";

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

// Memoize BeamEffect to prevent unnecessary re-renders
const MemoizedBeamEffect = React.memo(BeamEffect);

export function Flow({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  // Use useMemo to ensure refs array is stable
  const refs = useMemo(() => [div1Ref, div2Ref, div3Ref, div4Ref, div5Ref], []);

  // Use useMemo to ensure tooltipNodes is stable
  const memoizedTooltipNodes = useMemo(() => tooltipNodes, []);

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
            <MemoizedTooltipNodes data={memoizedTooltipNodes} refs={refs} />
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

        <MemoizedBeamEffect
          curvature={8}
          startXOffset={23}
          endXOffset={10}
          containerRef={containerRef}
          fromRef={div1Ref}
          toRef={div6Ref}
        />
        <MemoizedBeamEffect
          curvature={0}
          startXOffset={24}
          endXOffset={0}
          containerRef={containerRef}
          fromRef={div2Ref}
          toRef={div6Ref}
        />
        <MemoizedBeamEffect
          curvature={10}
          startXOffset={24}
          containerRef={containerRef}
          fromRef={div3Ref}
          toRef={div6Ref}
        />
        <MemoizedBeamEffect
          curvature={0}
          startXOffset={24}
          containerRef={containerRef}
          fromRef={div4Ref}
          toRef={div6Ref}
        />
        <MemoizedBeamEffect
          curvature={-6}
          startXOffset={24}
          endXOffset={10}
          containerRef={containerRef}
          fromRef={div5Ref}
          toRef={div6Ref}
        />
        <MemoizedBeamEffect
          curvature={-30}
          startXOffset={0}
          endXOffset={5}
          containerRef={containerRef}
          fromRef={div6Ref}
          toRef={div7Ref}
        />
        <MemoizedBeamEffect
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

// Ensure MemoizedTooltipNodes is properly memoized
const MemoizedTooltipNodes = React.memo(TooltipNodes);

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
    title: "Fast & Reliable Database",
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
    label: "Finance",
    className: "md:-ml-12 xl:-ml-16",
  },
  {
    id: 4,
    title: "Trusted Performance",
    value: "secure servers",
    icon: ServerStackIcon,
    image: "/svg/logo_dark.svg",
    label: "Secure Servers",
    className: "-ml-4",
  },
  {
    id: 5,
    title: "For Teams & Support",
    value: "messaging",
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
