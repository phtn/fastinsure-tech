import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { Button, Link } from "@nextui-org/react";
import { useInView } from "framer-motion";
import { type PropsWithChildren, type ReactNode, useRef } from "react";
import { ButtSex } from "./button/index";

interface CommonProps {
  children?: ReactNode;
  className?: ClassName;
  dark?: boolean;
}

const Component = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "h-fit w-full cursor-pointer overflow-clip",
      "hover:border-foreground hover:shadow-lg",
      "dark:primary-300 rounded-md border-[0.33px] border-foreground",
      "transition-all duration-300 ease-out",
      "bg-gradient-to-tr from-stone-300/20 via-zinc-300/40 to-slate-300/20",
      "dark:border-primary-500/50 dark:from-primary-100",
    )}
  >
    <div className="flex h-full items-center space-x-2 bg-gradient-to-r from-20% to-transparent px-4 py-6">
      {children}
    </div>
  </div>
);

const Header = ({ children, className, dark }: CommonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div className={cn("h-fit w-full", { "text-foreground": dark }, className)}>
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col items-start justify-center space-y-1 px-2 leading-none opacity-0 transition-all duration-500 ease-out translate-y-12",
          { "opacity-100 translate-y-0": inView },
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface IconProps {
  icon: DualIcon;
  className?: ClassName;
}
const Icon = (props: IconProps) => (
  <div className="h-full items-center justify-center rounded-md">
    {
      <props.icon
        className={cn(
          "size-8 stroke-1 text-foreground lg:size-7",
          props.className,
        )}
      />
    }
  </div>
);

const Title = ({ children, className }: CommonProps) => (
  <p
    className={cn(
      "whitespace-nowrap font-sans font-medium tracking-tight text-foreground",
      className,
    )}
  >
    {children}
  </p>
);

const Subtext = ({ children, className }: CommonProps) => (
  <p className={cn("text-xs font-light text-foreground", className)}>
    {children}
  </p>
);

const ActionComp = ({ children, className }: CommonProps) => (
  <div className={cn("flex items-center", className)}>{children}</div>
);

interface BtnProps extends CommonProps {
  onPress: VoidFunction;
  loading: boolean;
}
const Btn = ({ children, loading, onPress }: BtnProps) => (
  <ButtSex
    size={"sm"}
    onClick={onPress}
    loading={loading}
    inverted
    // className={cn("", className)}
  >
    {children}
  </ButtSex>
);
const Label = ({ children, className }: CommonProps) => (
  <p
    className={cn(
      "whitespace-nowrap font-mono font-medium uppercase tracking-widest",
      className,
    )}
  >
    {children}
  </p>
);

const BtnIcon = ({ children, className }: CommonProps) => (
  <div className={cn("shrink-0", className)}>{children}</div>
);

type TButton = typeof ActionComp & {
  Btn: typeof Btn;
  Label: typeof Label;
  BtnIcon: typeof BtnIcon;
};
export const Action: TButton = Object.assign(ActionComp, {
  Btn,
  Label,
  BtnIcon,
});

interface BtnLinkProps extends CommonProps {
  loading: boolean;
  href: string;
}

const BtnLink = ({ children, className, loading, href }: BtnLinkProps) => (
  <Button
    href={href}
    as={Link}
    size={"sm"}
    color="primary"
    isLoading={loading}
    className={cn("", className)}
  >
    {children}
  </Button>
);

type TButtonLink = typeof ActionComp & {
  BtnLink: typeof BtnLink;
  Label: typeof Label;
  BtnIcon: typeof BtnIcon;
};

export const ActionLink: TButtonLink = Object.assign(ActionComp, {
  BtnLink,
  Label,
  BtnIcon,
});

type TActionComp = typeof Component & {
  Header: typeof Header;
  Title: typeof Title;
  Subtext: typeof Subtext;
  Action: typeof Action;
  ActionLink: typeof ActionLink;
  Icon: typeof Icon;
};

export const ActionCard: TActionComp = Object.assign(Component, {
  Header,
  Title,
  Subtext,
  Action,
  ActionLink,
  Icon,
});

const ComponentII = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "h-[30rem] w-full cursor-pointer overflow-clip",
      "_border-[0.33px] rounded-b-xl border-foreground",
      "transition-all duration-300 ease-out",
      "bg-gradient-to-b from-stone-50/10 via-zinc-300/30 to-chalk",
      "dark:border-primary-500/50 dark:from-void dark:via-void dark:to-zinc-800/10",
      "",
    )}
  >
    <div className="flex h-full items-center space-x-2 bg-gradient-to-r from-20% to-transparent px-4 py-8 dark:bg-transparent">
      {children}
    </div>
  </div>
);

type TBigActionComp = typeof Component & {
  Header: typeof Header;
  Title: typeof Title;
  Subtext: typeof Subtext;
  Action: typeof Action;
  ActionLink: typeof ActionLink;
  Icon: typeof Icon;
};

export const BigActionCard: TBigActionComp = Object.assign(ComponentII, {
  Header,
  Title,
  Subtext,
  Action,
  ActionLink,
  Icon,
});
