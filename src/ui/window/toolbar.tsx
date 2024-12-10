import { cn } from "@/lib/utils";
import { type ChangeEvent, memo, type ReactNode } from "react";
import { type WindowVariant } from ".";
import { WindowIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ButtSqx } from "../button/index";
import { type ButtonProps } from "@nextui-org/react";
import { type DualIcon } from "@/app/types";

export interface StaticToolbarProps {
  closeFn?: VoidFunction;
  children?: ReactNode;
  title?: string;
  variant?: WindowVariant;
  loading?: boolean;
  icon?: DualIcon;
  action?: VoidFunction;
}

export interface ToolbarProps {
  closeFn: VoidFunction;
  children?: ReactNode;
  title?: string;
  variant?: WindowVariant;
  loading?: boolean;
  icon?: DualIcon;
  action?: VoidFunction;
  value?: string;
}
const ToolbarComponent = ({
  children,
  closeFn,
  title,
  variant = "demigod",
  loading = false,
  icon = WindowIcon,
  action = () => null,
}: ToolbarProps) => {
  return (
    <div
      className={cn(
        "flex h-[49px] items-center justify-between rounded-t-2xl p-2",
        // LIGHT
        "border-b-[0.5px] border-dock-border",
        { "bg-demigod": variant === "demigod" },
        { "bg-god": variant === "god" },
        { "bg-goddess": variant === "goddess" },
        "",
        // DARK
        "dark:border-zinc-950/80 dark:bg-primary-100",
      )}
    >
      <section className="flex h-12 w-full items-center space-x-0">
        <Indicator onClick={action} icon={icon} isLoading={loading} />
        {title ? <Title title={title} /> : null}
        {children}
      </section>

      <CloseButton onClick={closeFn} />
    </div>
  );
};

const Title = (props: { title?: string }) => {
  return (
    <h2 className="text-sm font-semibold tracking-tight text-icon dark:text-icon-dark">
      {props.title}
    </h2>
  );
};

const Indicator = (props: ButtonProps & { icon: DualIcon }) => {
  return <ButtSqx size="md" {...props} />;
};

const CloseButton = (props: ButtonProps) => {
  return <ButtSqx size="md" icon={XMarkIcon} {...props} />;
};

export interface ToolbarSearchProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}
export const ToolbarSearch = (props: ToolbarSearchProps) => {
  const { searchFn, value, placeholder } = props;
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={cn(
        "h-7 max-w-[40ch] flex-grow rounded-lg ps-4 font-inst text-sm outline-none",
        "bg-dock-border text-icon placeholder:text-primary-600",
        "dark:bg-primary-300/50 dark:text-icon-dark",
      )}
      defaultValue={value}
      onChange={searchFn}
      autoFocus
    />
  );
};

export const Toolbar = memo(ToolbarComponent);

export const StaticToolbar = ({
  closeFn = () => null,
  children,
  title,
  variant = "demigod",
  loading = false,
  icon = WindowIcon,
  action = () => null,
}: StaticToolbarProps) => {
  return (
    <div
      className={cn(
        "flex h-[49px] items-center justify-between rounded-t-2xl p-2",
        // LIGHT
        "border-b-[0.5px] border-dock-border",
        { "bg-demigod": variant === "demigod" },
        { "bg-god": variant === "god" },
        { "bg-goddess": variant === "goddess" },
        "",
        // DARK
        "dark:border-zinc-950/80 dark:bg-primary-200",
      )}
    >
      <section className="flex h-12 w-full items-center space-x-0">
        <Indicator onClick={action} icon={icon} isLoading={loading} />
        {title ? <Title title={title} /> : null}
        {children}
      </section>

      <CloseButton onClick={closeFn} />
    </div>
  );
};
