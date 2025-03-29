import type { ClassName } from "@/app/types";
import { Icon } from "@/lib/icon";
import { type IconName } from "@/lib/icon/types";
import { cn } from "@/lib/utils";
import { Button, Link } from "@nextui-org/react";
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
      "h-fit w-full max-w-md overflow-clip bg-army/40",
      "shadow-sm rounded-md border border-macl-gray/40",
      "transition-all duration-300 ease-out",
      "hover:border-macl-gray hover:shadow-lg",
      "dark:border-primary-300/60",
    )}
  >
    <div
      className={cn(
        "h-fit w-full cursor-pointer",
        "bg-gradient-to-tr from-pink-100/10 via-sky-100/15 to-slate-300/10 dark:from-adam",
        "dark:text-primary-300 border border-background rounded-md",
      )}
    >
      <div className="flex h-full items-center md:items-start md:space-x-2 bg-gradient-to-r from-20% to-transparent xl:px-4 p-3 md:py-6">
        {children}
      </div>
    </div>
  </div>
);

const Header = ({ children, className, dark }: CommonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className={cn("h-fit w-full", { "text-foreground": dark }, className)}>
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full flex-col items-start justify-center space-y-1 px-2 leading-none",
        )}
      >
        {children}
      </div>
    </div>
  );
};

interface IconProps {
  icon: IconName;
  className?: ClassName;
}
const IconComponent = (props: IconProps) => (
  <div className="h-full items-start justify-center rounded-md">
    {
      <Icon name={props.icon}
        className={cn("hidden stroke-1 size-8 text-primary md:flex", props.className)}
      />
    }
  </div>
);

const Title = ({ children, className }: CommonProps) => (
  <p
    className={cn(
      "whitespace-nowrap tracking-tighter md:tracking-tight font-medium text-foreground",
      className,
    )}
  >
    {children}
  </p>
);

const Subtext = ({ children, className }: CommonProps) => (
  <p className={cn("text-xs font-light hidden text-foreground sm:flex",  className)}>
    {children}
  </p>
);

const ActionComp = ({ children, className }: CommonProps) => (
  <div className={cn("flex items-start", className)}>{children}</div>
);

interface BtnProps extends CommonProps {
  onPress: VoidFunction;
  loading: boolean;
}
const Btn = ({ children, loading, onPress }: BtnProps) => (
  <div className="h-fit">
  <ButtSex
    size={"sm"}
    inverted
    onClick={onPress}
    loading={loading}
    className={cn("border-void md:w-20 w-fit")}
  >
    {children}
  </ButtSex>
  </div>
);
const Label = ({ children, className }: CommonProps) => (
  <div
    className={cn(
      "whitespace-nowrap flex items-center justify-center font-mono font-medium uppercase tracking-widest",
      className,
    )}
  >
    {children}
  </div>
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
  IconComponent: typeof IconComponent;
};

export const ActionCard: TActionComp = Object.assign(Component, {
  Header,
  Title,
  Subtext,
  Action,
  ActionLink,
  IconComponent,
});

const ComponentII = ({ children }: PropsWithChildren) => (
  <div
    className={cn(
      "h-[38rem] pb-8 md:h-[35rem] w-full cursor-pointer overflow-clip",
      "border-[0.33px] rounded-xl border-foreground backdrop-blur-lg",
      "transition-all duration-300 ease-out",
      // "bg-gradient-to-b from-stone-50/10 via-cake/40 to-chalk",
      "bg-primary",
      "dark:border-primary-500/50 dark:from-void/80 dark:via-void dark:to-zinc-800/10",
      "",
    )}
  >
    <div className="flex h-full items-center space-x-2 bg-gradient-to-r from-20% to-transparent px-4 py-6 dark:bg-transparent">
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
  IconComponent: typeof IconComponent;
};

export const BigActionCard: TBigActionComp = Object.assign(ComponentII, {
  Header,
  Title,
  Subtext,
  Action,
  ActionLink,
  IconComponent,
});
