import { type ReactNode, type PropsWithChildren, useRef } from "react";
import { cn } from "@/lib/utils";
import { type ClassName } from "@/app/types";
import { Link } from "@nextui-org/react";
import { useInView } from "framer-motion";

interface TextProps {
  children: ReactNode;
  href?: string;
  className?: ClassName;
  dark?: boolean;
}

const Title = ({ children, href, className, dark = false }: TextProps) => (
  <Link href={href}>
    <h2
      className={cn(
        "font-inter text-lg font-medium leading-none tracking-tight",
        { "text-background": dark },
        className,
      )}
    >
      {children}
    </h2>
  </Link>
);
const Subtext = ({ children, className }: TextProps) => (
  <p className={cn("text-sm opacity-60", className)}>{children}</p>
);

interface HeaderProps {
  dark?: boolean;
  className?: ClassName;
  children?: ReactNode;
}
const HeaderComponent = ({ children, className, dark }: HeaderProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      className={cn(
        "flex h-[calc(100vh*0.125)] w-full items-center justify-center p-4 font-inst text-background md:h-[calc(100vh*0.1)] lg:grid-cols-2 xl:h-[calc(100vh*0.1)]",
        { "text-foreground": dark },
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col items-start justify-center px-2 opacity-0 transition-all duration-500 ease-out translate-y-12",
          { "opacity-100 translate-y-0": inView },
        )}
      >
        {children}
      </div>
    </div>
  );
};
type THeader = typeof HeaderComponent & {
  Title: typeof Title;
  Subtext: typeof Subtext;
};

export const Header: THeader = Object.assign(HeaderComponent, {
  Title,
  Subtext,
});

const Component = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-full flex-col items-center overflow-x-clip overflow-y-scroll xl:pb-0">
    {children}
  </div>
);

const PadSm = (props: { className?: ClassName }) => (
  <div className={cn(props.className ?? "h-[calc(100vh*0.075)]")} />
);
const PadLg = (props: { className?: ClassName }) => (
  <div className={cn(props.className ?? "h-[calc(100vh*0.1)]")} />
);

const Inverted = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[1.5rem] bg-foreground pb-10 xl:pb-0">
    {children}
  </div>
);
const Diffused = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full space-y-6 overflow-clip rounded-[1rem] bg-gradient-to-b from-foreground/10 to-transparent backdrop-blur-sm dark:bg-zinc-950 xl:pb-0">
    {children}
  </div>
);
const Base = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[2.5rem] bg-transparent pb-10 xl:pb-0">
    {children}
  </div>
);
const BaseII = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[1rem] bg-transparent pb-10 backdrop-blur-lg xl:pb-0">
    {children}
  </div>
);

interface FlexProps {
  children: ReactNode;
  relative?: boolean;
}
const Flex = ({ relative, children }: FlexProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div
      ref={ref}
      className={cn(
        "flex h-fit w-full items-center justify-evenly space-x-12 px-16",
        "&first:delay-200 &last:delay-500 opacity-0 drop-shadow-lg transition-all duration-500 ease-out translate-y-24",
        { "opacity-100 translate-y-0": inView },
        {
          relative: relative,
        },
      )}
    >
      {children}
    </div>
  );
};

type TScreen = typeof Component & {
  Header: typeof Header;
  Title: typeof Header.Title;
  Subtext: typeof Header.Subtext;
  PadSm: typeof PadSm;
  PadLg: typeof PadLg;
  Inverted: typeof Inverted;
  Diffused: typeof Diffused;
  Base: typeof Base;
  BaseII: typeof BaseII;
  Flex: typeof Flex;
};

export const Widget: TScreen = Object.assign(Component, {
  Header,
  Title,
  Subtext,
  PadSm,
  PadLg,
  Inverted,
  Diffused,
  Base,
  BaseII,
  Flex,
});
