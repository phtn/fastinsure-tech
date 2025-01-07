import { cn } from "@/lib/utils";
import { type ChangeEvent, memo, type ReactNode } from "react";
import { type WindowVariant } from ".";
import {
  ArrowRightIcon,
  MagnifyingGlassIcon,
  WindowIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ButtSqx } from "../button/index";
import { type DualIcon } from "@/app/types";
import { type ButtIconProps } from "../button/types";

export interface StaticToolbarProps {
  closeFn?: VoidFunction;
  children?: ReactNode;
  title?: ReactNode;
  variant?: WindowVariant;
  loading?: boolean;
  icon?: DualIcon;
  action?: VoidFunction;
}

export interface ToolbarProps<T> {
  closeFn: VoidFunction;
  children?: ReactNode;
  title?: ReactNode;
  variant?: WindowVariant;
  loading?: boolean;
  icon?: DualIcon;
  action?: VoidFunction;
  value?: string;
  size?: "sm" | "md" | "lg" | "xl";
  v?: T;
}
const ToolbarComponent = <T,>({
  children,
  closeFn,
  title,
  variant = "demigod",
  loading = false,
  icon = WindowIcon,
  action = () => null,
  size = "sm",
}: ToolbarProps<T>) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between rounded-t-2xl p-2",
        { "h-[49px] items-center": size === "sm" },
        { "h-[80px] items-start": size === "md" },
        { "h-[120px] items-start": size === "lg" },
        // LIGHT
        "border-b-[0.5px] border-dock-border",
        { "bg-demigod": variant === "demigod" },
        { "bg-god": variant === "god" },
        { "bg-goddess": variant === "goddess" },
        { "bg-adam": variant === "adam" },
        { "bg-void": variant === "void" },
        "",
        // DARK
        "dark:border-zinc-950/80 dark:bg-primary-100",
      )}
    >
      <section className="flex h-12 w-full items-center gap-4">
        <Indicator onClick={action} icon={icon} loading={loading} />
        {title ? <Title title={title} /> : null}
        {children}
      </section>

      <CloseButton onClick={closeFn} icon={XMarkIcon} />
    </div>
  );
};

const Title = (props: { title?: ReactNode }) => {
  return (
    <h2 className="text-sm font-semibold tracking-tight text-icon dark:text-icon-dark">
      {props.title}
    </h2>
  );
};

const Indicator = (props: ButtIconProps) => {
  return <ButtSqx size="md" {...props} />;
};

const CloseButton = (props: ButtIconProps) => {
  return <ButtSqx size="md" {...props} />;
};

export interface ToolbarSearchProps {
  searchFn: (e: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}
export const ToolbarSearch = (props: ToolbarSearchProps) => {
  const { searchFn, value, placeholder } = props;
  return (
    <div className="relative flex w-full">
      <input
        type="text"
        placeholder={placeholder}
        className={cn(
          "h-[30px] max-w-[40ch] flex-grow rounded-lg ps-8 font-inst text-sm font-semibold outline-none",
          "bg-dock-border text-primary placeholder:text-primary-600",
          "dark:bg-primary-300/50 dark:text-icon-dark",
        )}
        defaultValue={value}
        onChange={searchFn}
        autoFocus
      />
      <MagnifyingGlassIcon className="dark:text-dark-icon absolute left-2 top-2 z-[30] size-3.5 stroke-[3px] text-icon" />
    </div>
  );
};

export const Toolbar = memo(ToolbarComponent);

export const StaticToolbar = ({
  closeFn,
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
        <Indicator onClick={action} icon={icon} loading={loading} />
        {title ? <Title title={title} /> : null}
        {children}
      </section>

      <CloseButton onClick={closeFn} icon={ArrowRightIcon} />
    </div>
  );
};
export interface SpToolbarProps<T> extends ToolbarProps<T> {
  description?: string;
  v?: T;
}
export const SpToolbar = <T,>({
  children,
  // closeFn,
  // title,
  variant = "demigod",
  // loading = false,
  // icon = WindowIcon,
  // action = () => null,
  size = "sm",
}: SpToolbarProps<T>) => {
  return (
    <div
      className={cn(
        "flex w-full justify-between rounded-t-2xl p-2",
        { "h-[49px] items-center": size === "sm" },
        { "h-[80px] items-start": size === "md" },
        { "h-[120px] items-start": size === "lg" },
        { "h-[130px] items-start": size === "xl" },
        // LIGHT
        "border-b-[0.5px] border-steel",
        { "bg-demigod": variant === "demigod" },
        { "bg-god": variant === "god" },
        { "bg-goddess": variant === "goddess" },
        "",
        // DARK
        "dark:border-zinc-950/80 dark:bg-primary-100",
      )}
    >
      <section className="flex w-full flex-col items-center justify-center">
        {children}
      </section>
    </div>
  );
};
