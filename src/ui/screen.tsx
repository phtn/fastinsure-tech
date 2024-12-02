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

const Component = ({ children }: PropsWithChildren) => (
  <div className="relative flex h-full w-full flex-col items-center overflow-y-auto overflow-x-clip bg-background md:px-8 xl:h-screen">
    {children}
  </div>
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
        "flex w-full items-center justify-center p-4 font-inst text-background lg:grid-cols-2 xl:h-[calc(100vh*0.15)] xl:p-12",
        { "text-foreground": dark },
        className,
      )}
    >
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col items-start justify-center px-6 opacity-0 transition-all duration-500 ease-out -translate-y-12 xl:px-12",
          { "opacity-100 translate-y-0": inView },
        )}
      >
        {children}
      </div>
    </div>
  );
};

const Title = ({ children, href, className, dark = false }: TextProps) => (
  <Link href={href}>
    <h2
      className={cn(
        "font-inst text-2xl font-semibold tracking-tight md:text-xl xl:text-3xl",
        { "text-background": dark },
        className,
      )}
    >
      {children}
    </h2>
  </Link>
);
const Subtext = ({ children, className }: TextProps) => (
  <p className={cn("opacity-60", className)}>{children}</p>
);

type THeader = typeof HeaderComponent & {
  Title: typeof Title;
  Subtext: typeof Subtext;
};

export const Header: THeader = Object.assign(HeaderComponent, {
  Title,
  Subtext,
});

const PadSm = (props: { className?: ClassName }) => (
  <div className={cn(props.className ?? "h-[calc(100vh*0.075)]")} />
);
const PadLg = (props: { className?: ClassName }) => (
  <div className={cn(props.className ?? "h-[calc(100vh*0.1)]")} />
);

const Inverted = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[2rem] bg-foreground pb-10 xl:pb-0">
    {children}
  </div>
);
const Diffused = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[2.5rem] bg-foreground/60 pb-10 xl:pb-0">
    {children}
  </div>
);
const Base = ({ children }: PropsWithChildren) => (
  <div className="h-full w-full rounded-[2.5rem] bg-transparent pb-10 xl:pb-0">
    {children}
  </div>
);

const Default = ({ children }: PropsWithChildren) => (
  <div className="relative z-50 h-full w-full rounded-[2.5rem] bg-foreground">
    {children}
  </div>
);

const Dark = ({ children }: PropsWithChildren) => (
  <div className="relative -bottom-10 z-50 h-[calc(65vh)] w-screen overflow-hidden border-y-[0.33px] border-primary bg-transparent">
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
  Default: typeof Default;
  Flex: typeof Flex;
  Dark: typeof Dark;
};

export const Screen: TScreen = Object.assign(Component, {
  Header,
  Title,
  Subtext,
  PadSm,
  PadLg,
  Inverted,
  Diffused,
  Base,
  Default,
  Flex,
  Dark,
});
