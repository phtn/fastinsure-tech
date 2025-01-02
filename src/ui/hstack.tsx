import type { ClassName } from "@/app/types";
import { cn } from "@/lib/utils";
import { useInView } from "framer-motion";
import { useRef, type PropsWithChildren, type ReactNode } from "react";

interface HStackProps {
  children?: ReactNode;
  cols?: number;
  className?: ClassName;
}
export const HStackComponent = ({
  children,
  className,
  cols = 1,
}: HStackProps) => (
  <div
    className={cn(
      "grid h-fit w-full grid-cols-1",
      className,
      { "lg:grid-cols-6": cols === 6 },
      { "lg:grid-cols-5": cols === 5 },
      { "lg:grid-cols-4": cols === 4 },
      { "lg:grid-cols-3": cols === 3 },
      { "lg:grid-cols-2": cols === 2 },
    )}
  >
    {children}
  </div>
);

const XsCol = ({ children }: PropsWithChildren) => (
  <div className="bg-teal-300_ col-span-1 flex items-start justify-center overflow-hidden lg:size-72 xl:size-full">
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
        "h-full w-full text-background/80 opacity-0 transition-all delay-200 duration-500 ease-out translate-y-24 portrait:hidden",
        { "flex-col justify-start delay-300 lg:col-span-3": lg },
        { "opacity-100 translate-y-0": inView },
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
  XsCol: typeof XsCol;
  Col: typeof Col;
};
export const HStack: THStack = Object.assign(HStackComponent, {
  Title,
  SmCol,
  LgCol,
  XsCol,
  Col,
});

interface ColPropsII {
  lg?: boolean;
  children?: ReactNode;
  className?: ClassName;
}
const ColII = ({ children, lg = false, className }: ColPropsII) => {
  const ref = useRef<HTMLDivElement>(null);
  // const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={cn(
        "h-full w-full text-background/80 portrait:hidden",
        { "flex-col justify-start lg:col-span-3": lg },
        // { "translate-y-0 opacity-100": inView },
        className,
      )}
    >
      {children}
    </div>
  );
};

type THStackII = typeof HStackComponent & {
  Title: typeof Title;
  SmCol: typeof SmCol;
  LgCol: typeof LgCol;
  XsCol: typeof XsCol;
  ColII: typeof ColII;
};
export const HStackII: THStackII = Object.assign(HStackComponent, {
  Title,
  SmCol,
  LgCol,
  XsCol,
  ColII,
});
