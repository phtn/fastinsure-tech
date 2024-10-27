import type { ClassName, DualIcon } from "@/app/types";
import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";

const Component = ({ children }: PropsWithChildren) => (
  <div className="flex h-[130px] w-full flex-col rounded-xl border-[0.33px] border-neutral-400 bg-foreground/40 p-4 shadow-lg dark:bg-foreground/80">
    {children}
  </div>
);
interface StatHeaderProps {
  title: string;
  tag?: string;
}
const Header = ({ title, tag }: StatHeaderProps) => (
  <div>
    <div className="leading-2 font-medium tracking-tight text-neutral-800">
      {title}
    </div>
    <div className="text-[10px] font-medium uppercase tracking-tight text-neutral-400">
      {tag}
    </div>
  </div>
);

const Icon = (props: { icon: DualIcon; className?: ClassName }) => (
  <props.icon
    className={cn("size-6 stroke-1 text-neutral-500", props.className)}
  />
);

const ContentComponent = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-full justify-between">
    <div className="flex w-full items-center justify-end self-baseline text-2xl font-semibold tracking-tight">
      <div className="flex w-full flex-col items-end">{children}</div>
    </div>
  </div>
);

const Value = ({ children }: PropsWithChildren) => (
  <div className="animate-enter">{children}</div>
);
const Key = ({ children }: PropsWithChildren) => (
  <div className="text-xs font-light opacity-80">{children}</div>
);

type TContent = typeof ContentComponent & {
  Value: typeof Value;
  Key: typeof Key;
};

const Content = Object.assign(ContentComponent, {
  Value,
  Key,
});

type TStat = typeof Component & {
  Header: typeof Header;
  Icon: typeof Icon;
  Content: TContent;
};

export const Stat: TStat = Object.assign(Component, {
  Header,
  Icon,
  Content,
});
