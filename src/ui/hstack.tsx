import type { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef, type PropsWithChildren, type ReactNode } from "react";

export const HStackComponent = ({ children }: PropsWithChildren) => (
  <div className="_h-[calc(100vh*0.675-8px)] grid h-fit w-full grid-cols-1 lg:grid-cols-5 xl:h-[calc(100vh*0.75-8px)]">
    {children}
  </div>
);

const SmCol = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-full items-start justify-center lg:col-span-2">
    {children}
  </div>
);

const LgCol = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full px-6 text-background/80 lg:col-span-3 xl:pr-20 portrait:hidden">
    {children}
  </div>
);

interface ColProps {
  lg?: boolean;
  children?: ReactNode;
  className?: ClassName;
}
const Col = ({ children, lg = false, className }: ColProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full translate-y-24 items-start justify-center px-6 text-background/80 opacity-0 transition-all delay-200 duration-500 ease-out lg:col-span-2 portrait:hidden",
        { "flex-col justify-start delay-300 lg:col-span-3 xl:pr-20": lg },
        { "translate-y-0 opacity-100": inView },
        className,
      )}
    >
      {children}
    </div>
  );
};

const Title = ({ children }: PropsWithChildren) => (
  <div className="py-2 font-inst text-2xl font-medium opacity-90 xl:py-6">
    {children}
  </div>
);

type THStack = typeof HStackComponent & {
  Title: typeof Title;
  SmCol: typeof SmCol;
  LgCol: typeof LgCol;
  Col: typeof Col;
};
export const HStack: THStack = Object.assign(HStackComponent, {
  Title,
  SmCol,
  LgCol,
  Col,
});
