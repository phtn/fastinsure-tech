import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { useInView } from "framer-motion";
import { type PropsWithChildren, type ReactNode, useRef } from "react";

interface CommonProps {
  children?: ReactNode;
  className?: ClassName;
  dark?: boolean;
}

const Component = ({ children }: PropsWithChildren) => (
  <div className="h-fit w-full cursor-pointer overflow-clip rounded-xl transition-all duration-300 ease-out hover:shadow-lg">
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
          "flex h-full w-full translate-y-12 flex-col items-start justify-center px-2 leading-none opacity-0 transition-all duration-500 ease-out",
          { "translate-y-0 opacity-100": inView },
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
  <div className="flex h-full items-center justify-center rounded-md">
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
  <p className={cn("font-sans font-medium tracking-tight", className)}>
    {children}
  </p>
);

const Subtext = ({ children, className }: CommonProps) => (
  <p className={cn("text-xs opacity-60", className)}>{children}</p>
);

const ActionComp = ({ children, className }: CommonProps) => (
  <div className={cn("flex items-center", className)}>{children}</div>
);

interface BtnProps extends CommonProps {
  onPress: VoidFunction;
  loading: boolean;
}
const Btn = ({ children, className, loading, onPress }: BtnProps) => (
  <Button
    color="primary"
    className={cn("", className)}
    size={"md"}
    onPress={onPress}
    isLoading={loading}
  >
    {children}
  </Button>
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

const Icn = ({ children, className }: CommonProps) => (
  <div className={cn("shrink-0", className)}>{children}</div>
);

type TAction = typeof ActionComp & {
  Btn: typeof Btn;
  Label: typeof Label;
  Icn: typeof Icn;
};

export const Action: TAction = Object.assign(ActionComp, {
  Btn,
  Label,
  Icn,
});

type TActionComp = typeof Component & {
  Header: typeof Header;
  Title: typeof Title;
  Subtext: typeof Subtext;
  Action: typeof Action;
  Icon: typeof Icon;
};

export const ActionCard: TActionComp = Object.assign(Component, {
  Header,
  Title,
  Subtext,
  Action,
  Icon,
});
