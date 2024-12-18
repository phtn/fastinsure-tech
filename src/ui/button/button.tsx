import { type DualIcon } from "@/app/types";
import { Button, Spinner } from "@nextui-org/react";
import { Squircle } from "lucide-react";
import { type ReactNode, type RefObject, useCallback } from "react";
import { cn } from "@/lib/utils";
import { opts } from "@/utils/helpers";
import type { ButtSize, ButtIconProps } from "./types";

interface ButtStatProps {
  value?: string;
  size?: ButtSize;
}
export const ButtStat = (props: ButtStatProps) => {
  const { value = "", size = "md" } = props;
  return (
    <div
      className={cn(
        "group relative flex cursor-pointer items-center justify-center overflow-hidden",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute text-transparent opacity-100",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "size-8": size === "sm" },
          { "size-9": size === "md" },
          { "size-[42px]": size === "lg" },
          "fill-god/80",
          "dark:fill-primary-300/50",
        )}
      />
      <span className="z-[40] font-semibold text-icon group-hover:opacity-100 dark:text-icon-dark">
        {value}
      </span>
    </div>
  );
};

export const ButtIcx = (props: ButtIconProps) => {
  return (
    <div>
      <Button isIconOnly className="bg-god">
        <props.icon className="size-4" />
      </Button>
    </div>
  );
};

export const ButtSqx = (props: ButtIconProps) => {
  const {
    size = "md",
    loading = false,
    variant = "goddess",
    disabled = false,
    className,
    inverted = false,
  } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          "text-icon",
          "dark:text-icon-dark",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          { "text-icon/50 dark:text-icon-dark/50": disabled },
          { "text-icon-dark": inverted },
          { "text-secondary dark:text-secondary": variant === "active" },
        )}
      />,
    );
    return <>{options.get(loading)}</>;
  }, [loading, size, props, disabled, inverted, variant]);

  return (
    <button
      onClick={props.onClick}
      disabled={disabled}
      className={cn(
        "group relative flex cursor-pointer items-center justify-center overflow-hidden disabled:cursor-vertical-text",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
        "outline-none focus:outline-none focus:ring-0",
        className,
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "transition-all duration-200 transform-gpu",
          "group-hover:opacity-100",
          { "group-hover:size-8": size === "sm" },
          { "group-hover:size-[40px]": size === "md" },
          { "group-hover:size-[48px]": size === "lg" },
          "fill-god/80",
          { "fill-demigod/80": variant === "demigod" },
          { "fill-god/80": variant === "goddess" },
          { "size-8 fill-god": variant === "active" },
          "dark:fill-primary-300/30",
          {
            "group-hover:fill-primary-300/20 dark:group-hover:fill-primary-300/50":
              inverted,
          },
        )}
      />
      <Opts />
    </button>
  );
};

export const ButtSpc = (props: ButtIconProps & { icon: DualIcon }) => {
  const {
    size = "md",
    loading = false,
    variant = "goddess",
    disabled,
    className,
  } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          "fill-chalk text-icon",
          "dark:fill-void dark:text-icon-dark",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          { "text-icon/50 dark:text-icon-dark/50": disabled },
        )}
      />,
    );
    return <>{options.get(loading)}</>;
  }, [loading, size, props, disabled]);

  return (
    <button
      onClick={props.onClick}
      className={cn(
        "group/butt relative flex animate-enter cursor-pointer items-center justify-center overflow-hidden p-[2.5px]",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "size-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
        "focus:-ring-offset-1 focus:size-6 focus:rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary",
        className,
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "border-demigod transition-all duration-200 transform-gpu",
          "group-hover/butt:opacity-100",
          { "group-hover/butt:size-[28px]": size === "sm" },
          { "group-hover/butt:size-[44px]": size === "md" },
          { "group-hover/butt:size-[48px]": size === "lg" },
          "fill-god/80",
          { "fill-demigod/80": variant === "demigod" },
          "dark:fill-primary-300/30",
        )}
      />
      <Opts />
    </button>
  );
};

interface ButtProps {
  children?: ReactNode;
  ref?: RefObject<HTMLButtonElement>;
}
export const ButtIconSex = (props: ButtIconProps & ButtProps) => {
  const {
    size = "md",
    loading = false,
    variant = "goddess",
    disabled,
    className,
  } = props;
  const Opts = useCallback(() => {
    const options = opts(
      <Spinner size="sm" />,
      <props.icon
        className={cn(
          "z-40 size-4 stroke-[1.5px]",
          "group-hover:drop-shadow-md",
          "fill-chalk text-icon",
          "dark:fill-void dark:text-icon-dark",
          { "size-5": size === "md" },
          { "size-6": size === "lg" },
          { "text-icon/50 dark:text-icon-dark/50": disabled },
        )}
      />,
    );
    return <>{options.get(loading)}</>;
  }, [loading, size, props, disabled]);

  return (
    <button
      onClick={props.onClick}
      className={cn(
        "group/butt relative flex animate-enter cursor-pointer items-center justify-center overflow-hidden p-[2.5px]",
        "transition-all duration-200 transform-gpu",
        "active:scale-90",
        { "h-8": size === "sm" },
        { "size-10": size === "md" },
        { "size-12": size === "lg" },
        "focus:-ring-offset-1 focus:size-6 focus:rounded-xl focus:outline-none focus:ring-1 focus:ring-secondary",
        className,
      )}
    >
      <Squircle
        className={cn(
          "pointer-events-none absolute size-1 text-transparent opacity-5",
          "border-demigod transition-all duration-200 transform-gpu",
          "group-hover/butt:opacity-100",
          { "group-hover/butt:size-[28px]": size === "sm" },
          { "group-hover/butt:size-[44px]": size === "md" },
          { "group-hover/butt:size-[48px]": size === "lg" },
          "fill-god/80",
          { "fill-demigod/80": variant === "demigod" },
          "dark:fill-primary-300/30",
        )}
      />
      <Opts />
    </button>
  );
};
